import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  if (!session?.user?.id) redirect("/login");

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
        href="/dashboard"
        className="mb-6 inline-flex items-center gap-1 text-sm text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">My Documents</h1>
          <p className="mt-1 text-sm text-slate-400">
            {documents.length} document{documents.length !== 1 ? "s" : ""} generated
          </p>
        </div>
        <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
          <Link href="/dashboard">
            <Plus className="h-4 w-4" />
            New Document
          </Link>
        </Button>
      </div>

      {documents.length === 0 ? (
        <Card className="border-slate-800 bg-slate-900/50">
          <CardContent className="flex flex-col items-center justify-center py-16">
            <FileText className="h-12 w-12 text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-1">No documents yet</h3>
            <p className="text-sm text-slate-400 mb-6">
              Generate your first legal document to see it here.
            </p>
            <Button asChild className="bg-orange-600 hover:bg-orange-700 text-white">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {documents.map((doc: { id: number; doc_type: string; status: string; created_at: string }) => (
            <Card
              key={doc.id}
              className="border-slate-800 bg-slate-900/50 transition-colors hover:border-slate-700"
            >
              <CardContent className="flex items-center justify-between p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                    <FileText className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">
                      {formatDocType(doc.doc_type)}
                    </h3>
                    <p className="text-sm text-slate-400">
                      {new Date(doc.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={doc.status === "completed" ? "default" : "secondary"}
                    className={
                      doc.status === "completed"
                        ? "bg-green-500/10 text-green-400 border-green-500/20"
                        : ""
                    }
                  >
                    {doc.status === "completed" ? "Completed" : doc.status}
                  </Badge>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <Link href={`/dashboard/documents/${doc.id}`}>
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">View</span>
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-slate-400 hover:text-white"
                  >
                    <a href={`/api/documents/${doc.id}/pdf`} download>
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline ml-1">PDF</span>
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
