"use client";

import { useState, useRef, useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sparkles, Upload, Loader2, FileText, CheckCircle2, File } from "lucide-react";

interface SmartFillProps {
  docType: string;
  onFieldsExtracted: (fields: Record<string, string>) => void;
}

export function SmartFill({ docType, onFieldsExtracted }: SmartFillProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [extracted, setExtracted] = useState<Record<string, string> | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    const isPDF = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isText = file.type === "text/plain" || file.name.endsWith(".txt");

    if (isPDF) {
      try {
        const formData = new FormData();
        formData.append("file", file);

        const res = await fetch("/api/documents/extract-pdf", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          const body = await res.json();
          throw new Error(body.error || "Failed to extract text from PDF");
        }

        const { text: extractedText } = await res.json();

        if (extractedText && extractedText.trim().length > 0) {
          setText(extractedText);
        } else {
          setError("Could not extract text from this PDF. Please try pasting the text instead.");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to process PDF");
      } finally {
        setUploading(false);
      }
    } else if (isText) {
      try {
        const content = await file.text();
        setText(content);
      } catch {
        setError("Could not read this file. Please copy-paste the text instead.");
      } finally {
        setUploading(false);
      }
    } else {
      setUploading(false);
      setError("Only PDF and text files are supported. Please paste the text instead.");
    }

    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleExtract() {
    if (text.trim().length < 10) {
      setError("Please provide at least 10 characters of text.");
      return;
    }

    setLoading(true);
    setError("");
    setExtracted(null);

    try {
      const res = await fetch("/api/documents/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, docType }),
      });

      if (!res.ok) {
        const body = await res.json();
        throw new Error(body.error || "Extraction failed");
      }

      const { fields } = await res.json();

      if (Object.keys(fields).length === 0) {
        setError("No relevant fields found in the text. Try pasting more content.");
      } else {
        setExtracted(fields);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  function handleApply() {
    if (extracted) {
      onFieldsExtracted(extracted);
      setOpen(false);
      setText("");
      setExtracted(null);
      setError("");
    }
  }

  function formatFieldName(key: string): string {
    return key
      .replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
  }

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="border-orange-500/30 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
        suppressHydrationWarning
      >
        <Sparkles className="h-4 w-4" />
        Smart Fill
      </Button>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => {
      setOpen(isOpen);
      if (!isOpen) {
        setExtracted(null);
        setError("");
      }
    }}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-orange-500/30 text-orange-400 hover:text-orange-300 hover:bg-orange-500/10"
        >
          <Sparkles className="h-4 w-4" />
          Smart Fill
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-slate-900 border-slate-700 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-orange-500" />
            Smart Fill from Document
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Paste text from an existing document or upload a text file. We&apos;ll
            extract relevant details to pre-fill the form.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* File upload */}
          <div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.txt,.text"
              onChange={handleFileUpload}
              className="hidden"
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="border-slate-700 text-slate-300 hover:text-white"
              >
                {uploading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Upload className="h-4 w-4" />
                )}
                Upload PDF
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="border-slate-700 text-slate-300 hover:text-white"
              >
                <File className="h-4 w-4" />
                Upload Text
              </Button>
            </div>
          </div>

          {/* Text area for paste */}
          <textarea
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setExtracted(null);
              setError("");
            }}
            placeholder="Paste text from your existing document here...&#10;&#10;For example, paste content from an old rental agreement, contract, or any relevant document."
            rows={8}
            className="w-full rounded-md border border-slate-700 bg-slate-800/50 px-3 py-2 text-sm text-white placeholder:text-slate-500 outline-none focus-visible:border-orange-500/50 focus-visible:ring-orange-500/20 focus-visible:ring-[3px] resize-none"
          />

          {text.length > 0 && (
            <p className="text-xs text-slate-500">
              {text.length.toLocaleString()} characters
            </p>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          {/* Extracted fields preview */}
          {extracted && Object.keys(extracted).length > 0 && (
            <div className="rounded-lg border border-green-500/20 bg-green-500/5 p-3 space-y-2">
              <p className="text-sm font-medium text-green-400 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4" />
                Found {Object.keys(extracted).length} field{Object.keys(extracted).length !== 1 ? "s" : ""}
              </p>
              <div className="space-y-1">
                {Object.entries(extracted).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-slate-400">
                      {formatFieldName(key)}:{" "}
                    </span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 justify-end">
            {!extracted ? (
              <Button
                type="button"
                onClick={handleExtract}
                disabled={loading || text.trim().length < 10}
                className="bg-orange-600 hover:bg-orange-700 text-white"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Extracting...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Extract Fields
                  </>
                )}
              </Button>
            ) : (
              <Button
                type="button"
                onClick={handleApply}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="h-4 w-4" />
                Apply to Form
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
