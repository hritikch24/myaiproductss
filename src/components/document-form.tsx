"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, AlertCircle, Sparkles, CreditCard, User, Home, IndianRupee, FileText, Settings, Briefcase, ShieldCheck, HandshakeIcon, type LucideIcon } from "lucide-react";
import { DOC_PRICE_DISPLAY, PREMIUM_ENABLED } from "@/lib/pricing";
import Link from "next/link";
import { PaymentModal } from "./payment-modal";
import { DatePicker } from "./date-picker";
import { SmartFill } from "./smart-fill";

export interface FormField {
  name: string;
  label: string;
  type: "text" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: { label: string; value: string }[];
  helperText?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  prefix?: string;
  suffix?: string;
  minDate?: string;
  maxDate?: string;
  defaultDate?: string;
  section?: string;
}

interface DocumentFormProps {
  title: string;
  titleHi: string;
  docType: string;
  fields: FormField[];
}

const SECTION_META: Record<string, { icon: LucideIcon; gradient: string; bg: string }> = {
  "Landlord Details": { icon: User, gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
  "Tenant Details": { icon: User, gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
  "Property Details": { icon: Home, gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
  "Financial Terms": { icon: IndianRupee, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
  "Other Terms": { icon: FileText, gradient: "from-pink-500 to-rose-500", bg: "bg-pink-50" },
  "Document Settings": { icon: Settings, gradient: "from-slate-500 to-slate-600", bg: "bg-slate-50" },
  "Disclosing Party": { icon: ShieldCheck, gradient: "from-blue-500 to-indigo-500", bg: "bg-blue-50" },
  "Receiving Party": { icon: User, gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
  "Agreement Details": { icon: HandshakeIcon, gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
  "Client Details": { icon: Briefcase, gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
  "Freelancer Details": { icon: User, gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
  "Project Scope": { icon: FileText, gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
  "Payment & Timeline": { icon: IndianRupee, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
};

const DEFAULT_SECTION_META = { icon: FileText, gradient: "from-orange-500 to-amber-500", bg: "bg-orange-50" };

function resolveDate(value?: string): Date | undefined {
  if (!value) return undefined;
  if (value === "today") return new Date();
  return new Date(value);
}

function formatIndianNumber(value: string): string {
  const num = value.replace(/[^0-9]/g, "");
  if (!num) return "";
  const n = parseInt(num, 10);
  return n.toLocaleString("en-IN");
}

export function DocumentForm({
  title,
  titleHi,
  docType,
  fields,
}: DocumentFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [loadingText, setLoadingText] = useState("Generating Document...");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [showPayment, setShowPayment] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<Record<string, string> | null>(null);
  const [charCounts, setCharCounts] = useState<Record<string, number>>({});
  const [currencyDisplays, setCurrencyDisplays] = useState<Record<string, string>>({});
  const [draftRestored, setDraftRestored] = useState(false);
  const [filledCount, setFilledCount] = useState(0);
  const requiredFields = fields.filter((f) => f.required !== false);
  const totalRequired = requiredFields.length;
  const progressPercent = totalRequired > 0 ? Math.round((filledCount / totalRequired) * 100) : 0;

  const draftKey = `draft_${docType}`;

  // Group fields by section
  const sections: { name: string; fields: FormField[] }[] = [];
  for (const field of fields) {
    const sectionName = field.section || "Details";
    const lastSection = sections[sections.length - 1];
    if (lastSection && lastSection.name === sectionName) {
      lastSection.fields.push(field);
    } else {
      sections.push({ name: sectionName, fields: [field] });
    }
  }

  function saveDraft() {
    if (!formRef.current) return;
    const formData = new FormData(formRef.current);
    const data: Record<string, string> = {};
    let hasValue = false;
    let filled = 0;
    for (const [key, value] of formData.entries()) {
      const v = value as string;
      if (v.trim()) hasValue = true;
      data[key] = v;
    }
    for (const f of requiredFields) {
      if (data[f.name]?.trim()) filled++;
    }
    setFilledCount(filled);
    if (hasValue) {
      localStorage.setItem(draftKey, JSON.stringify(data));
    }
  }

  function clearDraft() {
    localStorage.removeItem(draftKey);
  }

  const handleSmartFill = useCallback(
    (extracted: Record<string, string>) => {
      if (!formRef.current) return;
      const form = formRef.current;

      for (const [key, value] of Object.entries(extracted)) {
        const el = form.elements.namedItem(key);
        if (!el) continue;

        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          const nativeSetter = Object.getOwnPropertyDescriptor(
            el instanceof HTMLTextAreaElement
              ? HTMLTextAreaElement.prototype
              : HTMLInputElement.prototype,
            "value"
          )?.set;
          if (nativeSetter) {
            nativeSetter.call(el, value);
            el.dispatchEvent(new Event("input", { bubbles: true }));
            el.dispatchEvent(new Event("change", { bubbles: true }));
          } else {
            el.value = value;
          }

          if (el instanceof HTMLTextAreaElement) {
            setCharCounts((prev) => ({ ...prev, [key]: value.length }));
          }

          const field = fields.find((f) => f.name === key);
          if (field?.prefix === "₹" && value) {
            setCurrencyDisplays((prev) => ({
              ...prev,
              [key]: formatIndianNumber(value),
            }));
          }
        } else if (el instanceof HTMLSelectElement) {
          const option = Array.from(el.options).find(
            (o) =>
              o.value === value ||
              o.value.toLowerCase() === value.toLowerCase()
          );
          if (option) {
            el.value = option.value;
          }
        }
      }
    },
    [fields]
  );

  useEffect(() => {
    if (draftRestored || !formRef.current) return;
    try {
      const saved = localStorage.getItem(draftKey);
      if (!saved) { setDraftRestored(true); return; }
      const data = JSON.parse(saved) as Record<string, string>;
      handleSmartFill(data);
      setDraftRestored(true);
    } catch {
      setDraftRestored(true);
    }
  }, [draftKey, draftRestored, handleSmartFill]);

  function validateField(field: FormField, value: string): string | null {
    if (field.required !== false && !value.trim()) {
      return `${field.label} is required`;
    }
    if (field.type === "number" && value) {
      const num = parseFloat(value);
      if (isNaN(num)) return "Please enter a valid number";
      if (field.min !== undefined && num < field.min)
        return `Minimum value is ${field.min.toLocaleString("en-IN")}`;
      if (field.max !== undefined && num > field.max)
        return `Maximum value is ${field.max.toLocaleString("en-IN")}`;
    }
    if (field.maxLength && value.length > field.maxLength) {
      return `Maximum ${field.maxLength} characters allowed`;
    }
    if (field.pattern && value) {
      const regex = new RegExp(field.pattern);
      if (!regex.test(value)) {
        return field.patternMessage || "Invalid format";
      }
    }
    return null;
  }

  function validateAll(data: Record<string, string>): boolean {
    const errors: Record<string, string> = {};
    let hasError = false;
    for (const field of fields) {
      const value = data[field.name] || "";
      const err = validateField(field, value);
      if (err) {
        errors[field.name] = err;
        hasError = true;
      }
    }
    setFieldErrors(errors);
    return !hasError;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = value as string;
    }

    if (!validateAll(data)) {
      const firstErrorField = fields.find((f) => fieldErrors[f.name]);
      if (firstErrorField) {
        document
          .getElementById(firstErrorField.name)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setLoading(true);
    setLoadingText("Generating Document...");

    const messages = [
      "Analyzing your details...",
      "Drafting legal clauses...",
      "Formatting document...",
      "Almost done...",
    ];
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLoadingText(messages[i]);
        i++;
      }
    }, 3000);

    try {
      const res = await fetch("/legal-docs/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ docType, formData: data }),
      });

      if (res.status === 402) {
        clearInterval(interval);
        setPendingFormData(data);
        setShowPayment(true);
        setLoading(false);
        return;
      }

      if (!res.ok) {
        let message = "Failed to generate document";
        try {
          const body = await res.json();
          if (body.error) message = body.error;
        } catch {
          // Response wasn't JSON
        }
        throw new Error(message);
      }

      const result = await res.json();
      if (!result.documentId) {
        throw new Error("Invalid response from server");
      }
      const { documentId } = result;
      clearDraft();
      router.push(`/legal-docs/dashboard/documents/${documentId}`);
    } catch (err) {
      clearInterval(interval);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  }

  function handleNumberInput(field: FormField, value: string) {
    if (field.prefix === "₹") {
      setCurrencyDisplays((prev) => ({
        ...prev,
        [field.name]: value ? formatIndianNumber(value) : "",
      }));
    }
    if (fieldErrors[field.name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[field.name];
        return next;
      });
    }
  }

  function handleFieldChange(fieldName: string) {
    if (fieldErrors[fieldName]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[fieldName];
        return next;
      });
    }
  }

  function renderField(field: FormField) {
    return (
      <div key={field.name}>
        <label
          htmlFor={field.name}
          className="mb-2 block text-[13px] font-medium text-slate-700"
        >
          {field.label}
          {field.required !== false && (
            <span className="text-red-400 ml-0.5">*</span>
          )}
        </label>

        {field.type === "select" ? (
          <select
            id={field.name}
            name={field.name}
            required={field.required !== false}
            onChange={() => handleFieldChange(field.name)}
            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 py-1 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-orange-400 focus-visible:ring-orange-100 focus-visible:ring-[3px] transition-all"
          >
            {field.options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : field.type === "date" ? (
          <DatePicker
            name={field.name}
            id={field.name}
            required={field.required !== false}
            placeholder={field.placeholder || "Pick a date"}
            minDate={resolveDate(field.minDate)}
            maxDate={resolveDate(field.maxDate)}
            defaultDate={resolveDate(field.defaultDate)}
          />
        ) : field.type === "textarea" ? (
          <div>
            <textarea
              id={field.name}
              name={field.name}
              placeholder={field.placeholder}
              required={field.required !== false}
              maxLength={field.maxLength}
              rows={3}
              onChange={(e) => {
                setCharCounts((prev) => ({
                  ...prev,
                  [field.name]: e.target.value.length,
                }));
                handleFieldChange(field.name);
              }}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm outline-none hover:border-slate-300 focus-visible:border-orange-400 focus-visible:ring-orange-100 focus-visible:ring-[3px] placeholder:text-slate-400 resize-none transition-all"
            />
            {field.maxLength && (
              <p className="mt-1.5 text-[11px] text-slate-400 text-right tabular-nums">
                {charCounts[field.name] || 0} / {field.maxLength}
              </p>
            )}
          </div>
        ) : field.type === "number" && field.prefix ? (
          <div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                {field.prefix}
              </span>
              <Input
                id={field.name}
                name={field.name}
                type="number"
                placeholder={field.placeholder}
                required={field.required !== false}
                min={field.min}
                max={field.max}
                className="text-slate-900 pl-8 h-11 rounded-xl border-slate-200 bg-white shadow-sm hover:border-slate-300 focus-visible:border-orange-400 focus-visible:ring-orange-100"
                onChange={(e) =>
                  handleNumberInput(field, e.target.value)
                }
              />
            </div>
            {currencyDisplays[field.name] && (
              <p className="mt-1.5 text-[11px] text-slate-500 tabular-nums">
                ₹{currencyDisplays[field.name]}
              </p>
            )}
          </div>
        ) : (
          <div className="relative">
            <Input
              id={field.name}
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required !== false}
              maxLength={field.maxLength}
              pattern={field.pattern}
              title={field.patternMessage}
              className="text-slate-900 h-11 rounded-xl border-slate-200 bg-white shadow-sm hover:border-slate-300 focus-visible:border-orange-400 focus-visible:ring-orange-100"
              onChange={() => handleFieldChange(field.name)}
            />
            {field.suffix && (
              <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-400">
                {field.suffix}
              </span>
            )}
          </div>
        )}

        {field.helperText && !fieldErrors[field.name] && (
          <p className="mt-1.5 text-[11px] text-slate-400">
            {field.helperText}
          </p>
        )}

        {fieldErrors[field.name] && (
          <p className="mt-1.5 text-[11px] text-red-500 flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            {fieldErrors[field.name]}
          </p>
        )}
      </div>
    );
  }

  return (
    <div>
      {/* Sticky header */}
      <div className="sticky top-[57px] z-30 -mx-6 px-6 pt-2 pb-4 bg-[#F8F9FB]/90 backdrop-blur-xl border-b border-slate-200/60">
        <Link
          href="/legal-docs/dashboard"
          className="mb-3 inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-700 transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Dashboard
        </Link>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="text-xs text-orange-500/80">{titleHi}</p>
          </div>
          <div className="flex items-center gap-2">
            <SmartFill docType={docType} onFieldsExtracted={handleSmartFill} />
          </div>
        </div>
        {/* Progress bar */}
        {filledCount > 0 && (
          <div className="mt-2.5 flex items-center gap-3">
            <div className="flex-1 h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progressPercent}%`,
                  background: progressPercent === 100
                    ? "linear-gradient(90deg, #22c55e, #16a34a)"
                    : "linear-gradient(90deg, #f97316, #fb923c)",
                }}
              />
            </div>
            <span className="text-[11px] tabular-nums text-slate-400 shrink-0">
              {filledCount}/{totalRequired}
            </span>
          </div>
        )}

        {draftRestored && localStorage.getItem(draftKey) && (
          <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-200 px-3 py-1.5">
            <span className="text-[11px] text-emerald-700">Draft restored from your last session</span>
            <button
              type="button"
              onClick={() => {
                clearDraft();
                window.location.reload();
              }}
              className="text-[11px] text-slate-400 hover:text-slate-700 transition-colors"
            >
              Clear draft
            </button>
          </div>
        )}
      </div>

      <div className="mt-6" />

      <form ref={formRef} onSubmit={handleSubmit} onChange={saveDraft}>
        <div className="space-y-5">
          {sections.map((section, sectionIdx) => {
            const meta = SECTION_META[section.name] || DEFAULT_SECTION_META;
            const SectionIcon = meta.icon;

            return (
              <div
                key={section.name}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-sm overflow-hidden transition-all duration-200 hover:shadow-md"
              >
                {/* Section header */}
                <div className="flex items-center gap-3 px-6 pt-5 pb-4">
                  <div className={`inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${meta.gradient} shadow-md`}>
                    <SectionIcon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-slate-900">{section.name}</h3>
                    <p className="text-[11px] text-slate-400">
                      {section.fields.filter(f => f.required !== false).length} required field{section.fields.filter(f => f.required !== false).length !== 1 ? "s" : ""}
                    </p>
                  </div>
                  <div className="ml-auto text-[11px] text-slate-300 tabular-nums font-medium">
                    {sectionIdx + 1}/{sections.length}
                  </div>
                </div>

                <div className="h-px bg-slate-100 mx-6" />

                {/* Section fields */}
                <div className="px-6 py-5 space-y-5">
                  {section.fields.map(renderField)}
                </div>
              </div>
            );
          })}
        </div>

        {/* Submit area */}
        <div className="mt-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6">
          {error && (
            <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 mb-4">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex items-center justify-center gap-2 rounded-xl h-12 text-sm font-semibold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed transition-all hover:shadow-lg hover:shadow-orange-500/20 active:scale-[0.99]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 transition-all group-hover:from-orange-400 group-hover:to-orange-500" />
              <span className="relative flex items-center gap-2">
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {loadingText}
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Generate Document
                  </>
                )}
              </span>
            </button>

            {PREMIUM_ENABLED && (
              <>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-slate-200" />
                  </div>
                  <div className="relative flex justify-center text-[10px]">
                    <span className="bg-white px-3 text-slate-400 uppercase tracking-wider">or</span>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    if (!formRef.current) return;
                    const formData = new FormData(formRef.current);
                    const data: Record<string, string> = {};
                    for (const [key, value] of formData.entries()) {
                      data[key] = value as string;
                    }
                    if (!validateAll(data)) return;
                    setPendingFormData(data);
                    setShowPayment(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl h-12 text-sm font-medium text-orange-600 border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <CreditCard className="h-4 w-4" />
                  Pay &#8377;{DOC_PRICE_DISPLAY[docType] || "99"} &amp; Generate
                </button>
                <p className="text-center text-[10px] text-slate-400">
                  2 free documents available &middot; Premium includes PDF download
                </p>
              </>
            )}
          </div>
        </div>
      </form>

      {showPayment && pendingFormData && (
        <PaymentModal
          docType={docType}
          formData={pendingFormData}
          onClose={() => {
            setShowPayment(false);
            setPendingFormData(null);
          }}
        />
      )}
    </div>
  );
}
