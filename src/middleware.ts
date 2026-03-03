import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Only protect legal-docs dashboard routes
  if (pathname.startsWith("/legal-docs/dashboard")) {
    const cookies = request.cookies.getAll();
    const hasSession = cookies.some(cookie => 
      cookie.name.startsWith("next-auth.") || 
      cookie.name.startsWith("__Secure-")
    );
    
    if (!hasSession) {
      return NextResponse.redirect(new URL("/legal-docs/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/legal-docs/dashboard/:path*"],
};
