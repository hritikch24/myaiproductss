import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Plus } from "lucide-react";
import Link from "next/link";

const DOC_TYPE_ROUTES: Record<string, string> = {
  rental_agreement: "/dashboard/rental-agreement",
  nda: "/dashboard/nda",
  freelancer_contract: "/dashboard/freelancer-contract",
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
  if (!session?.user?.id) redirect("/login");

  const { id } = await params;
  const docId = parseInt(id, 10);

  if (isNaN(docId)) redirect("/dashboard");

  const { rows } = await pool.query(
    "SELECT * FROM documents WHERE id = $1 AND user_id = $2",
    [docId, session.user.id]
  );

  if (!rows.length) redirect("/dashboard");

  const doc = rows[0];
  const formData =
    typeof doc.form_data === "string"
      ? JSON.parse(doc.form_data)
      : doc.form_data;

  return (
    <div>
      <div className="mb-6 flex items-center gap-2 text-sm text-slate-400">
        <Link href="/dashboard" className="hover:text-white transition-colors">
          Dashboard
        </Link>
        <span>/</span>
        <Link
          href="/dashboard/documents"
          className="hover:text-white transition-colors"
        >
          My Documents
        </Link>
        <span>/</span>
        <span className="text-slate-300">{formatDocType(doc.doc_type)}</span>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
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

        <div className="flex items-center gap-3">
          <Button
            asChild
            variant="outline"
            className="border-slate-700 text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <Link href={DOC_TYPE_ROUTES[doc.doc_type] || "/dashboard"}>
              <Plus className="h-4 w-4" />
              Generate Another
            </Link>
          </Button>
          <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
            <a href={`/api/documents/${doc.id}/pdf`} download>
              <Download className="h-4 w-4" />
              Download PDF
            </a>
          </Button>
        </div>
      </div>

      {/* Form Data Summary */}
      {formData && Object.keys(formData).length > 0 && (
        <Card className="mb-6 border-slate-800 bg-slate-900/50">
          <CardContent className="p-5">
            <h3 className="mb-3 text-sm font-medium text-slate-400 uppercase tracking-wider">
              Details Used
            </h3>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {Object.entries(formData)
                .filter(([key]) => key !== "language")
                .map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="text-slate-500">{formatFieldName(key)}: </span>
                    <span className="text-slate-300">{value as string}</span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="border-slate-800 bg-slate-900/50">
        <CardContent className="p-8">
          <div className="prose prose-invert max-w-none">
            <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-300">
              {doc.generated_content}
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
