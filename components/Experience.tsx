"use client";

import { useState } from "react";
import { useTheme } from "next-themes";
import { Hanken_Grotesk } from "next/font/google";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

const experiences = [
  {
    company: "HoardSpace Bookings Pvt. Ltd.",
    role: "Chief Technology Officer",
    duration: "Dec 2025 – Present",
    location: "Rourkela",
    logo: "/hoardspace-logo.png",
    points: [
      "Owned all technical decisions as sole engineering lead for a full-stack booking marketplace, architecting the system from the ground up across frontend, backend, and infrastructure.",
      "Designed and shipped RESTful APIs and a scalable backend architecture supporting 25+ vendors (2.5k+ hoardings) for core booking and payment workflows.",
      "Built and deployed production features end-to-end - authentication, booking engine, admin dashboard - reducing manual operations overhead.",
      "Established CI/CD and engineering workflows, cutting deployment time and improving release reliability.",
      "Partnered directly with founders to translate business requirements into a technical roadmap for the platform.",
    ],
  },
];

function Experience() {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(1);

  return (
    <div
      className={`${hanken.className} mt-10 flex flex-col gap-3 justify-center w-full p-2 sm:p-0`}
    >
      <h1 className="font-semibold">Experience</h1>
      <div className="flex flex-col gap-3">
        {experiences.map((exp, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={exp.company}
              className={`-mx-4 sm:-mx-6 border overflow-hidden ${theme === "dark" ? "border-neutral-800" : "border-black/10"}`}
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className={`w-full flex items-center gap-4 px-6 py-4 text-left transition-colors duration-200 `}
              >
                <div
                  className={`p-2 w-fit h-fit border rounde shrink-0 ${theme === "dark" ? "bg-neutral-900 border-neutral-700" : ""}`}
                >
                  <div
                    className={`flex items-center justify-center rounded-lg w-9 h-9 borde overflow-hidden ${theme === "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
                  >
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      width={22}
                      height={22}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="flex flex-col flex-1 min-w-0 gap-0.5">
                  <h2 className="text-sm font-semibold truncate">
                    {exp.company}
                  </h2>
                  <p className="text-sm text-neutral-500 truncate">
                    {exp.role}
                  </p>
                </div>
                <div className="flex-col items-end gap-0.5 whitespace-nowrap hidden sm:flex">
                  <p className="text-sm font-semibold">{exp.duration}</p>
                  {exp.location && (
                    <p className="text-sm text-neutral-500">{exp.location}</p>
                  )}
                </div>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="shrink-0 mb-5"
                >
                  <ChevronDown size={16} className="text-neutral-500" />
                </motion.div>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="sm:hidden text-xs text-neutral-500 px-4 pb-4">
                      {exp.duration}
                      {exp.location ? ` · ${exp.location}` : ""}
                    </p>
                    <ul className="flex flex-col gap-3 px-4 pb-5 pt-1 pl-16 pr-6">
                      {exp.points.map((point, i) => (
                        <li
                          key={i}
                          className="text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 list-disc marker:text-neutral-400"
                        >
                          {point}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
      <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
    </div>
  );
}

export default Experience;
