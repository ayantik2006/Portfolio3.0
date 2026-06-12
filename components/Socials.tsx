import Image from "next/image";
import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";
import { ArrowUpRight } from "lucide-react";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Socials() {
  return (
    <div
      className={`max-w-full w-full p-2 h-fit border-2 mt-10 flex flex-col gap-2 ${hanken.className} font-semibold mx-3`}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={"https://www.linkedin.com/in/ayantiksarkar/"}
          target="_blank"
          className="flex-1 dark:hover:bg-neutral-950 hover:bg-neutral-200/30 duration-300 border border-neutral-300 dark:border-neutral-800 h-14 dark:bg-neutral-900 rounded-l flex items-center justify-between p-3 pl-5"
        >
          <div className="flex gap-4 items-center">
            <div className="border dark:border-neutral-800 rounded">
              <Image
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
                }
                width={25}
                height={25}
                alt="linkedin"
              />
            </div>
            <div>
              <p className="text-sm">LinkedIn</p>
            </div>
          </div>
          <div>
            <ArrowUpRight
              size={17}
              className={`stroke-neutral-400 dark:stroke-neutral-500`}
            />
          </div>
        </Link>
        <Link
          href={"https://x.com/ayantik2006"}
          target="_blank"
          className="flex-1 dark:hover:bg-neutral-950 hover:bg-neutral-200/30 duration-300 border border-neutral-300 dark:border-neutral-800 h-14 dark:bg-neutral-900 rounded-l flex items-center justify-between p-3 pl-5"
        >
          <div className="flex gap-4 items-center">
            <div className="border dark:border-neutral-800 rounded bg-white p-2">
              <Image
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
                }
                width={10}
                height={10}
                alt="linkedin"
              />
            </div>
            <div>
              <p className="text-sm">X</p>
            </div>
          </div>
          <div>
            <ArrowUpRight
              size={17}
              className={`stroke-neutral-400 dark:stroke-neutral-500`}
            />
          </div>
        </Link>
      </div>
      <div>
        <Link
          href={"https://t.co/qVRpIZYDxG"}
          target="_blank"
          className="flex-1 dark:hover:bg-neutral-950 hover:bg-neutral-200/30 duration-300 border border-neutral-300 dark:border-neutral-800 h-14 dark:bg-neutral-900 rounded-l flex items-center justify-between p-3 pl-5"
        >
          <div className="flex gap-4 items-center">
            <div className="border dark:border-neutral-800 rounded bg-white p-1">
              <Image
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                }
                width={18}
                height={18}
                alt="linkedin"
              />
            </div>
            <div>
              <p className="text-sm">GitHub</p>
            </div>
          </div>
          <div>
            <ArrowUpRight
              size={17}
              className={`stroke-neutral-400 dark:stroke-neutral-500`}
            />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Socials;
