"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Hanken_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

type Blog = {
  href: string;
  img: string;
  heading: string;
  date: string;
};

const blogs: Blog[] = [
  {
    href: "/blogs/what-one-year-frontend-dev-taught-me",
    img: "/blog1.png",
    heading:
      "What 1 Year of Frontend Development Taught Me About Building Memorable Websites",
    date: "12.06.2026",
  },
];

function Blogs() {
  const { theme } = useTheme();

  return (
    <div
      className={`${hanken.className} mt-5 flex flex-col gap-3 justify-center w-full p-2 sm:p-0 `}
    >
      <h1 className="font-semibold">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {blogs.map((blog) => (
          <Link
            key={blog.href}
            href={blog.href}
            className={`flex flex-col border overflow-hidden ${
              theme === "dark"
                ? "bg-neutral-950 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            <div className="w-full aspect-video overflow-hidden bg-neutral-900">
              <Image
                src={blog.img}
                height={300}
                width={300}
                alt={blog.heading}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-5 flex-1">
              <h3 className="font-semibold text-base">{blog.heading}</h3>
              <p className="text-sm text-neutral-500 flex-1">{blog.date}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link
        href="/blogs"
        className={`flex items-center justify-center gap-1 text-sm mt-2 w-full border py-2.5 hover:underline ${
          theme === "dark" ? "border-neutral-800" : "border-neutral-200"
        }`}
      >
        More blogs
        <ArrowUpRight size={14} />
      </Link>
      <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
    </div>
  );
}

export default Blogs;
