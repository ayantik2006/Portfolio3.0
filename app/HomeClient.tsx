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
import NowPlaying from "@/components/NowPlaying";
import IsoInitials from "@/components/IsoInitials";
import DotGridSpotlight from "@/components/DotGridSpotlight";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function HomeClient() {
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
        <div className="w-screen ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15">
          <DotGridSpotlight className="mx-auto flex w-full max-w-3xl items-center justify-center overflow-hidden px-4 py-10 sm:px-6 sm:py-14">
            <IsoInitials />
          </DotGridSpotlight>
        </div>
        <div className="relative flex flex-row items-end gap-5 w-full pt-5">
          <div className="absolute bottom-0 left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] border-b-2 border-dotted border-black/25 dark:border-white/15" />
          <Banner />
          <Name />
        </div>
        <div className="w-screen h-6 mt-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
        <QuickActions />
        <NowPlaying className="mt-5 w-full" />
        <div className="w-screen h-6 mt-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
        <section id="about" className="w-full scroll-mt-24">
          <Intro />
        </section>
        <section id="socials" className="w-full scroll-mt-24">
          <Socials />
        </section>
        <section id="experience" className="w-full scroll-mt-24">
          <Experience />
        </section>
        <section id="projects" className="w-full scroll-mt-24">
          <Projects />
        </section>
        <section id="writing" className="w-full scroll-mt-24">
          <Blogs />
        </section>
        <section id="stack" className="w-full scroll-mt-24">
          <Stack />
        </section>
        <section id="education" className="w-full scroll-mt-24">
          <Education />
        </section>
        <section id="github" className="w-full scroll-mt-24">
          <GitHub />
        </section>
        <section id="contact" className="w-full scroll-mt-24">
          <Footer />
        </section>
      </div>
    </div>
  );
}
