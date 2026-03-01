"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
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
  // Validation & UX enhancements
  helperText?: string;
  min?: number;
  max?: number;
  maxLength?: number;
  pattern?: string;
  patternMessage?: string;
  prefix?: string;
  suffix?: string;
  minDate?: string; // "today" or ISO date
  maxDate?: string; // "today" or ISO date
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

// Format number as Indian currency style: 1,00,000
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

  // Apply extracted fields from Smart Fill
  const handleSmartFill = useCallback(
    (extracted: Record<string, string>) => {
      if (!formRef.current) return;
      const form = formRef.current;

      for (const [key, value] of Object.entries(extracted)) {
        const el = form.elements.namedItem(key);
        if (!el) continue;

        if (el instanceof HTMLInputElement || el instanceof HTMLTextAreaElement) {
          // Use native setter to trigger React state updates
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

          // Update char count for textareas
          if (el instanceof HTMLTextAreaElement) {
            setCharCounts((prev) => ({ ...prev, [key]: value.length }));
          }

          // Update currency display for number fields with prefix ₹
          const field = fields.find((f) => f.name === key);
          if (field?.prefix === "₹" && value) {
            setCurrencyDisplays((prev) => ({
              ...prev,
              [key]: formatIndianNumber(value),
            }));
          }
        } else if (el instanceof HTMLSelectElement) {
          // Try exact match first, then case-insensitive
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

    // Validate
    if (!validateAll(data)) {
      // Scroll to first error
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
      const res = await fetch("/api/documents/generate", {
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
      router.push(`/dashboard/documents/${documentId}`);
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
    // Clear field error on change
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
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <p className="text-orange-400">{titleHi}</p>
          <p className="mt-1 text-sm text-slate-400">
            Fill in the details below and we&apos;ll generate your document.
          </p>
        </div>
        <SmartFill docType={docType} onFieldsExtracted={handleSmartFill} />
      </div>

      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-6">
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="mb-1.5 block text-sm font-medium text-slate-300"
                >
                  {field.label}
                  {field.required !== false && (
                    <span className="text-orange-500"> *</span>
                  )}
                </label>

                {field.type === "select" ? (
                  <select
                    id={field.name}
                    name={field.name}
                    required={field.required !== false}
                    onChange={() => handleFieldChange(field.name)}
                    className="h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30 dark:border-input"
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
                      className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm text-white shadow-xs outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] dark:bg-input/30 dark:border-input placeholder:text-muted-foreground resize-none"
                    />
                    {field.maxLength && (
                      <p className="mt-1 text-xs text-slate-500 text-right">
                        {charCounts[field.name] || 0} / {field.maxLength}
                      </p>
                    )}
                  </div>
                ) : field.type === "number" && field.prefix ? (
                  <div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
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
                        className="text-white pl-7"
                        onChange={(e) =>
                          handleNumberInput(field, e.target.value)
                        }
                      />
                    </div>
                    {currencyDisplays[field.name] && (
                      <p className="mt-1 text-xs text-slate-500">
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
                      className="text-white"
                      onChange={() => handleFieldChange(field.name)}
                    />
                    {field.suffix && (
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500">
                        {field.suffix}
                      </span>
                    )}
                  </div>
                )}

                {/* Helper text */}
                {field.helperText && !fieldErrors[field.name] && (
                  <p className="mt-1 text-xs text-slate-500">
                    {field.helperText}
                  </p>
                )}

                {/* Field error */}
                {fieldErrors[field.name] && (
                  <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {fieldErrors[field.name]}
                  </p>
                )}
              </div>
            ))}

            {error && <p className="text-sm text-red-400">{error}</p>}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {loadingText}
                </>
              ) : (
                "Generate Document"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

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
