import type { Metadata } from "next";
import BlogsClient from "./BlogsClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, collectionPageJsonLd } from "@/lib/seo";

const title = "Blogs";
const description =
  "Articles by Ayantik Sarkar on frontend development, UI design, and lessons learned building real-world full stack products.";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: "/blogs",
  },
  openGraph: {
    title: `${title} | Ayantik Sarkar`,
    description,
    url: "/blogs",
    type: "website",
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
        data={[
          collectionPageJsonLd({ name: title, description, path: "/blogs" }),
          breadcrumbJsonLd(
            [
              { name: "Home", path: "/" },
              { name: "Blogs", path: "/blogs" },
            ],
            "breadcrumb-blogs"
          ),
        ]}
      />
      <BlogsClient />
    </>
  );
}
