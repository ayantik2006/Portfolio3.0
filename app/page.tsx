"use client";

import Banner from "@/components/Banner";
import Intro from "@/components/Intro";
import Name from "@/components/Name";
import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Socials from "@/components/Socials";
import { Hanken_Grotesk } from "next/font/google";
import Stack from "@/components/Stack";
import Education from "@/components/Education";
import GitHub from "@/components/GitHub";
import Footer from "@/components/Footer";

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
      className={`min-h-screen items-center justify-center ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"}`}
    >
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl border-l-4 border-r-4 mx-auto border-dashed">
        <Banner />
        <Name/>
        <div className="w-full h-1 border-3 mt-4 border-dashed"></div>
        <Intro/>
        <Socials/>
        <div className="w-full h-1 border-3 mt-6 border-dashed"></div>
        <Stack/>
        <div className="w-full h-1 border-3 mt-6 border-dashed"></div>
        <Education/>
        <div className="w-full h-1 border-3 mt-6 border-dashed"></div>
        <GitHub/>
        <div className="w-full h-1 border-3 mt-6 border-dashed"></div>
        <Footer/>
      </div>
    </div>
  );
}
