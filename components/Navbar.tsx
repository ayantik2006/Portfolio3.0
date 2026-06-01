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
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div
      className={`${hanken.className} w-full flex items-center justify-center transition-all z-[130] duration-300 fixed top-0 left-0 right-0 backdrop-blur-lg`}
    >
      <div className="w-full flex items-center justify-between px-4 sm:px-6 py-3 max-w-3xl gap-3">
        <div className="flex items-center gap-4 sm:gap-8 text-xs sm:text-sm text-neutral-400 font-semibold flex-wrap">
          <Link href={"/"}>Home</Link>
          <Link href={"/projects"}>Projects</Link>
          <Link href={"/blogs"}>Blog</Link>
          <Link href={"/resume"}>Resume</Link>
        </div>
        <div className="flex items-center shrink-0">
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
            <TooltipContent className="z-1000">
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
                  setTheme((prev) => {
                    return prev === "dark" ? "light" : "dark";
                  });
                }}
              >
                <AnimatePresence mode="wait">
                  {mounted && theme === "dark" ? (
                    <motion.div
                      key="moon"
                      // initial={{ opacity: 1, filter: "blur(0px)", scale: 0.8 }}
                      // animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(0px)", scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaRegMoon />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      // initial={{ opacity: 1, filter: "blur(0px)", scale: 0.8 }}
                      // animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                      exit={{ opacity: 0, filter: "blur(0px)", scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <GoSun />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </TooltipTrigger>
            <TooltipContent className="z-1000">
              <p className={`font-semibold ${hanken.className}`}>Toggle Mode</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
