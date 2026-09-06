import { NextRequest, NextResponse } from "next/server";
import { asciiCard } from "@/lib/profile";

// CLI HTTP clients that deserve the ASCII card instead of an SPA.
const CLI_AGENT = /\b(curl|wget|httpie|libwww-perl|lwp|python-requests)\b/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") ?? "";
  const accept = req.headers.get("accept") ?? "";

  const isCli = CLI_AGENT.test(ua) && !accept.includes("text/html");

  if (isCli) {
    return new NextResponse(asciiCard(), {
      status: 200,
      headers: {
        "content-type": "text/plain; charset=utf-8",
        "x-easter-egg": "you-found-one",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
