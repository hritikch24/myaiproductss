import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Shield,
  Scale,
  ArrowRight,
  Clock,
} from "lucide-react";
import Link from "next/link";

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements.",
    price: "99",
    icon: FileText,
    href: "/dashboard/rental-agreement",
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business and freelancers.",
    price: "149",
    icon: Shield,
    href: "/dashboard/nda",
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Clear scope, deadlines, IP rights, and payment terms.",
    price: "199",
    icon: Scale,
    href: "/dashboard/freelancer-contract",
  },
];

function formatDocType(docType: string): string {
  return docType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const userId = (session.user as { id: string }).id;

  // Fetch user info and recent documents in parallel
  const [userResult, recentDocsResult] = await Promise.all([
    pool.query("SELECT free_docs_used FROM users WHERE id = $1", [userId]),
    pool.query(
      `SELECT id, doc_type, status, created_at
       FROM documents
       WHERE user_id = $1
       ORDER BY created_at DESC
       LIMIT 3`,
      [userId]
    ),
  ]);

  const freeDocsUsed = userResult.rows[0]?.free_docs_used ?? 0;
  const freeDocsRemaining = Math.max(0, 2 - freeDocsUsed);
  const recentDocs = recentDocsResult.rows;

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">
            Welcome, {session.user.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-1 text-slate-400">
            Choose a document type to get started.
          </p>
        </div>
        {freeDocsRemaining > 0 ? (
          <Badge className="bg-green-500/10 text-green-400 border-green-500/20 px-3 py-1">
            {freeDocsRemaining} free doc{freeDocsRemaining !== 1 ? "s" : ""} remaining
          </Badge>
        ) : (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20 px-3 py-1">
            Paid plan
          </Badge>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {documentTypes.map((doc) => (
          <Link key={doc.title} href={doc.href}>
            <Card className="group cursor-pointer border-slate-800 bg-slate-900/50 transition-colors hover:border-orange-500/30 h-full">
              <CardContent className="p-6">
                <doc.icon className="mb-4 h-10 w-10 text-orange-500" />
                <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
                <p className="text-sm text-orange-400">{doc.titleHi}</p>
                <p className="mt-2 text-sm text-slate-400">{doc.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-2xl font-bold text-white">
                    Rs.{doc.price}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}
                      / doc
                    </span>
                  </p>
                  <ArrowRight className="h-5 w-5 text-slate-600 transition-colors group-hover:text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Documents Section */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-400" />
            Recent Documents
          </h2>
          <Link
            href="/dashboard/documents"
            className="text-sm text-orange-400 hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            View All Documents
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentDocs.length === 0 ? (
          <Card className="border-slate-800 bg-slate-900/50">
            <CardContent className="py-8 text-center">
              <p className="text-sm text-slate-400">
                No documents yet. Generate your first document above!
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentDocs.map((doc: { id: number; doc_type: string; status: string; created_at: string }) => (
              <Link key={doc.id} href={`/dashboard/documents/${doc.id}`}>
                <Card className="border-slate-800 bg-slate-900/50 transition-colors hover:border-slate-700">
                  <CardContent className="flex items-center justify-between p-4">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-orange-500" />
                      <span className="text-sm font-medium text-white">
                        {formatDocType(doc.doc_type)}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {new Date(doc.created_at).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
