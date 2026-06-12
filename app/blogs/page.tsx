"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import ColourfulText from "@/components/ui/colourful-text";
import { Scale } from "@/components/Scale";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function Page() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen items-center justify-center ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"} ${hanken.className}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl mx-auto ">
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          Blogs
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400">
          Insights, ideas, and lessons from building real-world projects
        </h2>
        <Scale className="w-[99%] my-6 z-90 h-1" />
        <div className="flex flex-col gap-3 w-full">
          <Blog
            img="/blog1.png"
            heading="What 1 Year of Frontend Development Taught Me About Building Memorable Websites"
            date="12.06.2026"
          />
        </div>
        <Footer/>
      </div>
    </div>
  );
}

const Blog = ({
  img,
  heading,
  date,
}: {
  img: string;
  heading: string;
  date: string;
}) => {
  return (
    <Link href={"/blogs/what-one-year-frontend-dev-taught-me"} className="p-1 border-3 rounded-lg">
      <div className="flex flex-col gap-6 p-6 border-2 rounded-md dark:bg-neutral-900 cursor-pointer dark:hover:bg-neutral-900/20 duration-300 bg-neutral-100 hover:bg-neutral-200/30">
        <div className="rounded-lg h-full w-full">
          <Image
            src={img}
            height={300}
            width={300}
            alt="blog1"
            className="w-full rounded-lg"
          />
        </div>
        <div className="">
          <h1 className="font-semibold text-lg">{heading}</h1>
        </div>
        <p className="text-neutral-400 -mt-5">{date}</p>
      </div>
    </Link>
  );
};
