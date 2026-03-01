import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only check auth for dashboard routes
  if (pathname.startsWith("/dashboard")) {
    // Check for session cookie
    const sessionCookie = request.cookies.get("next-auth.session-token") || 
                         request.cookies.get("__Secure-next-auth.session-token");
    
    if (!sessionCookie) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged in users away from login
  if (pathname === "/login") {
    const sessionCookie = request.cookies.get("next-auth.session-token") || 
                         request.cookies.get("__Secure-next-auth.session-token");
    
    if (sessionCookie) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
