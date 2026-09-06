import { PERSON_NAME, SITE_URL, SOCIAL_LINKS, AUTHOR_EMAIL } from "@/lib/seo";

/**
 * Canonical machine-readable profile.
 * Consumed by /api/me, the curl ASCII card, and the console easter egg.
 */
export const profile = {
  name: PERSON_NAME,
  handle: "ayantik2006",
  role: "Full Stack Developer",
  title: "CTO @ HoardSpace",
  location: "Rourkela, Odisha, India",
  timezone: "Asia/Kolkata (UTC+5:30)",
  education: "Civil Engineering, NIT Rourkela",
  pronouns: "he/him",
  email: AUTHOR_EMAIL,
  website: SITE_URL,
  status: "open to interesting problems",
  now: "Building Elimics and Pulse UI",
  stack: [
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "Express",
    "Framer Motion",
    "Tailwind CSS",
  ],
  building: {
    "Pulse UI": SOCIAL_LINKS.pulseui,
    Elimics: SOCIAL_LINKS.elimics,
    FormAS: SOCIAL_LINKS.formas,
  },
  links: {
    github: SOCIAL_LINKS.github,
    linkedin: SOCIAL_LINKS.linkedin,
    twitter: SOCIAL_LINKS.twitter,
    medium: SOCIAL_LINKS.medium,
  },
} as const;

export type Profile = typeof profile;

/** Plain-text business card served to curl / wget / HTTPie. */
export function asciiCard(): string {
  const L = profile.links;
  return `
   ┌──────────────────────────────────────────────────────────┐
   │                                                          │
   │   ${profile.name.padEnd(52)} │
   │   ${(profile.role + "  ·  " + profile.title).padEnd(52)} │
   │                                                          │
   │   ${("↳ " + profile.location).padEnd(52)} │
   │   ${("↳ " + profile.education).padEnd(52)} │
   │   ${("↳ now: " + profile.now).padEnd(52)} │
   │                                                          │
   │   stack   ${profile.stack.slice(0, 5).join(", ").padEnd(46)} │
   │           ${profile.stack.slice(5).join(", ").padEnd(46)} │
   │                                                          │
   │   web     ${profile.website.replace("https://", "").padEnd(46)} │
   │   mail    ${profile.email.padEnd(46)} │
   │   github  ${L.github.replace("https://", "").padEnd(46)} │
   │   x       ${L.twitter.replace("https://", "").padEnd(46)} │
   │                                                          │
   └──────────────────────────────────────────────────────────┘

   You ran curl on a portfolio. We should talk.
   → JSON:  curl ${profile.website}/api/me
   → mail:  ${profile.email}
`;
}
