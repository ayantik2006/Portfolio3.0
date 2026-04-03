"use client";

import Navbar from "@/components/Navbar";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import ProjectIcon from "@/components/ProjectIcon";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
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
          Projects
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400">
          A selection of projects I&apos;ve built and shipped.
        </h2>
        <div className="w-full h-1 border-3 mt-4 border-dashed mb-10"></div>
        <div className="flex gap-3 mr-auto">
          <ProjectIcon />
          <div className="flex flex-col gap-3">
            <h1 className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"/>
              <a href="https://hoardspace.in/" target="_blank">
                HoardSpace
              </a>
              <Link href={"https://github.com/ayantik2006/project-xenon"} target="_blank"><FaGithub/></Link>
            </h1>
            <div className="w-fit p-2 border-2 rounded-lg">
              <Image src={"/hoardspace_thumbnail.png"} width={300} height={200} alt="" className="rounded-md"/>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">CTO at Hoardspace — built a B2B marketplace for OOH/DOOH advertising</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Developed scalable frontend with Next.js & Tailwind</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Integrated maps and dynamic dashboards for ad discovery & management</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Designed APIs and system architecture for booking workflows</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Led product development from concept to deployment</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-3 mr-auto mt-10">
          <ProjectIcon />
          <div className="flex flex-col gap-3">
            <h1 className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-600 rounded-full animate-pulse"/>
              <a href="https://pulseui-henna.vercel.app" target="_blank">
                PulseUI
              </a>
              <p className="text-sm text-neutral-500">ongoing</p>
              <Link href={"https://github.com/ayantik2006/pulse-ui"} target="_blank"><FaGithub/></Link>
            </h1>
            <div className="w-fit p-2 border-2 rounded-lg">
              <Image src={"/pulseui-thumbnail.png"} width={300} height={200} alt="" className="rounded-md"/>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Built Pulse UI — a modern reusable component library</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Developed scalable components using React, Next.js & Tailwind</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Created Pulse Toast (npm package with <b>1500+ downloads</b>)</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Designed APIs and system architecture for booking workflows</p>
              </div>
              <div className="flex items-center gap-2">
                <div className={`bg-neutral-500 w-1 h-1 rounded-full`} />
                <p className="text-sm text-neutral-500">Focused on performance, accessibility, and developer experience</p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-1 border-3 mt-4 border-dashed mb-10"></div>
        <Footer/>
      </div>
    </div>
  );
}
