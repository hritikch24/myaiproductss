import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const NICHE_SUBDOMAINS = new Set([
  "homeservices",
  "staffing",
  "insurance",
  "lawfirms",
  "accounting",
]);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- Subdomain routing for kraftai.in niche landing pages ---
  const hostname = request.headers.get("host") || "";

  // Match {niche}.kraftai.in or {niche}.localhost:3000 for local dev
  const subdomainMatch = hostname.match(
    /^([a-z0-9-]+)\.(?:kraftai\.in|localhost(?::\d+)?)$/
  );

  if (subdomainMatch) {
    const niche = subdomainMatch[1];
    if (NICHE_SUBDOMAINS.has(niche)) {
      // Don't rewrite API routes or Next.js internals — they must resolve at their original paths
      if (pathname.startsWith("/api/") || pathname.startsWith("/_next/")) {
        return NextResponse.next();
      }
      const url = request.nextUrl.clone();
      url.pathname = `/sites/${niche}${pathname}`;
      return NextResponse.rewrite(url);
    }
  }

  // Payment links stay on the main domain while retaining the validated,
  // icon-only checkout. Other homepage visits keep the normal website.
  if (pathname === "/" && request.nextUrl.searchParams.has("order")) {
    const url = new URL("/pay/checkout", request.url);
    url.searchParams.set("order", request.nextUrl.searchParams.get("order") ?? "");
    // Old clients may still navigate with a referrer. A single redirect to the
    // same root URL clears document.referrer before loading the payment SDK.
    const entry = new URL("/", request.url);
    entry.searchParams.set("order", request.nextUrl.searchParams.get("order") ?? "");
    const response = request.headers.get("referer")
      ? NextResponse.redirect(entry, 303)
      : NextResponse.rewrite(url);
    response.headers.set("Referrer-Policy", "no-referrer");
    response.headers.set("Cache-Control", "no-store");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  // --- Existing auth redirect logic ---
  const cookies = request.cookies.getAll();
  const hasSession = cookies.some(
    (cookie) =>
      cookie.name.startsWith("next-auth.") ||
      cookie.name.startsWith("__Secure-")
  );

  // Protect legal-docs dashboard routes
  if (pathname.startsWith("/legal-docs/dashboard")) {
    if (!hasSession) {
      return NextResponse.redirect(
        new URL("/legal-docs/login", request.url)
      );
    }
  }

  // Protect padhai app routes (except landing, login, onboarding, track)
  const padhaiProtected =
    pathname.startsWith("/padhai/dashboard") ||
    pathname.startsWith("/padhai/goals") ||
    pathname.startsWith("/padhai/quiz") ||
    pathname.startsWith("/padhai/timer") ||
    pathname.startsWith("/padhai/photo") ||
    pathname.startsWith("/padhai/profile") ||
    pathname.startsWith("/padhai/parent") ||
    pathname.startsWith("/padhai/syllabus") ||
    pathname.startsWith("/padhai/premium");

  if (padhaiProtected && !hasSession) {
    return NextResponse.redirect(new URL("/padhai/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/legal-docs/dashboard/:path*",
    "/padhai/:path*",
    "/sites/:path*",
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
