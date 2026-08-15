import type { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import JsonLd from "@/components/JsonLd";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo";

const path = "/blogs/the-mongodb-query-that-broke-hoardspaces-explore-page";
const title = "The MongoDB Query That Broke HoardSpace's Explore Page";
const description =
  "How a single MongoDB $sample aggregation quietly took down HoardSpace's /explore page under real traffic, and how an in-memory cache with a soft/hard TTL and a refresh lock fixed it for good.";
const datePublished = "2026-08-15";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: path,
  },
  keywords: [
    "MongoDB $sample",
    "MongoDB aggregation performance",
    "fetch failed error",
    "in-memory caching Node.js",
    "stale-while-revalidate cache",
    "HoardSpace",
    "Next.js MongoDB",
    "database query optimization",
  ],
  authors: [{ name: "Ayantik Sarkar" }],
  openGraph: {
    type: "article",
    title,
    description,
    url: path,
    publishedTime: datePublished,
    authors: ["Ayantik Sarkar"],
    images: [{ url: "/blog3.webp", width: 1536, height: 1024, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/blog3.webp"],
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
            image: "/blog3.webp",
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
