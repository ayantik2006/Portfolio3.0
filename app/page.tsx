import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, profilePageJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={[
          profilePageJsonLd(),
          breadcrumbJsonLd([{ name: "Home", path: "/" }], "breadcrumb-home"),
        ]}
      />
      <HomeClient />
    </>
  );
}
