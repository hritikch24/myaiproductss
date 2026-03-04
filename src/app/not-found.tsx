import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030712] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-orange-500 mb-4">404</div>
        <h1 className="text-2xl font-bold text-white mb-2">Page Not Found</h1>
        <p className="text-slate-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600"
          >
            Go Home
          </Link>
          <Link
            href="/legal-docs/dashboard"
            className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-800/50 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-800"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
