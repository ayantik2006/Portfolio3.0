import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import JsonLd from "@/components/JsonLd";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const path = "/blogs/what-one-year-frontend-dev-taught-me";
const title =
  "What 1 Year of Frontend Development Taught Me About Building Memorable Websites";
const description =
  "Ayantik Sarkar shares lessons from a year of frontend development — why memorable websites are built on intention, restraint, and purposeful motion, not flashy effects.";
const datePublished = "2026-06-12";

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
    images: [{ url: "/blog1.png", width: 1536, height: 1024, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/blog1.png"],
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
            image: "/blog1.png",
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
