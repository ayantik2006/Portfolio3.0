import type { ComponentType } from "react";
import {
  SiExpress,
  SiFramer,
  SiGit,
  SiMongodb,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

type Tech = { name: string; Icon: ComponentType<{ className?: string }> };

const STACK: Tech[] = [
  { name: "TypeScript", Icon: SiTypescript },
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "Node.js", Icon: SiNodedotjs },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Framer Motion", Icon: SiFramer },
  { name: "MongoDB", Icon: SiMongodb },
  { name: "Express", Icon: SiExpress },
  { name: "Git", Icon: SiGit },
];

function Item({ tech, clone }: { tech: Tech; clone?: boolean }) {
  const { Icon, name } = tech;
  return (
    <div
      data-clone={clone ? "true" : undefined}
      className="group/item flex shrink-0 items-center"
    >
      <span className="flex items-center gap-2">
        <Icon className="size-4 text-neutral-400 transition-colors duration-200 group-hover/item:text-neutral-900 dark:text-neutral-500 dark:group-hover/item:text-neutral-100" />
        <span className="whitespace-nowrap text-sm font-medium text-neutral-500 transition-colors duration-200 group-hover/item:text-neutral-900 dark:text-neutral-400 dark:group-hover/item:text-neutral-100">
          {name}
        </span>
      </span>
      <span
        aria-hidden="true"
        className="mx-7 h-1 w-1 rounded-full bg-neutral-300 dark:bg-neutral-700 sm:mx-9"
      />
    </div>
  );
}

function Stack() {
  return (
    <div
      className={`${hanken.className} mt-4 flex w-full flex-col gap-4 p-2 sm:p-0`}
    >
      <h2 className="font-semibold">Stack</h2>

      <div className="marquee-viewport w-full overflow-hidden py-1">
        <div className="marquee-track">
          {STACK.map((tech) => (
            <Item key={tech.name} tech={tech} />
          ))}
          {STACK.map((tech) => (
            <Item key={`clone-${tech.name}`} tech={tech} clone />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Stack;
