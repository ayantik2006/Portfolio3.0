"use client";

import Banner from "@/components/Banner";
import Intro from "@/components/Intro";
import QuickActions from "@/components/QuickActions";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blogs from "@/components/Blogs";
import Name from "@/components/Name";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Socials from "@/components/Socials";
import { Hanken_Grotesk } from "next/font/google";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import GitHub from "@/components/GitHub";
import Footer from "@/components/Footer";
import SpotifyWidget from "@/components/SpotifyWidget";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function Home() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen mx-auto w-full overflow-x-hidden items-center justify-center relative pt-14 sm:pt-16 ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 max-w-3xl mx-auto">
        <div className="relative flex flex-row items-end gap-5 w-full">
          <div className="absolute top-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-t-2 border-dotted border-black/25 dark:border-white/15" />
          <div className="absolute bottom-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-b-2 border-dotted border-black/25 dark:border-white/15" />
          <Banner />
          <Name />
        </div>
        <div className="w-screen h-6 mt-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
        <QuickActions />
        <div className="w-screen h-6 mt-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
        <Intro />
        <Socials />
        <Experience />
        <Projects />
        <Blogs />
        <Stack />
        {/* <SpotifyWidget/> */}
        <Education />
        <GitHub />
        <Footer />
      </div>
    </div>
  );
}
