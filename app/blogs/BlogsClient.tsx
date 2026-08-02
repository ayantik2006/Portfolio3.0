"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function BlogsClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen items-center justify-center pt-14 sm:pt-16 ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"} ${hanken.className}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl mx-auto ">
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          Blogs by Ayantik Sarkar
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400 font-normal text-base">
          Insights, ideas, and lessons from building real-world projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-10">
          <Blog
            href="/blogs/what-one-year-frontend-dev-taught-me"
            theme={theme}
            img="/blog1.png"
            heading="What 1 Year of Frontend Development Taught Me About Building Memorable Websites"
            date="12.06.2026"
          />
        </div>
        <Footer />
      </div>
    </div>
  );
}

const Blog = ({
  href,
  theme,
  img,
  heading,
  date,
}: {
  href: string;
  theme: string | undefined;
  img: string;
  heading: string;
  date: string;
}) => {
  return (
    <Link
      href={href}
      className={`flex flex-col border overflow-hidden ${
        theme === "dark"
          ? "bg-neutral-950 border-neutral-800"
          : "bg-white border-neutral-200"
      }`}
    >
      <div className="w-full aspect-video overflow-hidden bg-neutral-900">
        <Image
          src={img}
          unoptimized
          height={300}
          width={300}
          alt={heading}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 p-5 flex-1">
        <h3 className="font-semibold text-base">{heading}</h3>
        <p className="text-sm text-neutral-500 flex-1">{date}</p>
        <div className="flex items-center gap-1 text-sm mt-3 self-end hover:underline">
          Read
          <ArrowUpRight size={14} />
        </div>
      </div>
    </Link>
  );
};
