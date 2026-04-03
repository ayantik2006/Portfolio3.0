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
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl border-l-4 border-r-4 mx-auto border-dashed">
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          Resume
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400">
          View and download my professional <a href="https://drive.google.com/file/d/1A-pl7foG-HlQN7bdzJm1zmUoF05RQX4w/view?usp=drive_link" target="_blank" className="hover:underline font-semibold">resume</a>
        </h2>
        <div className="w-full h-1 border-3 mt-4 border-dashed"></div>
        <div className="w-full p-3 bg-neutral-800 flex items-center justify-center mt-5 rounded border">
          <iframe src="/resume.pdf" className="w-full h-[500px]" />
        </div>
      </div>
    </div>
  );
}
