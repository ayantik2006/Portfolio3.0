"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Starting blur in px. */
  blur?: number;
  /** Starting scale. */
  scale?: number;
  as?: "div" | "section" | "li" | "article";
};

/**
 * Scroll-triggered reveal: fades in while un-blurring, settling up and in
 * from a slightly smaller size. Plays once; skipped for reduced motion.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  y = 14,
  blur = 10,
  scale = 0.98,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) return <Tag className={className}>{children}</Tag>;

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
