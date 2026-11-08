"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Hanken_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

type Project = {
  title: string;
  link: string;
  status?: string;
  thumbnail: string;
  summary: string;
};

const projects: Project[] = [
  {
    title: "Threadpool - AI Agent Governance",
    link: "https://threadpool.in",
    status: "ongoing",
    thumbnail: "/threadpool-thumbnail.png",
    summary:
      "An agent governance system to register, monitor, and audit AI agents, with RBAC, policy enforcement and circuit breakers.",
  },
  {
    title: "Keel - Secrets Manager",
    link: "https://keel.hoardspace.in",
    thumbnail: "/keel-thumbnail.png",
    summary:
      "An Infisical-inspired secrets manager, used internally at HoardSpace, to replace insecure .env sharing.",
  },
];

function Projects() {
  const { theme } = useTheme();

  return (
    <div
      className={`${hanken.className} mt-5 flex flex-col gap-3 justify-center w-full p-2 sm:p-0 `}
    >
      <h2 className="font-semibold">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
        {projects.map((project) => (
          <a
            key={project.title}
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col border overflow-hidden ${
              theme === "dark"
                ? "bg-neutral-950 border-neutral-800"
                : "bg-white border-neutral-200"
            }`}
          >
            <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
              <Image
                src={project.thumbnail}
                alt={`${project.title} - project by Ayantik Sarkar`}
                unoptimized
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2 p-5 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base">{project.title}</h3>
                {project.status && (
                  <span className="text-xs text-neutral-500">
                    {project.status}
                  </span>
                )}
              </div>
              <p className="text-sm text-neutral-500 flex-1">
                {project.summary}
              </p>
            </div>
          </a>
        ))}
      </div>
      <Link
        href="/projects"
        className={`flex items-center justify-center gap-1 text-sm mt-2 w-full border py-2.5 hover:underline ${
          theme === "dark" ? "border-neutral-800" : "border-neutral-200"
        }`}
      >
        More projects
        <ArrowUpRight size={14} />
      </Link>
      <div className="w-screen h-0 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-t-2 border-dotted border-black/25 dark:border-white/15" />
    </div>
  );
}

export default Projects;
