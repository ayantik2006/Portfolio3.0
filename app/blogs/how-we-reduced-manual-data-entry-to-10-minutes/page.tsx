import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import JsonLd from "@/components/JsonLd";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const path = "/blogs/how-we-reduced-manual-data-entry-to-10-minutes";
const title =
  "How We Reduced Hours of Manual Data Entry to 10 Minutes Using Claude, Cloudinary, and MongoDB";
const description =
  "How Ayantik Sarkar and the HoardSpace team replaced hours of manual vendor onboarding with an AI-assisted workflow using Claude, Cloudinary, and MongoDB.";
const datePublished = "2026-08-02";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
  },
  authors: [{ name: "Ayantik Sarkar" }],
  openGraph: {
    type: "article",
    title,
    description,
    url: path,
    publishedTime: datePublished,
    authors: ["Ayantik Sarkar"],
    images: [{ url: "/blog2.png", width: 1536, height: 1024, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/blog2.png"],
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          blogPostingJsonLd({
            headline: title,
            description,
            path,
            image: "/blog2.png",
            datePublished,
          }),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
              { name: title, path },
            ],
            "breadcrumb-blogpost"
          ),
        ]}
      />
      <BlogPostClient />
    </>
  );
}
