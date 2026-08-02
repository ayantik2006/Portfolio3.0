import type { Metadata } from "next";
import ResumeClient from "./ResumeClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo";

const title = "Resume";
const description =
  "View and download Ayantik Sarkar's professional resume — full stack developer, CTO at HoardSpace, and Civil Engineering student at NIT Rourkela.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/resume",
  },
  openGraph: {
    title: `${title} | Ayantik Sarkar`,
    description,
    url: "/resume",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `${title} | Ayantik Sarkar`,
    description,
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: "Home", path: "/" },
            { name: "Resume", path: "/resume" },
          ],
          "breadcrumb-resume"
        )}
      />
      <ResumeClient />
    </>
  );
}
