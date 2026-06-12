"use client";

import Banner from "@/components/Banner";
import Intro from "@/components/Intro";
import Name from "@/components/Name";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Socials from "@/components/Socials";
import { Hanken_Grotesk } from "next/font/google";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import GitHub from "@/components/GitHub";
import Footer from "@/components/Footer";
import { Scale } from "@/components/Scale";
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
      className={`min-h-screen mx-auto w-full overflow-x-hidden items-center justify-center relative ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 py-4 max-w-3xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2 w-full">
          <Banner />
          <Name />
        </div>
        <Scale className="w-[99%] mx-2 z-90 h-2 mt-4" />
        <Intro />
        <Socials />
        <Scale className="w-[99%] mx-2 z-90 h-2 mt-4" />
        <Stack />
        <Scale className="w-[99%] mx-2 z-90 h-2 mt-4" />
        {/* <SpotifyWidget/> */}
        {/* <Scale className="w-[99%] mx-2 z-90 h-2" /> */}
        <Education />
        <Scale className="w-[99%] mx-2 z-90 h-2 mt-4" />
        <GitHub />
        <Scale className="w-[99%] mx-2 z-90 h-2 mt-4" />
        <Footer />
      </div>
    </div>
  );
}
