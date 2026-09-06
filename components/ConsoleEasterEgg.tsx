"use client";

import { useEffect } from "react";
import { profile } from "@/lib/profile";

let printed = false;

/** One styled console greeting for anyone who opens devtools. */
export default function ConsoleEasterEgg() {
  useEffect(() => {
    if (printed) return;
    printed = true;

    const heading = "font-size:13px;font-weight:700;";
    const dim = "color:#888;font-size:12px;";
    const accent = "color:#22c55e;font-size:12px;";

    console.log(
      `%c${profile.name}%c — ${profile.role}\n%cyou opened the console. respect.`,
      heading,
      dim,
      dim
    );

    console.log(
      `%cwhile you're here%c
  • machine-readable me   →  ${profile.website}/api/me
  • curl the homepage     →  ASCII business card
  • ↑ ↑ ↓ ↓ ← → ← → B A   →  give it a shot
  • hiring?               →  ${profile.email}`,
      "color:#888;font-weight:700;font-size:12px;",
      accent
    );
  }, []);

  return null;
}
