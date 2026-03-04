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

const documentTypes = [
  {
    title: "Rental Agreement",
    titleHi: "किराया अनुबंध",
    description: "For tenants & landlords. Legally valid rent agreements under Indian law.",
    price: "99",
    icon: FileText,
    href: "/legal-docs/dashboard/rental-agreement",
    gradient: "from-orange-500/20 to-amber-500/5",
    iconBg: "from-orange-500 to-amber-600",
  },
  {
    title: "NDA",
    titleHi: "गोपनीयता समझौता",
    description: "Non-disclosure agreements for business confidentiality and IP protection.",
    price: "149",
    icon: Shield,
    href: "/legal-docs/dashboard/nda",
    gradient: "from-violet-500/20 to-indigo-500/5",
    iconBg: "from-violet-500 to-indigo-600",
  },
  {
    title: "Freelancer Contract",
    titleHi: "फ्रीलांसर अनुबंध",
    description: "Clear scope, deadlines, IP rights, and payment terms for projects.",
    price: "199",
    icon: Scale,
    href: "/legal-docs/dashboard/freelancer-contract",
    gradient: "from-purple-500/20 to-pink-500/5",
    iconBg: "from-purple-500 to-pink-600",
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
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Welcome back, {session.user.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-2 text-slate-400">
            Generate AI-powered legal documents in minutes.
          </p>
        </div>
        {freeDocsRemaining > 0 ? (
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-emerald-500/20">
            <div className="status-dot bg-emerald-400" />
            <span className="text-xs sm:text-sm font-medium text-emerald-400">
              {freeDocsRemaining} free
              <span className="hidden sm:inline"> doc{freeDocsRemaining !== 1 ? "s" : ""}</span>
              <span className="sm:hidden"> left</span>
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-2 rounded-full bg-orange-500/10 px-3 sm:px-4 py-1.5 sm:py-2 ring-1 ring-orange-500/20">
            <Zap className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-xs sm:text-sm font-medium text-orange-400">Pro</span>
          </div>
        )}
      </div>

      {/* Document Type Cards */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {documentTypes.map((doc) => (
          <Link key={doc.title} href={doc.href} className="group">
            <div className={`glass-card rounded-2xl p-6 h-full bg-gradient-to-br ${doc.gradient}`}>
              <div className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${doc.iconBg} shadow-lg`}>
                <doc.icon className="h-5 w-5 text-white" />
              </div>

              <h3 className="text-lg font-semibold text-white">{doc.title}</h3>
              <p className="text-sm text-orange-400/80 mb-2">{doc.titleHi}</p>
              <p className="text-[13px] leading-relaxed text-slate-400">{doc.description}</p>

              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-white">&#8377;{doc.price}</span>
                  <span className="text-xs text-slate-500">/ doc</span>
                </div>
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.04] transition-all group-hover:bg-orange-500/20 group-hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-slate-500 transition-colors group-hover:text-orange-400" />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* AI Badge */}
      <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
        <Sparkles className="h-3 w-3 text-orange-500/50" />
        <span>Powered by Google Gemini AI &middot; 10+ Indian languages</span>
      </div>

      {/* Pricing Section */}
      <div className="mt-12">
        <div className="mb-6 text-center">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center justify-center gap-2">
            <Crown className="h-5 w-5 text-orange-400" />
            Simple Pay-Per-Document Pricing
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Start with 2 free documents. Pay only when you need more &mdash; no subscription required.
          </p>
        </div>

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Free Tier */}
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-emerald-400" />
                <h3 className="text-sm font-semibold text-white">Free</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">&#8377;0</p>
              <p className="text-xs text-slate-500 mb-4">2 documents included</p>
              <ul className="space-y-2">
                {["2 free documents", "AI-powered generation", "All document types", "10+ Indian languages"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-slate-400">
                    <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Premium */}
            <div className="rounded-xl border border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-amber-500/5 p-5 relative overflow-hidden">
              <div className="absolute top-3 right-3 rounded-full bg-orange-500/10 px-2 py-0.5 text-[10px] font-medium text-orange-400 uppercase tracking-wider">
                Popular
              </div>
              <div className="flex items-center gap-2 mb-3">
                <CreditCard className="h-4 w-4 text-orange-400" />
                <h3 className="text-sm font-semibold text-white">Per Document</h3>
              </div>
              <p className="text-2xl font-bold text-white mb-1">&#8377;99 <span className="text-sm font-normal text-slate-500">onwards</span></p>
              <p className="text-xs text-slate-500 mb-4">Pay only when you need</p>
              <ul className="space-y-2">
                {["Stamp paper PDF styling", "PDF download included", "Priority AI generation", "Razorpay secure payment", "No subscription needed"].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-[13px] text-slate-400">
                    <Check className="h-3.5 w-3.5 text-orange-400 shrink-0" />
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
                className="rounded-lg border border-white/[0.06] bg-white/[0.02] px-4 py-3 hover:border-orange-500/20 hover:bg-orange-500/5 transition-all group"
              >
                <span className="text-[13px] font-medium text-white">{doc.title}</span>
                <span className="block text-lg font-bold text-orange-400 mt-0.5">&#8377;{doc.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Documents */}
      <div className="mt-12">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-base font-semibold text-white flex items-center gap-2">
            <Clock className="h-4 w-4 text-slate-500" />
            Recent Documents
          </h2>
          <Link
            href="/legal-docs/dashboard/documents"
            className="text-[13px] text-orange-400/80 hover:text-orange-300 transition-colors flex items-center gap-1"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentDocs.length === 0 ? (
          <div className="glass-card rounded-2xl py-10 text-center">
            <FileText className="mx-auto h-8 w-8 text-slate-600 mb-3" />
            <p className="text-sm text-slate-400">
              No documents yet. Create your first one above!
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentDocs.map((doc: { id: number; doc_type: string; status: string; created_at: string }) => (
              <Link key={doc.id} href={`/legal-docs/dashboard/documents/${doc.id}`}>
                <div className="glass-card rounded-xl flex items-center justify-between px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-500/10">
                      <FileText className="h-4 w-4 text-orange-400" />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white">
                        {formatDocType(doc.doc_type)}
                      </span>
                      <p className="text-xs text-slate-500">
                        {new Date(doc.created_at).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="status-dot bg-emerald-400" />
                    <span className="text-xs text-slate-500">Completed</span>
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
