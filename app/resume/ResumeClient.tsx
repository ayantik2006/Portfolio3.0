"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function ResumeClient() {
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
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl mx-auto">
        <Reveal className="mr-auto mt-5">
        <h1
          className={`text-2xl ${hanken.className} font-semibold`}
        >
          Ayantik Sarkar - Resume
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400 font-normal text-base">
          View and download my professional <a href="https://drive.google.com/file/d/1A-pl7foG-HlQN7bdzJm1zmUoF05RQX4w/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold">resume</a>
        </h2>
        </Reveal>
        <Reveal className="w-full mt-5" delay={0.1} scale={0.97}>
        <div className="w-full p-3 flex items-center justify-center rounded border">
          <iframe src="/resume.pdf" title="Ayantik Sarkar's resume" className="w-full h-[500px]" />
        </div>
        </Reveal>
        <div className="my-6" />
        <Footer/>
      </div>
    </div>
  );
}
