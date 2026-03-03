import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Download, Plus, ChevronRight } from "lucide-react";
import Link from "next/link";

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
      <div className="mb-8 flex items-center gap-1.5 text-[13px] text-slate-500">
        <Link href="/legal-docs/dashboard" className="hover:text-white transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/legal-docs/dashboard/documents" className="hover:text-white transition-colors">
          Documents
        </Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-slate-300">{formatDocType(doc.doc_type)}</span>
      </div>

      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {formatDocType(doc.doc_type)}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Generated on{" "}
            {new Date(doc.created_at).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            asChild
            variant="ghost"
            className="h-9 px-3 text-[13px] text-slate-400 hover:text-white hover:bg-white/[0.04] ring-1 ring-white/[0.06]"
          >
            <Link href={DOC_TYPE_ROUTES[doc.doc_type] || "/legal-docs/dashboard"}>
              <Plus className="h-3.5 w-3.5" />
              Generate Another
            </Link>
          </Button>
          <a
            href={`/legal-docs/api/documents/${doc.id}/pdf`}
            download
            className="btn-gradient inline-flex items-center gap-2 rounded-lg h-9 px-4 text-[13px] font-medium text-white"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </a>
        </div>
      </div>

      {/* Form Data Summary */}
      {formData && Object.keys(formData).length > 0 && (
        <div className="glass-card rounded-2xl mb-6 p-5">
          <h3 className="mb-3 text-xs font-semibold text-slate-500 uppercase tracking-widest">
            Details Used
          </h3>
          <div className="grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
            {Object.entries(formData)
              .filter(([key]) => key !== "language")
              .map(([key, value]) => (
                <div key={key} className="text-sm py-1">
                  <span className="text-slate-500 text-xs">{formatFieldName(key)}</span>
                  <p className="text-slate-200 text-[13px] truncate">{value as string}</p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Document Content */}
      <div className="glass-card rounded-2xl p-6 sm:p-8">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-[1.8] text-slate-300">
          {doc.generated_content}
        </pre>
      </div>
    </div>
  );
}
