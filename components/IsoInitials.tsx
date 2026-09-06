"use client";

import React, { useMemo, useState } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";

/* ------------------------------------------------------------------ *
 *  Pixel monogram — "A · S". Front faces the viewer, extruded
 *  up-right for depth. Monochrome via currentColor, so it inverts
 *  cleanly between light and dark themes.
 * ------------------------------------------------------------------ */

const A_BITS = [
  "01110",
  "10001",
  "10001",
  "10001",
  "11111",
  "10001",
  "10001",
];

const S_BITS = [
  "01111",
  "10000",
  "10000",
  "01110",
  "00001",
  "00001",
  "11110",
];

const S = 22; // pixel size
const D = 9; // extrusion depth (up-right)
const LIFT = 13; // hover pop distance

type Pixel = { c: number; r: number; dot?: boolean };

function bitsToPixels(bits: string[], colOffset: number): Pixel[] {
  const out: Pixel[] = [];
  bits.forEach((row, r) =>
    [...row].forEach((cell, c) => {
      if (cell === "1") out.push({ c: colOffset + c, r });
    })
  );
  return out;
}

function facesOf(px: number, py: number) {
  const front = `${px},${py} ${px + S},${py} ${px + S},${py + S} ${px},${py + S}`;
  const top = `${px},${py} ${px + S},${py} ${px + S + D},${py - D} ${px + D},${py - D}`;
  const side = `${px + S},${py} ${px + S},${py + S} ${px + S + D},${py + S - D} ${px + S + D},${py - D}`;
  return { front, top, side };
}

function Block({
  p,
  hovered,
  reduce,
}: {
  p: Pixel;
  hovered: boolean;
  reduce: boolean;
}) {
  const px = p.c * S;
  const py = p.r * S;
  const { front, top, side } = facesOf(px, py);
  const delay = p.c * 0.026;

  const body = (
    <>
      <polygon points={side} fill="currentColor" fillOpacity={0.26} />
      <polygon points={top} fill="currentColor" fillOpacity={0.55} />
      <polygon points={front} fill="currentColor" fillOpacity={0.95} />
      <polygon
        points={front}
        fill="none"
        stroke="currentColor"
        strokeOpacity={0.16}
        strokeWidth={0.75}
      />
    </>
  );

  if (p.dot) {
    return (
      <motion.g
        animate={reduce ? { y: 0 } : { y: hovered ? -LIFT - 6 : [0, -4, 0] }}
        transition={
          reduce
            ? { duration: 0 }
            : hovered
              ? { type: "spring", stiffness: 320, damping: 15 }
              : { duration: 2.6, repeat: Infinity, ease: "easeInOut" }
        }
      >
        {body}
      </motion.g>
    );
  }

  return (
    <motion.g
      animate={{ y: reduce ? 0 : hovered ? -LIFT : 0 }}
      transition={
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 240, damping: 17, delay }
      }
    >
      {body}
    </motion.g>
  );
}

function IsoInitials({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState(false);

  const rotX = useSpring(0, { stiffness: 130, damping: 14 });
  const rotY = useSpring(0, { stiffness: 130, damping: 14 });

  const { pixels, viewBox } = useMemo(() => {
    const list: Pixel[] = [
      ...bitsToPixels(A_BITS, 0),
      ...bitsToPixels(S_BITS, 8),
      { c: 6, r: 3, dot: true },
    ];

    let minX = Infinity,
      minY = Infinity,
      maxX = -Infinity,
      maxY = -Infinity;
    for (const p of list) {
      const px = p.c * S;
      const py = p.r * S;
      minX = Math.min(minX, px);
      maxX = Math.max(maxX, px + S + D);
      minY = Math.min(minY, py - D);
      maxY = Math.max(maxY, py + S);
    }
    const padX = 6;
    const padTop = LIFT + 10;
    const padBottom = 6;

    // paint order: farthest (up-right) first, nearest (down-left) last
    list.sort((a, b) => b.c - b.r - (a.c - a.r));

    return {
      pixels: list,
      viewBox: `${minX - padX} ${minY - padTop} ${maxX - minX + padX * 2} ${
        maxY - minY + padTop + padBottom
      }`,
    };
  }, []);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    rotY.set(nx * 16);
    rotX.set(-ny * 9);
  };

  const reset = () => {
    rotX.set(0);
    rotY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      className={`relative z-10 mx-auto w-fit select-none text-neutral-600 dark:text-neutral-300 ${className}`}
      style={{ perspective: 900 }}
      onPointerEnter={() => setHovered(true)}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      role="img"
      aria-label="Ayantik Sarkar monogram"
    >
      <motion.div
        style={{
          rotateX: reduce ? 0 : rotX,
          rotateY: reduce ? 0 : rotY,
          transformStyle: "preserve-3d",
        }}
      >
        <svg
          viewBox={viewBox}
          className="h-28 w-auto overflow-visible sm:h-32"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {pixels.map((p, i) => (
            <Block
              key={p.dot ? "dot" : `${p.c}-${p.r}-${i}`}
              p={p}
              hovered={hovered}
              reduce={reduce}
            />
          ))}
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default IsoInitials;
