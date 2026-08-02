"use client";

import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!show) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed z-50 bottom-19 right-4 h-12 w-12 rounded-full dark:bg-neutral-800 bg-neutral-200 text-white flex items-center justify-center shadow-lg hover:scale-110 transition"
    >
      <ChevronUp size={20} className="stroke-neutral-400" />
    </button>
  );
}