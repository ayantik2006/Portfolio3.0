"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-130">
      <div className="pointer-events-auto absolute top-0 right-4 sm:right-6">
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
                  exit={{ opacity: 0, filter: "blur(0px)", scale: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaRegMoon />
                </motion.div>
              ) : (
                <motion.div
                  key="sun"
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
  );
}

export default ThemeToggle;
