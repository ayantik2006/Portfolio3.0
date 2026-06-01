"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import ColourfulText from "@/components/ui/colourful-text";
import { Scale } from "@/components/Scale";

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
        <div className="text-xl font-semibold">
          <ColourfulText text="Coming soon..." />
        </div>
      </div>
    </div>
  );
}
