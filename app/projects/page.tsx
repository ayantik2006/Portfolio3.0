import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import JsonLd from "@/components/JsonLd";
import {
  breadcrumbJsonLd,
  collectionPageJsonLd,
  softwareProjectJsonLd,
} from "@/lib/seo";

const title = "Projects";
const description =
  "Explore full stack projects built by Ayantik Sarkar, including HoardSpace, Pulse UI, Elimics, and FormAS — built with Next.js, React, and TypeScript.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: `${title} | Ayantik Sarkar`,
    description,
    url: "/projects",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Ayantik Sarkar`,
    description,
  },
};

const projectsForSchema = [
  {
    name: "HoardSpace Bookings Pvt. Ltd.",
    description:
      "A B2B marketplace for OOH/DOOH advertising with scalable frontend, maps, and dynamic dashboards.",
    url: "https://hoardspace.in/",
    image: "/hoardspace_thumbnail.png",
  },
  {
    name: "Pulse UI",
    description:
      "A modern reusable component library built with React, Next.js & Tailwind, including the Pulse Toast npm package.",
    url: "https://pulseui-henna.vercel.app",
    image: "/pulseui-thumbnail.png",
  },
  {
    name: "Elimics",
    description:
      "A smart link intelligence platform turning static links into trackable, insight-driven experiences with real-time analytics.",
    url: "https://elimics.com",
    image: "/elimics-thumbnail.png",
  },
  {
    name: "FormAS",
    description:
      "A Form Backend as a Service that simplifies form handling for static websites and frontend applications.",
    url: "https://formas.space",
    image: "/formas.jpg",
  },
];

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          collectionPageJsonLd({ name: title, description, path: "/projects" }),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Projects", path: "/projects" },
            ],
            "breadcrumb-projects"
          ),
          ...projectsForSchema.map((p) => softwareProjectJsonLd(p)),
        ]}
      />
      <ProjectsClient />
    </>
  );
}
