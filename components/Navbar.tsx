"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FaGithub, FaRegMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";
import { Search } from "lucide-react";
import { useTheme } from "next-themes";
import { Hanken_Grotesk } from "next/font/google";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/resume", label: "Resume" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsMac(/Mac|iP(hone|ad|od)/.test(navigator.platform));
  }, []);

  const openPalette = () =>
    window.dispatchEvent(new Event("open-command-palette"));

  return (
    <div
      className={`${hanken.className} fixed inset-x-0 top-0 z-[130] w-full border-b border-black/5 backdrop-blur-lg dark:border-white/5`}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <nav className="flex flex-wrap items-center gap-4 text-xs font-semibold sm:gap-7 sm:text-sm">
          {links.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`relative transition-colors duration-200 ${
                  active
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute -bottom-1 left-0 right-0 h-px bg-neutral-900 dark:bg-neutral-100"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 text-neutral-500 dark:text-neutral-400">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="group flex items-center gap-2 rounded border border-black/10 py-1.5 pl-2 pr-1.5 text-xs text-neutral-400 transition-colors hover:border-black/20 hover:text-neutral-700 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-neutral-200"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="rounded bg-black/5 px-1.5 py-0.5 font-mono text-[10px] leading-none dark:bg-white/10">
              {mounted ? (isMac ? "⌘K" : "Ctrl K") : "⌘K"}
            </kbd>
          </button>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/ayantik2006"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded px-2.5 py-2 duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
              >
                <FaGithub />
              </a>
            </TooltipTrigger>
            <TooltipContent className="z-1000">
              <p className={`font-semibold ${hanken.className}`}>Visit GitHub</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                aria-label="Toggle theme"
                className="rounded px-2.5 py-2 duration-300 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
                onClick={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mounted && theme === "dark" ? (
                    <motion.span
                      key="moon"
                      className="block"
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FaRegMoon />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="sun"
                      className="block"
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <GoSun />
                    </motion.span>
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
