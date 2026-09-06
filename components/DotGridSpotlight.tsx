"use client";

import React, { useRef } from "react";

/**
 * Ruled dot-grid backdrop with a spotlight that follows the pointer.
 * A faint grid + intersection dots are always visible, vignetted toward
 * the edges; a brighter dot layer is revealed under a soft radial mask
 * centered on the cursor. Fully theme-aware via CSS custom properties.
 */
function DotGridSpotlight({
  children,
  className = "",
}: {
  children?: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  };

  const clearSpot = () => {
    const el = ref.current;
    if (!el) return;
    el.style.removeProperty("--spot-x");
    el.style.removeProperty("--spot-y");
  };

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={clearSpot}
      className={`dotgrid relative ${className}`}
    >
      <div aria-hidden="true" className="dotgrid-layer dotgrid-base" />
      <div aria-hidden="true" className="dotgrid-layer dotgrid-spot" />
      <div aria-hidden="true" className="dotgrid-glow" />
      {children}
    </div>
  );
}

export default DotGridSpotlight;
