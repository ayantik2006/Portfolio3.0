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
import { Menu, Search, X } from "lucide-react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    setIsMac(/Mac|iP(hone|ad|od)/.test(navigator.platform));
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 640 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  const openPalette = () => {
    setMenuOpen(false);
    window.dispatchEvent(new Event("open-command-palette"));
  };

  return (
    <div
      className={`${hanken.className} fixed inset-x-0 top-0 z-[130] w-full border-b border-black/5 backdrop-blur-lg dark:border-white/5`}
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-3 px-4 py-2.5 sm:px-6 sm:py-3">
        {/* mobile: hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative -ml-2 flex size-9 items-center justify-center rounded text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 sm:hidden dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={menuOpen ? "x" : "menu"}
              className="absolute"
              initial={{ opacity: 0, rotate: -90, scale: 0.5, filter: "blur(4px)" }}
              animate={{ opacity: 1, rotate: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotate: 90, scale: 0.5, filter: "blur(4px)" }}
              transition={{ duration: 0.18 }}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </motion.span>
          </AnimatePresence>
        </button>

        {/* desktop: inline links */}
        <nav className="hidden items-center gap-7 text-sm font-semibold sm:flex">
          {links.map(({ href, label }) => {
            const active = isActive(pathname, href);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`group relative py-1 transition-colors duration-200 ${
                  active
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200"
                }`}
              >
                {label}
                <span
                  aria-hidden
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-current transition-transform duration-300 ease-out ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="flex shrink-0 items-center gap-1 text-neutral-500 dark:text-neutral-400">
          <button
            type="button"
            onClick={openPalette}
            aria-label="Open command palette"
            className="group flex items-center gap-2 rounded border border-black/10 p-2 text-xs sm:py-1.5 sm:pl-2 sm:pr-1.5 text-neutral-400 transition-colors hover:border-black/20 hover:text-neutral-700 dark:border-white/10 dark:hover:border-white/20 dark:hover:text-neutral-200"
          >
            <Search className="size-3.5" />
            <span className="hidden sm:inline">Search</span>
            <kbd className="hidden rounded sm:block bg-black/5 px-1.5 py-0.5 font-mono text-[10px] leading-none dark:bg-white/10">
              {mounted ? (isMac ? "⌘K" : "Ctrl K") : "⌘K"}
            </kbd>
          </button>

          <Tooltip>
            <TooltipTrigger asChild>
              <a
                href="https://github.com/ayantik2006"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded px-2 py-2 duration-300 sm:px-2.5 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
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
                className="rounded px-2 py-2 duration-300 sm:px-2.5 hover:bg-neutral-100 hover:text-neutral-900 dark:hover:bg-neutral-900 dark:hover:text-neutral-100"
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

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="absolute inset-x-0 top-full -z-10 h-screen cursor-default bg-black/20 backdrop-blur-[2px] sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              className="absolute inset-x-0 top-full origin-top border-b border-black/5 bg-[#F9F9F9]/90 px-4 pb-3 pt-1 backdrop-blur-lg sm:hidden dark:border-white/5 dark:bg-[#100F0F]/90"
              initial={{ opacity: 0, scaleY: 0.92, filter: "blur(8px)" }}
              animate={{ opacity: 1, scaleY: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scaleY: 0.96, filter: "blur(6px)" }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <ul className="mx-auto flex max-w-3xl flex-col">
                {links.map(({ href, label }, i) => {
                  const active = isActive(pathname, href);
                  return (
                    <motion.li
                      key={href}
                      initial={{ opacity: 0, y: -6, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                    >
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between border-b border-dotted border-black/15 py-3 text-sm font-semibold last:border-b-0 dark:border-white/10 ${
                          active
                            ? "text-neutral-900 dark:text-neutral-100"
                            : "text-neutral-500 dark:text-neutral-400"
                        }`}
                      >
                        {label}
                        {active && (
                          <span className="size-1.5 rounded-full bg-current" />
                        )}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
