export const SITE_URL = "https://www.ayantiksarkar.com";

export const PERSON_NAME = "Ayantik Sarkar";
export const PERSON_ALTERNATE_NAMES = ["Ayantik", "Ayantik Sarkar Developer"];

export const SITE_NAME = "Ayantik Sarkar";
export const SITE_TITLE_DEFAULT = "Ayantik Sarkar — Full Stack Developer & CTO at HoardSpace";
export const SITE_TITLE_TEMPLATE = "%s | Ayantik Sarkar";

export const SITE_DESCRIPTION =
  "Ayantik Sarkar is a full stack developer and CTO at HoardSpace, studying Civil Engineering at NIT Rourkela. Creator of Pulse UI, Elimics, and FormAS — building scalable web apps with Next.js, React, and TypeScript.";

export const AUTHOR_EMAIL = "ayantik.sarkar2020@gmail.com";

export const SOCIAL_LINKS = {
  github: "https://github.com/ayantik2006",
  linkedin: "https://www.linkedin.com/in/ayantiksarkar/",
  twitter: "https://x.com/ayantik2006",
  hoardspace: "https://hoardspace.in",
  pulseui: "https://pulseui-henna.vercel.app",
  elimics: "https://elimics.com",
  formas: "https://formas.space",
  medium: "https://medium.com/@ayantik.sarkar2020",
};

export const SAME_AS = [
  SOCIAL_LINKS.github,
  SOCIAL_LINKS.linkedin,
  SOCIAL_LINKS.twitter,
  SOCIAL_LINKS.medium,
];

export const KEYWORDS = [
  "Ayantik Sarkar",
  "Ayantik",
  "Ayantik Sarkar Developer",
  "Ayantik Sarkar Portfolio",
  "Ayantik Sarkar GitHub",
  "Ayantik Sarkar NIT Rourkela",
  "Ayantik Sarkar Software Engineer",
  "Ayantik Sarkar Full Stack Developer",
  "Ayantik Sarkar HoardSpace",
  "Ayantik Sarkar CTO",
  "Full Stack Developer",
  "Software Engineer",
  "NIT Rourkela",
  "React Developer",
  "Next.js Developer",
  "HoardSpace",
  "Pulse UI",
  "Elimics",
  "FormAS",
];

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/ayantik.png`,
  width: 1200,
  height: 630,
  alt: "Ayantik Sarkar — Full Stack Developer",
};

function absoluteUrl(path = "") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: PERSON_NAME,
    alternateName: PERSON_ALTERNATE_NAMES,
    url: SITE_URL,
    image: `${SITE_URL}/ayantik.png`,
    jobTitle: ["Full Stack Developer", "Chief Technology Officer"],
    description: SITE_DESCRIPTION,
    email: `mailto:${AUTHOR_EMAIL}`,
    sameAs: SAME_AS,
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "PostgreSQL",
      "Java",
      "C++",
      "Tailwind CSS",
      "Docker",
      "Git",
      "REST APIs",
      "UI/UX Design",
      "Full Stack Development",
    ],
    worksFor: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization-hoardspace`,
      name: "HoardSpace Bookings Pvt. Ltd.",
      url: SOCIAL_LINKS.hoardspace,
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "National Institute of Technology, Rourkela",
      sameAs: "https://www.nitrkl.ac.in/",
    },
    homeLocation: {
      "@type": "Place",
      name: "Rourkela, Odisha, India",
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization-hoardspace`,
    name: "HoardSpace Bookings Pvt. Ltd.",
    url: SOCIAL_LINKS.hoardspace,
    logo: `${SITE_URL}/hoardspace-logo.png`,
    founder: {
      "@id": `${SITE_URL}/#person`,
    },
    employee: {
      "@id": `${SITE_URL}/#person`,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    publisher: {
      "@id": `${SITE_URL}/#person`,
    },
    inLanguage: "en-US",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blogs?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function profilePageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/#profilepage`,
    url: SITE_URL,
    name: SITE_TITLE_DEFAULT,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: { "@id": `${SITE_URL}/#person` },
    breadcrumb: { "@id": `${SITE_URL}/#breadcrumb-home` },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
  id: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/#${id}`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function collectionPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${absoluteUrl(path)}#collectionpage`,
    url: absoluteUrl(path),
    name,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
  };
}

export function softwareProjectJsonLd({
  name,
  description,
  url,
  image,
}: {
  name: string;
  description: string;
  url: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description,
    url,
    ...(image ? { image: absoluteUrl(image) } : {}),
    creator: { "@id": `${SITE_URL}/#person` },
    author: { "@id": `${SITE_URL}/#person` },
  };
}

export function blogPostingJsonLd({
  headline,
  description,
  path,
  image,
  datePublished,
}: {
  headline: string;
  description: string;
  path: string;
  image: string;
  datePublished: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${absoluteUrl(path)}#blogposting`,
    mainEntityOfPage: absoluteUrl(path),
    headline,
    description,
    image: absoluteUrl(image),
    url: absoluteUrl(path),
    datePublished,
    dateModified: datePublished,
    author: { "@id": `${SITE_URL}/#person` },
    publisher: { "@id": `${SITE_URL}/#person` },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}
