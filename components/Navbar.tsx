"use client";

import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`${hanken.className} w-full flex items-center justify-center transition-all z-80 duration-300 sticky top-0 backdrop-blur-lg`}>
      <div className="w-full flex items-center justify-between px-6 py-3 max-w-3xl">
        <div className="flex items-center gap-8 text-sm text-neutral-400 font-semibold">
          <Link href={"/"}>Home</Link>
          <Link href={"/projects"}>Projects</Link>
          <Link href={"/blogs"}>Blog</Link>
          <Link href={"/resume"}>Resume</Link>
        </div>
        <div className="flex items-center gap-">
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="hover:bg-neutral-100 dark:hover:bg-neutral-900 duration-300 px-3 py-2 rounded"
                onClick={() => {
                  window.open("https://github.com/ayantik2006", "_blank");
                }}
              >
                <FaGithub />
              </button>
            </TooltipTrigger>
            <TooltipContent className="z-90">
              <p className={`font-semibold ${hanken.className}`}>
                Visit GitHub
              </p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="hover:bg-neutral-100 dark:hover:bg-neutral-900 duration-300 px-3 py-2 rounded"
                onClick={() => {
                  setTheme((prev)=>{
                    return prev==="dark"?"light":"dark";
                  })
                }}
              >
                {theme==="dark"?<FaRegMoon/>:<GoSun/>}
              </button>
            </TooltipTrigger>
            <TooltipContent className="z-90">
              <p className={`font-semibold ${hanken.className}`}>
                Toggle Mode
              </p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
