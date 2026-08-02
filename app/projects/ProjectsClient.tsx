"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  bullets: string[];
};

const projects: Project[] = [
  {
    title: "HoardSpace Bookings Pvt. Ltd.",
    link: "https://hoardspace.in/",
    thumbnail: "/hoardspace_thumbnail.png",
    summary:
      "CTO at Hoardspace — built a B2B marketplace for OOH/DOOH advertising with scalable frontend, maps and dynamic dashboards.",
    bullets: [
      "CTO at Hoardspace — built a B2B marketplace for OOH/DOOH advertising",
      "Developed scalable frontend with Next.js & Tailwind",
      "Integrated maps and dynamic dashboards for ad discovery & management",
      "Designed APIs and system architecture for booking workflows",
      "Led product development from concept to deployment",
    ],
  },
  {
    title: "PulseUI - Production-ready animated UI components",
    link: "https://pulseui-henna.vercel.app",
    status: "ongoing",
    thumbnail: "/pulseui-thumbnail.png",
    summary:
      "A modern reusable component library built with React, Next.js & Tailwind, including the Pulse Toast npm package.",
    bullets: [
      "Built Pulse UI — a modern reusable component library",
      "Developed scalable components using React, Next.js & Tailwind",
      "Created Pulse Toast (npm package with 1500+ downloads)",
      "Designed APIs and system architecture for booking workflows",
      "Focused on performance, accessibility, and developer experience",
    ],
  },
  {
    title: "Elimics - Smart Link Analytics & URL Shortener",
    link: "https://elimics.com",
    status: "ongoing",
    thumbnail: "/elimics-thumbnail.png",
    summary:
      "A smart link intelligence platform turning static links into trackable, insight-driven experiences with real-time analytics.",
    bullets: [
      "Built Elimics — a smart link intelligence platform",
      "Turned static links into trackable, insight-driven experiences",
      "Enabled real-time analytics (views, clicks, engagement tracking)",
      "Designed scalable backend for link processing & data capture",
      "Developed clean, fast UI using Next.js & Tailwind",
      "Implemented secure link generation & access control",
      "Focused on performance, simplicity, and actionable insights",
      "Built foundation for upcoming paid links & monetization features",
    ],
  },
  {
    title: "FormAS - Modern Form Backend for Developers",
    link: "https://formas.space",
    status: "ongoing",
    thumbnail: "/formas.jpg",
    summary:
      "A Form Backend as a Service that simplifies form handling for static websites and frontend applications.",
    bullets: [
      "Built FormAS, a Form Backend as a Service that simplifies form handling for static websites and frontend applications",
      "Eliminated the need to build custom form backends for websites and apps",
      "Enabled instant form submission handling through a single API endpoint",
      "Implemented real-time email notifications for new submissions",
      "Added webhook support for seamless integration with APIs, Slack, Discord, Zapier, and n8n",
      "Built spam protection using honeypot fields and rate limiting",
      "Developed a centralized dashboard for managing form submissions",
      "Enabled CSV and JSON exports for easy data access and reporting",
    ],
  },
];

function ProjectCard({
  project,
  theme,
  onDetails,
}: {
  project: Project;
  theme: string | undefined;
  onDetails: () => void;
}) {
  return (
    <div
      className={`flex flex-col border overflow-hidden ${
        theme === "dark"
          ? "bg-neutral-950 border-neutral-800"
          : "bg-white border-neutral-200"
      }`}
    >
      <a href={project.link} target="_blank" rel="noopener noreferrer">
        <div className="relative w-full aspect-video overflow-hidden bg-neutral-900">
          <Image
            src={project.thumbnail}
            alt={`${project.title} — project screenshot by Ayantik Sarkar`}
            unoptimized
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </a>
      <div className="flex flex-col gap-2 p-5 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-base">{project.title}</h3>
          {project.status && (
            <span className="text-xs text-neutral-500">
              {project.status}
            </span>
          )}
        </div>
        <p className="text-sm text-neutral-500 flex-1">{project.summary}</p>
        <button
          onClick={onDetails}
          className="flex items-center gap-1 text-sm mt-3 self-end hover:underline"
        >
          Details
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
}

export default function ProjectsClient() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen items-center justify-center pt-14 sm:pt-16 ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"} ${hanken.className}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl mx-auto">
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          Projects by Ayantik Sarkar
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400 font-normal text-base">
          A selection of projects I&apos;ve built and shipped.
        </h2>


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full mt-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              theme={theme}
              onDetails={() => setActiveProject(project)}
            />
          ))}
        </div>

        <Dialog
          open={!!activeProject}
          onOpenChange={(open) => !open && setActiveProject(null)}
        >
          <DialogContent className={hanken.className}>
            {activeProject && (
              <>
                <div className="w-full overflow-hidden border-b border-neutral-200 dark:border-neutral-800">
                  <img
                    src={activeProject.thumbnail}
                    alt={`${activeProject.title} — project screenshot by Ayantik Sarkar`}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="flex flex-col gap-5 px-6 pb-6">
                  <DialogHeader>
                    <DialogTitle className="flex flex-wrap items-center gap-2 text-lg font-semibold">
                      <a
                        href={activeProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline underline-offset-4"
                      >
                        {activeProject.title}
                      </a>
                      {activeProject.status && (
                        <span className="text-xs font-normal text-neutral-500 border border-neutral-300 dark:border-neutral-700 px-1.5 py-0.5">
                          {activeProject.status}
                        </span>
                      )}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col gap-2.5">
                    {activeProject.bullets.map((bullet, i) => (
                      <div key={i} className="flex items-start gap-2.5">
                        <div className="bg-neutral-400 dark:bg-neutral-600 w-1 h-1 mt-2 shrink-0" />
                        <p className="text-sm leading-relaxed text-neutral-500">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        <Footer />
      </div>
    </div>
  );
}
