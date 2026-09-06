import { profile } from "@/lib/profile";

export const dynamic = "force-static";

export function GET() {
  const body = JSON.stringify(
    {
      $schema: "https://ayantiksarkar.com/api/me",
      ...profile,
      generated_at: new Date().toISOString(),
      note: "Hi 👋 — if you're reading this, you're exactly the kind of person I like working with.",
    },
    null,
    2
  );

  return new Response(body + "\n", {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "x-powered-by": "curiosity",
      "x-hire-me": profile.email,
    },
  });
}
