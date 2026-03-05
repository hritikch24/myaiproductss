import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import pool from "@/lib/db";
import {
  FileText,
  Shield,
  Scale,
  ArrowRight,
  Clock,
  Sparkles,
  Zap,
  CreditCard,
  Check,
  Crown,
} from "lucide-react";
import Link from "next/link";

const premiumEnabled = process.env.NEXT_PUBLIC_PREMIUM_ENABLED === "true";

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements under Indian law.",
    price: "99",
    icon: FileText,
    href: "/legal-docs/dashboard/rental-agreement",
    gradient: "from-orange-500 to-amber-500",
    bgLight: "bg-orange-50",
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business confidentiality and IP protection.",
    price: "149",
    icon: Shield,
    href: "/legal-docs/dashboard/nda",
    gradient: "from-violet-500 to-indigo-500",
    bgLight: "bg-violet-50",
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Clear scope, deadlines, IP rights, and payment terms for projects.",
    price: "199",
    icon: Scale,
    href: "/legal-docs/dashboard/freelancer-contract",
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50",
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
  if (!session?.user) redirect("/legal-docs/login");

  const userId = (session.user as { id: string }).id;

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
      {/* Header */}
      <div className="mb-10 flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Welcome back, {session.user.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-2 text-slate-500">
            {premiumEnabled
              ? "Generate AI-powered legal documents in minutes."
              : "Generate AI-powered legal documents — completely free."}
          </p>
        </div>
        {freeDocsRemaining > 0 ? (
          <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-emerald-200">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-emerald-700">
              {freeDocsRemaining} free
              <span className="hidden sm:inline"> doc{freeDocsRemaining !== 1 ? "s" : ""}</span>
              <span className="sm:hidden"> left</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-orange-200">
            <Zap className="h-3.5 w-3.5 text-orange-500" />
            <span className="text-xs sm:text-sm font-medium text-orange-700">Pro</span>
          </div>
        )}
      </div>

      {/* Document Type Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documentTypes.map((doc) => (
          <Link key={doc.title} href={doc.href} className="group">
            <div className="rounded-2xl bg-white p-6 h-full border border-slate-200/80 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-300 hover:-translate-y-0.5">
              <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${doc.gradient} shadow-md`}>
                <doc.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-slate-900">{doc.title}</h3>
              <p className="text-sm text-orange-500/80 mb-2">{doc.titleHi}</p>
              <p className="text-[13px] leading-relaxed text-slate-500">{doc.description}</p>

              <div className="mt-5 flex items-center justify-between">
                {premiumEnabled ? (
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-slate-900">&#8377;{doc.price}</span>
                    <span className="text-xs text-slate-400">/ doc</span>
                  </div>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-sm font-semibold text-emerald-700">
                    Free
                  </span>
                )}
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-all group-hover:bg-orange-100 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-slate-400 transition-colors group-hover:text-orange-500" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* AI Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400">
        <Sparkles className="h-3 w-3 text-orange-400" />
        <span>Powered by Google Gemini AI &middot; 10+ Indian languages</span>
      </div>

      {/* Pricing Section */}
      {premiumEnabled && (
        <div className="mt-12">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 flex items-center justify-center gap-2">
              <Crown className="h-5 w-5 text-orange-500" />
              Simple Pay-Per-Document Pricing
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Start with 2 free documents. Pay only when you need more &mdash; no subscription required.
            </p>
          </div>

          <div className="rounded-2xl bg-white border border-slate-200/80 shadow-sm p-6 sm:p-8">
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Free Tier */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-emerald-500" />
                  <h3 className="text-sm font-semibold text-slate-900">Free</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">&#8377;0</p>
                <p className="text-xs text-slate-400 mb-4">2 documents included</p>
                <ul className="space-y-2">
                  {["2 free documents", "AI-powered generation", "All document types", "10+ Indian languages"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-slate-600">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Premium */}
              <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-5 relative overflow-hidden">
                <div className="absolute top-3 right-3 rounded-full bg-orange-100 px-2 py-0.5 text-[10px] font-medium text-orange-600 uppercase tracking-wider">
                  Popular
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <CreditCard className="h-4 w-4 text-orange-500" />
                  <h3 className="text-sm font-semibold text-slate-900">Per Document</h3>
                </div>
                <p className="text-2xl font-bold text-slate-900 mb-1">&#8377;99 <span className="text-sm font-normal text-slate-400">onwards</span></p>
                <p className="text-xs text-slate-400 mb-4">Pay only when you need</p>
                <ul className="space-y-2">
                  {["Stamp paper PDF styling", "PDF download included", "Priority AI generation", "Razorpay secure payment", "No subscription needed"].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-slate-600">
                      <Check className="h-3.5 w-3.5 text-orange-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 grid gap-2 sm:grid-cols-3 text-center">
              {documentTypes.map((doc) => (
                <Link
                  key={doc.title}
                  href={doc.href}
                  className="rounded-lg border border-slate-200 bg-slate-50/50 px-4 py-3 hover:border-orange-300 hover:bg-orange-50/50 transition-all group"
                >
                  <span className="text-[13px] font-medium text-slate-700">{doc.title}</span>
                  <span className="block text-lg font-bold text-orange-500 mt-0.5">&#8377;{doc.price}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Recent Documents */}
      <div className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900 flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-400" />
            Recent Documents
          </h2>
          <Link
            href="/legal-docs/dashboard/documents"
            className="text-[13px] text-orange-500 hover:text-orange-600 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentDocs.length === 0 ? (
          <div className="rounded-2xl bg-white border border-slate-200/80 py-10 text-center">
            <FileText className="mx-auto h-8 w-8 text-slate-300 mb-3" />
            <p className="text-sm text-slate-500">
              No documents yet. Create your first one above!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentDocs.map((doc: { id: number; doc_type: string; status: string; created_at: string }) => (
              <Link key={doc.id} href={`/legal-docs/dashboard/documents/${doc.id}`}>
                <div className="rounded-xl bg-white border border-slate-200/80 flex items-center justify-between px-5 py-3.5 hover:shadow-sm hover:border-slate-300 transition-all">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50">
                      <FileText className="h-4 w-4 text-orange-500" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-slate-900">
                        {formatDocType(doc.doc_type)}
                      </span>
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
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-400">Completed</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
