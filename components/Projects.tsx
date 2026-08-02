"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
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
    title: "Elimics - Smart Link Analytics & URL Shortener",
    link: "https://elimics.com",
    status: "ongoing",
    thumbnail: "/elimics-thumbnail.png",
    summary:
      "A smart link intelligence platform turning static links into trackable, insight-driven experiences with real-time analytics.",
  },
  {
    title: "FormAS - Modern Form Backend for Developers",
    link: "https://formas.space",
    status: "ongoing",
    thumbnail: "/formas.jpg",
    summary:
      "A Form Backend as a Service that simplifies form handling for static websites and frontend applications.",
  },
];

function Projects() {
  const { theme } = useTheme();

  return (
    <div
      className={`${hanken.className} mt-5 flex flex-col gap-3 justify-center w-full p-2 sm:p-0 `}
    >
      <h1 className="font-semibold">Projects</h1>
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
            <div className="w-full aspect-video overflow-hidden bg-neutral-900">
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
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
      <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
    </div>
  );
}

export default Projects;
