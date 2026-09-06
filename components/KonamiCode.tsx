"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SEQUENCE = [
  "arrowup",
  "arrowup",
  "arrowdown",
  "arrowdown",
  "arrowleft",
  "arrowright",
  "arrowleft",
  "arrowright",
  "b",
  "a",
];

const GLYPHS = ["▲", "●", "■", "◆", "★", "+", "{ }", "</>", "01", "λ"];

const CARD = `┌─ ACCESS GRANTED ──────────────┐
│                               │
│   30 lives.  ∞ coffee.        │
│   you know your classics.     │
│                               │
│   › curl the site for more    │
└───────────────────────────────┘`;

export default function KonamiCode() {
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key === SEQUENCE[idx]) {
        idx += 1;
        if (idx === SEQUENCE.length) {
          idx = 0;
          setUnlocked(true);
          console.log(
            "%c🕹  KONAMI — cheat mode engaged",
            "color:#22c55e;font-weight:700;font-size:12px;"
          );
        }
      } else {
        idx = key === SEQUENCE[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!unlocked) return;
    const timer = setTimeout(() => setUnlocked(false), 6000);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setUnlocked(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
    };
  }, [unlocked]);

  return (
    <AnimatePresence>
      {unlocked && (
        <div className="pointer-events-none fixed inset-0 z-300 overflow-hidden">
          {Array.from({ length: 28 }).map((_, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-sm text-neutral-500 dark:text-neutral-400"
              initial={{ top: "-8vh", left: `${(i * 37) % 100}vw`, opacity: 0 }}
              animate={{ top: "108vh", opacity: [0, 1, 1, 0], rotate: 320 }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 2.4 + (i % 5) * 0.4,
                delay: (i % 7) * 0.12,
                ease: "easeIn",
              }}
            >
              {GLYPHS[i % GLYPHS.length]}
            </motion.span>
          ))}

          <motion.pre
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="absolute left-1/2 top-[20%] -translate-x-1/2 whitespace-pre rounded-lg border border-emerald-500/30 bg-black/90 px-6 py-5 text-center font-mono text-[11px] leading-relaxed text-emerald-400 shadow-2xl sm:text-xs"
          >
            {CARD}
          </motion.pre>
        </div>
      )}
    </AnimatePresence>
  );
}
