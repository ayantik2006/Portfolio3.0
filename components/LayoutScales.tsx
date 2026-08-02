"use client";

import { Scale } from "@/components/Scale";

export default function LayoutScales() {
  return (
    <div className="pointer-events-none fixed inset-y-0 left-1/2 -translate-x-1/2 w-full max-w-3xl z-[120]">
      <Scale className="h-full w-6 absolute top-0 -left-6" />
      <Scale className="h-full w-6 absolute top-0 -right-6" />
    </div>
  );
}
