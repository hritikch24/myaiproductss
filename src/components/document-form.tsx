"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2, AlertCircle, Sparkles } from "lucide-react";
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
}

interface DocumentFormProps {
  title: string;
  titleHi: string;
  docType: string;
  fields: FormField[];
}

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
        const body = await res.json();
        throw new Error(body.error || "Failed to generate document");
      }

      const { documentId } = await res.json();
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

  return (
    <div>
      <Link
        href="/legal-docs/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-slate-500 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Dashboard
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">{title}</h1>
          <p className="text-sm text-orange-400/80">{titleHi}</p>
          <p className="mt-2 text-[13px] text-slate-500">
            Fill in the details and our AI will generate your document.
          </p>
        </div>
        <SmartFill docType={docType} onFieldsExtracted={handleSmartFill} />
      </div>

      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block text-[13px] font-medium text-slate-300"
              >
                {field.label}
                {field.required !== false && (
                  <span className="text-orange-500/70 ml-0.5">*</span>
                )}
              </label>

              {field.type === "select" ? (
                <select
                  id={field.name}
                  name={field.name}
                  required={field.required !== false}
                  onChange={() => handleFieldChange(field.name)}
                  className="h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-orange-500/30 focus-visible:ring-orange-500/10 focus-visible:ring-[3px] transition-all"
                >
                  {field.options?.map((opt) => (
                    <option
                      key={opt.value}
                      value={opt.value}
                      className="bg-slate-900"
                    >
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
                    className="w-full rounded-xl border border-white/[0.06] bg-white/[0.03] px-3.5 py-2.5 text-sm text-white shadow-xs outline-none focus-visible:border-orange-500/30 focus-visible:ring-orange-500/10 focus-visible:ring-[3px] placeholder:text-slate-600 resize-none transition-all"
                  />
                  {field.maxLength && (
                    <p className="mt-1.5 text-[11px] text-slate-600 text-right tabular-nums">
                      {charCounts[field.name] || 0} / {field.maxLength}
                    </p>
                  )}
                </div>
              ) : field.type === "number" && field.prefix ? (
                <div>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-500">
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
                      className="text-white pl-8 h-10 rounded-xl border-white/[0.06] bg-white/[0.03] focus-visible:border-orange-500/30 focus-visible:ring-orange-500/10"
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
                    className="text-white h-10 rounded-xl border-white/[0.06] bg-white/[0.03] focus-visible:border-orange-500/30 focus-visible:ring-orange-500/10"
                    onChange={() => handleFieldChange(field.name)}
                  />
                  {field.suffix && (
                    <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[11px] text-slate-500">
                      {field.suffix}
                    </span>
                  )}
                </div>
              )}

              {field.helperText && !fieldErrors[field.name] && (
                <p className="mt-1.5 text-[11px] text-slate-600">
                  {field.helperText}
                </p>
              )}

              {fieldErrors[field.name] && (
                <p className="mt-1.5 text-[11px] text-red-400 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {fieldErrors[field.name]}
                </p>
              )}
            </div>
          ))}

          {error && (
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-gradient w-full flex items-center justify-center gap-2 rounded-xl h-11 text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
          >
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
          </button>
        </form>
      </div>

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
