import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Download, Plus, ChevronRight, FileText } from "lucide-react";
import Link from "next/link";
import { EditAndRegenerateButton } from "./edit-button";

const DOC_TYPE_ROUTES: Record<string, string> = {
  rental_agreement: "/legal-docs/dashboard/rental-agreement",
  nda: "/legal-docs/dashboard/nda",
  freelancer_contract: "/legal-docs/dashboard/freelancer-contract",
};

function formatDocType(docType: string): string {
  return docType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

function formatFieldName(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function DocumentPreviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/legal-docs/login");

  const { id } = await params;
  const docId = parseInt(id, 10);

  if (isNaN(docId)) redirect("/legal-docs/dashboard");

  const { rows } = await pool.query(
    "SELECT * FROM documents WHERE id = $1 AND user_id = $2",
    [docId, session.user.id]
  );

  if (!rows.length) redirect("/legal-docs/dashboard");

  const doc = rows[0];
  const formData =
    typeof doc.form_data === "string"
      ? JSON.parse(doc.form_data)
      : doc.form_data;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="mb-8 flex items-center gap-1.5 text-[13px] text-slate-400">
        <Link href="/legal-docs/dashboard" className="hover:text-slate-700 transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/legal-docs/dashboard/documents" className="hover:text-slate-700 transition-colors">
          Documents
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-700">{formatDocType(doc.doc_type)}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            {formatDocType(doc.doc_type)}
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Generated on{" "}
            {new Date(doc.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <EditAndRegenerateButton
            docType={doc.doc_type}
            formData={formData}
            href={DOC_TYPE_ROUTES[doc.doc_type] || "/legal-docs/dashboard"}
          />
          <Button
            asChild
            variant="ghost"
            className="h-9 px-3 text-[13px] text-slate-500 hover:text-slate-700 hover:bg-slate-100 ring-1 ring-slate-200"
          >
            <Link href={DOC_TYPE_ROUTES[doc.doc_type] || "/legal-docs/dashboard"}>
              <Plus className="h-3.5 w-3.5" />
              New
            </Link>
          </Button>
          <a
            href={`/legal-docs/api/documents/${doc.id}/pdf`}
            download
            className="inline-flex items-center gap-2 rounded-lg h-9 px-4 text-[13px] font-medium text-white bg-orange-500 shadow-sm hover:bg-orange-600 transition-colors"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>
          {doc.doc_type === "rental_agreement" && (
            <a
              href={`/legal-docs/api/documents/${doc.id}/pdf?format=stamp-blank`}
              download
              className="inline-flex items-center gap-2 rounded-lg h-9 px-4 text-[13px] font-medium text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              Download for Stamp Paper
            </a>
          )}
        </div>
      </div>

      {/* Form Data Summary */}
      {formData && Object.keys(formData).length > 0 && (
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm mb-6 p-5">
          <h3 className="mb-3 text-xs font-semibold text-slate-400 uppercase tracking-widest">
            Details Used
          </h3>
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(formData)
              .filter(([key]) => key !== "language")
              .map(([key, value]) => (
                <div key={key} className="text-sm py-1">
                  <span className="text-slate-400 text-xs">{formatFieldName(key)}</span>
                  <p className="text-slate-700 text-[13px] truncate">{value as string}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Document Content */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-[1.8] text-slate-700">
          {doc.generated_content}
        </pre>
      </div>
    </div>
  );
}
