"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
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
      className={`min-h-screen items-center justify-center pt-14 sm:pt-16 ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"} ${hanken.className}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl mx-auto">
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          Resume
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400">
          View and download my professional <a href="https://drive.google.com/file/d/1A-pl7foG-HlQN7bdzJm1zmUoF05RQX4w/view?usp=drive_link" target="_blank" className="hover:underline font-semibold">resume</a>
        </h2>
        <Scale className="w-[99%] mt-6 z-90 h-1" />
        <div className={`w-full p-3 flex items-center justify-center mt-5 rounded border ${theme=="dark"?"":""}`}>
          <iframe src="/resume.pdf" className="w-full h-[500px]" />
        </div>
        <Scale className="w-[99%] my-6 z-90 h-1" />
        <Footer/>
      </div>
    </div>
  );
}
