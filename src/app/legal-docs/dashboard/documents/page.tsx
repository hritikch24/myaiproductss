import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/postgres-db";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Download, Eye, Plus } from "lucide-react";
import Link from "next/link";

function formatDocType(docType: string): string {
  return docType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function DocumentsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/legal-docs/login");

  const { rows: documents } = await pool.query(
    `SELECT id, doc_type, status, created_at
     FROM documents
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [session.user.id]
  );

  return (
    <div>
      <Link
        href="/legal-docs/dashboard"
        className="mb-6 inline-flex items-center gap-1.5 text-[13px] text-slate-400 hover:text-slate-700 transition-colors"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to Dashboard
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">My Documents</h1>
          <p className="mt-1 text-sm text-slate-400">
            {documents.length} document{documents.length !== 1 ? "s" : ""} generated
          </p>
        </div>
        <Link href="/legal-docs/dashboard" className="inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-colors">
          <Plus className="h-4 w-4" />
          New Document
        </Link>
      </div>

      {documents.length === 0 ? (
        <div className="rounded-2xl bg-white border border-slate-200/80 flex flex-col items-center justify-center py-20">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
            <FileText className="h-7 w-7 text-slate-400" />
          </div>
          <h3 className="text-base font-medium text-slate-900 mb-1">No documents yet</h3>
          <p className="text-sm text-slate-400 mb-6">
            Generate your first legal document to see it here.
          </p>
          <Link href="/legal-docs/dashboard" className="rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-orange-600 transition-colors">
            Get Started
          </Link>
        </div>
      ) : (
        <div className="space-y-2">
          {documents.map((doc: { id: number; doc_type: string; status: string; created_at: string }) => (
            <div
              key={doc.id}
              className="rounded-xl bg-white border border-slate-200/80 flex items-center justify-between p-4 sm:p-5 hover:shadow-sm hover:border-slate-300 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50">
                  <FileText className="h-5 w-5 text-orange-500" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-slate-900">
                    {formatDocType(doc.doc_type)}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {new Date(doc.created_at).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 ring-1 ring-emerald-200">
                  <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  <span className="text-[11px] font-medium text-emerald-700">Done</span>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <Link href={`/legal-docs/dashboard/documents/${doc.id}`}>
                    <Eye className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline ml-1 text-xs">View</span>
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <a href={`/legal-docs/api/documents/${doc.id}/pdf`} download>
                    <Download className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline ml-1 text-xs">PDF</span>
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
