import StackChip from "./StackChip";
import { useTheme } from "next-themes";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { MonitorCog } from "lucide-react";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Stack() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`${hanken.className} mt-4 flex flex-col gap-3 items-cente justify-center w-full p-2 sm:p-0`}
    >
      {/* <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)] -mt-3" /> */}
      <div className="flex gap-3 items-center">
        {/* <MonitorCog size={22}/> */}
        <h1 className="font-semibold">Stack</h1>
      </div>
      <div className="flex items-center gap-5 flex-wrap">
        <StackChip
          stack="TypeScript"
          img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"
        />
        <StackChip
          stack="ReactJS"
          img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
        />
        <StackChip
          stack="NextJS"
          img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg"
        />
        <div
          className={`${theme === "dark" ? "bg-neutral-900 border-neutral-700" : ""} flex items-center gap-2 py-2 px-3 rounded-md border-2 border-dashed`}
        >
          <div className="bg-white rounded p-1">
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/framermotion/framermotion-original.svg"
              }
              height={13}
              width={13}
              alt={"Motion"}
            />
          </div>
          <p className="text-sm cursor-default">{"Motion"}</p>
        </div>
        <StackChip
          stack="MongoDB"
          img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg"
        />
        <div
          className={`${theme === "dark" ? "bg-neutral-900 border-neutral-700" : ""} flex items-center gap-2 py-2 px-3 rounded-md border-2 border-dashed`}
        >
          <div className="bg-white rounded p-1">
            <Image
              src={
                "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg"
              }
              height={13}
              width={13}
              alt={"ExpressJS"}
            />
          </div>
          <p className="text-sm cursor-default">{"ExpressJS"}</p>
        </div>
        <StackChip
          stack="Git"
          img="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg"
        />
        <div
          className={`${theme === "dark" ? "bg-neutral-900 border-neutral-700" : ""} flex items-center gap-2 py-2 px-3 rounded-md border-2 border-dashed`}
        >
          <FaGithub />
          <p className="text-sm cursor-default">{"GitHub"}</p>
        </div>
      </div>
      {/* <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" /> */}
    </div>
  );
}

export default Stack;
