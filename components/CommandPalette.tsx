"use client";

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Briefcase,
  Check,
  Copy,
  CornerDownLeft,
  FileText,
  FolderGit2,
  GraduationCap,
  Home,
  Layers,
  Mail,
  NotebookPen,
  Search,
  SunMoon,
  Terminal,
  UserRound,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ["latin"] });

const EMAIL = "ayantik.sarkar2020@gmail.com";
const GITHUB = "https://github.com/ayantik2006";
const LINKEDIN = "https://www.linkedin.com/in/ayantiksarkar/";
const TWITTER = "https://x.com/ayantik2006";

type Action = {
  id: string;
  label: string;
  group: string;
  keywords?: string;
  icon: React.ReactNode;
  perform: (ctx: ActionContext) => void;
  keepOpen?: boolean;
};

type ActionContext = {
  router: ReturnType<typeof useRouter>;
  goToSection: (id: string) => void;
  toggleTheme: () => void;
  copyEmail: () => void;
};

const iconClass = "size-4 shrink-0 text-neutral-500 dark:text-neutral-400";

const ACTIONS: Action[] = [
  // Navigate
  {
    id: "nav-home",
    label: "Home",
    group: "Navigate",
    keywords: "index landing start",
    icon: <Home className={iconClass} />,
    perform: ({ router }) => router.push("/"),
  },
  {
    id: "nav-projects",
    label: "Projects",
    group: "Navigate",
    keywords: "work portfolio builds",
    icon: <FolderGit2 className={iconClass} />,
    perform: ({ router }) => router.push("/projects"),
  },
  {
    id: "nav-blog",
    label: "Blog",
    group: "Navigate",
    keywords: "writing posts articles",
    icon: <NotebookPen className={iconClass} />,
    perform: ({ router }) => router.push("/blogs"),
  },
  {
    id: "nav-resume",
    label: "Résumé",
    group: "Navigate",
    keywords: "cv resume experience download",
    icon: <FileText className={iconClass} />,
    perform: ({ router }) => router.push("/resume"),
  },

  // Jump to (home sections)
  {
    id: "sec-about",
    label: "About",
    group: "Jump to section",
    keywords: "intro bio who",
    icon: <UserRound className={iconClass} />,
    perform: ({ goToSection }) => goToSection("about"),
  },
  {
    id: "sec-experience",
    label: "Experience",
    group: "Jump to section",
    keywords: "work history jobs roles",
    icon: <Briefcase className={iconClass} />,
    perform: ({ goToSection }) => goToSection("experience"),
  },
  {
    id: "sec-projects",
    label: "Projects",
    group: "Jump to section",
    keywords: "work builds showcase",
    icon: <FolderGit2 className={iconClass} />,
    perform: ({ goToSection }) => goToSection("projects"),
  },
  {
    id: "sec-writing",
    label: "Writing",
    group: "Jump to section",
    keywords: "blog posts articles",
    icon: <NotebookPen className={iconClass} />,
    perform: ({ goToSection }) => goToSection("writing"),
  },
  {
    id: "sec-stack",
    label: "Tech stack",
    group: "Jump to section",
    keywords: "skills tools technologies",
    icon: <Layers className={iconClass} />,
    perform: ({ goToSection }) => goToSection("stack"),
  },
  {
    id: "sec-education",
    label: "Education",
    group: "Jump to section",
    keywords: "school college degree",
    icon: <GraduationCap className={iconClass} />,
    perform: ({ goToSection }) => goToSection("education"),
  },
  {
    id: "sec-github",
    label: "GitHub activity",
    group: "Jump to section",
    keywords: "contributions graph commits",
    icon: <FaGithub className={iconClass} />,
    perform: ({ goToSection }) => goToSection("github"),
  },
  {
    id: "sec-contact",
    label: "Contact",
    group: "Jump to section",
    keywords: "email connect reach footer",
    icon: <Mail className={iconClass} />,
    perform: ({ goToSection }) => goToSection("contact"),
  },

  // Actions
  {
    id: "act-copy-email",
    label: "Copy email address",
    group: "Actions",
    keywords: "mail contact clipboard",
    icon: <Copy className={iconClass} />,
    perform: ({ copyEmail }) => copyEmail(),
    keepOpen: true,
  },
  {
    id: "act-theme",
    label: "Toggle theme",
    group: "Actions",
    keywords: "dark light mode appearance",
    icon: <SunMoon className={iconClass} />,
    perform: ({ toggleTheme }) => toggleTheme(),
    keepOpen: true,
  },
  {
    id: "act-machine",
    label: "Machine view",
    group: "Actions",
    keywords: "json terminal data developer raw source",
    icon: <Terminal className={iconClass} />,
    perform: () =>
      window.dispatchEvent(
        new CustomEvent("set-site-mode", { detail: "machine" })
      ),
  },
  {
    id: "act-github",
    label: "Open GitHub",
    group: "Actions",
    keywords: "profile code repositories",
    icon: <FaGithub className={iconClass} />,
    perform: () => window.open(GITHUB, "_blank", "noopener,noreferrer"),
  },
  {
    id: "act-linkedin",
    label: "Open LinkedIn",
    group: "Actions",
    keywords: "profile connect social",
    icon: <FaLinkedin className={iconClass} />,
    perform: () => window.open(LINKEDIN, "_blank", "noopener,noreferrer"),
  },
  {
    id: "act-twitter",
    label: "Open X / Twitter",
    group: "Actions",
    keywords: "tweet social profile",
    icon: <FaXTwitter className={iconClass} />,
    perform: () => window.open(TWITTER, "_blank", "noopener,noreferrer"),
  },
];

function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(false);

  const changeOpen = useCallback((next: boolean) => {
    openRef.current = next;
    if (next) {
      setQuery("");
      setActive(0);
      setCopied(false);
    }
    setOpen(next);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        changeOpen(!openRef.current);
      }
    };
    const onOpen = () => changeOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-command-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-command-palette", onOpen);
    };
  }, [changeOpen]);

  const goToSection = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }
      router.push(`/#${id}`);
    },
    [router]
  );

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const copyEmail = useCallback(() => {
    navigator.clipboard?.writeText(EMAIL).then(
      () => setCopied(true),
      () => setCopied(false)
    );
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ACTIONS;
    const tokens = q.split(/\s+/);
    return ACTIONS.filter((a) => {
      const hay = `${a.label} ${a.group} ${a.keywords ?? ""}`.toLowerCase();
      return tokens.every((t) => hay.includes(t));
    });
  }, [query]);

  const activeIndex = results.length
    ? Math.min(active, results.length - 1)
    : 0;

  useEffect(() => {
    const node = listRef.current?.querySelector<HTMLElement>(
      `[data-index="${activeIndex}"]`
    );
    node?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const run = useCallback(
    (action: Action) => {
      action.perform({ router, goToSection, toggleTheme, copyEmail });
      if (!action.keepOpen) changeOpen(false);
    },
    [router, goToSection, toggleTheme, copyEmail, changeOpen]
  );

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const count = results.length;
    if (!count) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((activeIndex + 1) % count);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((activeIndex - 1 + count) % count);
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(results[activeIndex]);
    }
  };

  return (
    <DialogPrimitive.Root open={open} onOpenChange={changeOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-200 bg-black/50 backdrop-blur-sm data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          className={`${geist.className} fixed left-1/2 top-[16vh] z-201 w-[92vw] max-w-lg -translate-x-1/2 overflow-hidden rounded-xl border border-neutral-200 bg-white/95 shadow-2xl backdrop-blur-xl data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 dark:border-neutral-800 dark:bg-[#100F0F]/95`}
        >
          <DialogPrimitive.Title className="sr-only">
            Command palette
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="sr-only">
            Search for a page, section, or action
          </DialogPrimitive.Description>

          <div className="flex items-center gap-2.5 border-b border-neutral-200 px-3.5 dark:border-neutral-800">
            <Search className="size-4 shrink-0 text-neutral-400" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={onInputKeyDown}
              placeholder="Jump to a section, page, or action…"
              className="h-12 w-full bg-transparent text-sm text-neutral-900 outline-none placeholder:text-neutral-400 dark:text-neutral-100"
              aria-label="Command palette search"
            />
            <kbd className="hidden shrink-0 rounded border border-neutral-200 px-1.5 py-0.5 font-mono text-[10px] text-neutral-400 sm:block dark:border-neutral-700">
              ESC
            </kbd>
          </div>

          <div
            ref={listRef}
            className="dialog-scrollbar max-h-[52vh] overflow-y-auto p-1.5"
          >
            {results.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-neutral-400">
                No matches for “{query}”
              </p>
            )}

            {results.map((action, index) => {
              const showGroup = results[index - 1]?.group !== action.group;
              const isActive = index === activeIndex;
              const isCopyDone = action.id === "act-copy-email" && copied;

              return (
                <React.Fragment key={action.id}>
                  {showGroup && (
                    <p className="px-2.5 pb-1 pt-3 text-[11px] font-medium uppercase tracking-wide text-neutral-400 first:pt-1">
                      {action.group}
                    </p>
                  )}
                  <button
                    type="button"
                    data-index={index}
                    onMouseEnter={() => setActive(index)}
                    onClick={() => run(action)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition-colors ${
                      isActive
                        ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800/80 dark:text-neutral-50"
                        : "text-neutral-700 dark:text-neutral-300"
                    }`}
                  >
                    {action.icon}
                    <span className="flex-1 truncate">
                      {isCopyDone ? "Copied to clipboard" : action.label}
                    </span>
                    {isCopyDone ? (
                      <Check className="size-3.5 text-emerald-500" />
                    ) : isActive ? (
                      <CornerDownLeft className="size-3.5 text-neutral-400" />
                    ) : null}
                  </button>
                </React.Fragment>
              );
            })}
          </div>

          <div className="flex items-center justify-between border-t border-neutral-200 px-3.5 py-2 text-[11px] text-neutral-400 dark:border-neutral-800">
            <span className="flex items-center gap-1">
              <ArrowUpRight className="size-3" />
              {resolvedTheme === "dark" ? "Dark" : "Light"} theme
            </span>
            <span className="font-mono">↑↓ navigate · ↵ select</span>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export default CommandPalette;
