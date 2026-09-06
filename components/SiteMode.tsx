"use client";

import React, { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/profile";

type Mode = "human" | "machine";
const STORAGE_KEY = "site-mode";

/**
 * HUMAN / MACHINE view switch.
 *
 * HUMAN  → the designed portfolio (default).
 * MACHINE → the same person, rendered as a terminal spec sheet for the
 *           developer audience. Both live behind one floating segmented
 *           control pinned to the bottom-center of the viewport.
 */
export default function SiteMode() {
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<Mode>("human");
  const reduce = useReducedMotion() ?? false;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "machine" || saved === "human") {
        setMode(saved);
      }
    } catch {
      /* private mode / disabled storage — stay on default */
    }
  }, []);

  const select = useCallback((next: Mode) => {
    setMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* noop */
    }
  }, []);

  useEffect(() => {
    const onSet = (e: Event) => {
      const detail = (e as CustomEvent<Mode>).detail;
      if (detail === "human" || detail === "machine") select(detail);
    };
    window.addEventListener("set-site-mode", onSet as EventListener);
    return () =>
      window.removeEventListener("set-site-mode", onSet as EventListener);
  }, [select]);

  const machine = mounted && mode === "machine";

  useEffect(() => {
    if (!machine) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") select("human");
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [machine, select]);

  if (!mounted) return null;

  return (
    <>
      <AnimatePresence>{machine && <MachineView reduce={reduce} />}</AnimatePresence>

      <div className="fixed bottom-5 left-1/2 z-9999 -translate-x-1/2">
        <div className="flex items-center gap-0.5 rounded-full border border-black/10 bg-white/80 p-1 shadow-lg backdrop-blur-md dark:border-white/12 dark:bg-[#141414]/85">
          {(["human", "machine"] as Mode[]).map((m) => {
            const active = mode === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => select(m)}
                aria-pressed={active}
                className="relative flex items-center gap-1.5 rounded-full px-3 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] transition-colors"
              >
                {active && (
                  <motion.span
                    layoutId="site-mode-pill"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-neutral-900 dark:bg-neutral-100"
                  />
                )}
                <span
                  className={`relative z-10 flex items-center gap-1.5 ${
                    active
                      ? "text-white dark:text-neutral-900"
                      : "text-neutral-500 dark:text-neutral-400"
                  }`}
                >
                  <span
                    className={`size-1.5 rounded-full ${
                      active
                        ? "bg-current"
                        : "border border-current opacity-60"
                    }`}
                  />
                  {m}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */

function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  const isMail = href.startsWith("mailto:");
  return (
    <a
      href={href}
      target={isMail ? undefined : "_blank"}
      rel={isMail ? undefined : "noopener noreferrer"}
      className="text-emerald-400 underline-offset-2 hover:underline"
    >
      {children}
    </a>
  );
}

function MachineView({ reduce }: { reduce: boolean }) {
  const rows: Array<[string, React.ReactNode]> = [
    ["name", profile.name],
    ["role", profile.role],
    ["title", profile.title],
    ["location", `${profile.location}  ·  ${profile.timezone}`],
    ["education", profile.education],
    ["pronouns", profile.pronouns],
    ["status", profile.status],
    ["now", profile.now],
  ];

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.03 } },
  };
  const line = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.15 } },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-9998 overflow-y-auto bg-[#0b0b0c] scheme-dark"
      role="dialog"
      aria-modal="true"
      aria-label="Machine-readable profile"
    >
      <div className="pointer-events-none fixed inset-0 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.02)_3px)]" />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-2xl px-5 py-16 font-mono text-[13px] leading-relaxed text-neutral-400 sm:py-24"
      >
        <motion.p variants={line} className="text-neutral-600">
          machine view — press{" "}
          <span className="text-neutral-400">esc</span> or tap{" "}
          <span className="text-neutral-400">human</span> to return
        </motion.p>

        <motion.p variants={line} className="mt-6 text-neutral-300">
          <span className="text-emerald-400">ayantik@portfolio</span>
          <span className="text-neutral-600">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-neutral-600">$</span> whoami --verbose
        </motion.p>

        <div className="mt-4">
          {rows.map(([k, v]) => (
            <motion.p variants={line} key={k} className="flex gap-4">
              <span className="w-24 shrink-0 text-neutral-600">{k}</span>
              <span className="text-neutral-200">{v}</span>
            </motion.p>
          ))}

          <motion.p variants={line} className="mt-3 flex gap-4">
            <span className="w-24 shrink-0 text-neutral-600">stack</span>
            <span className="text-neutral-300">
              {profile.stack.map((s) => s.toLowerCase()).join("  ·  ")}
            </span>
          </motion.p>
        </div>

        <motion.p variants={line} className="mt-6 text-neutral-500">
          building/
        </motion.p>
        {Object.entries(profile.building).map(([k, url]) => (
          <motion.p variants={line} key={k} className="flex gap-4">
            <span className="w-24 shrink-0 pl-4 text-neutral-600">{k}</span>
            <ExtLink href={url}>{url.replace("https://", "")}</ExtLink>
          </motion.p>
        ))}

        <motion.p variants={line} className="mt-6 text-neutral-500">
          links/
        </motion.p>
        {Object.entries(profile.links).map(([k, url]) => (
          <motion.p variants={line} key={k} className="flex gap-4">
            <span className="w-24 shrink-0 pl-4 text-neutral-600">{k}</span>
            <ExtLink href={url}>{url.replace("https://", "")}</ExtLink>
          </motion.p>
        ))}
        <motion.p variants={line} className="flex gap-4">
          <span className="w-24 shrink-0 pl-4 text-neutral-600">email</span>
          <ExtLink href={`mailto:${profile.email}`}>{profile.email}</ExtLink>
        </motion.p>

        <motion.p variants={line} className="mt-6 text-neutral-500">
          endpoints/
        </motion.p>
        <motion.p variants={line} className="flex gap-4">
          <span className="w-24 shrink-0 pl-4 text-neutral-600">GET</span>
          <span className="text-neutral-300">
            <ExtLink href="/api/me">/api/me</ExtLink>
            <span className="text-neutral-600">  →  full JSON feed</span>
          </span>
        </motion.p>
        <motion.p variants={line} className="flex gap-4">
          <span className="w-24 shrink-0 pl-4 text-neutral-600">GET</span>
          <span className="text-neutral-300">
            /<span className="text-neutral-600">  →  curl for the ASCII card</span>
          </span>
        </motion.p>

        <motion.p variants={line} className="mt-8 text-neutral-300">
          <span className="text-emerald-400">ayantik@portfolio</span>
          <span className="text-neutral-600">:</span>
          <span className="text-sky-400">~</span>
          <span className="text-neutral-600">$</span>{" "}
          <span className="term-cursor inline-block h-[1em] w-[0.55em] translate-y-[0.15em] bg-neutral-500" />
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
