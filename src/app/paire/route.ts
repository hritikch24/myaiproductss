import { NextRequest, NextResponse } from "next/server";

/** Retire the old product page and send existing links to the main website. */
export function GET(request: NextRequest) {
  return NextResponse.redirect(new URL("/", request.url), 308);
}
