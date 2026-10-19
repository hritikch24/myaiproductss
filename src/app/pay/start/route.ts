import { NextRequest, NextResponse } from "next/server";

/** Clear the incoming referrer, including for older clients using location.assign. */
export function GET(request: NextRequest) {
  const url = new URL("/pay/checkout", request.url);
  const order = request.nextUrl.searchParams.get("order");
  if (order) url.searchParams.set("order", order);
  const response = NextResponse.redirect(url, 303);
  response.headers.set("Referrer-Policy", "no-referrer");
  response.headers.set("Cache-Control", "no-store");
  return response;
}
