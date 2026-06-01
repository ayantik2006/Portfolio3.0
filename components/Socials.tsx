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
      className={`w-full p-2 h-fit border-2 mt-10 rounded-lg flex flex-col gap-2 ${hanken.className} font-semibold`}
    >
      <div className="flex flex-col sm:flex-row gap-2">
        <Link
          href={"https://www.linkedin.com/in/ayantiksarkar/"}
          target="_blank"
          className="flex-1 dark:hover:bg-neutral-950 duration-300 border border-neutral-300 dark:border-neutral-800 h-18 dark:bg-neutral-900 rounded-lg flex items-center justify-between p-3 pl-5"
        >
          <div className="flex gap-4 items-center">
            <div className="border dark:border-neutral-800 rounded">
              <Image
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
                }
                width={35}
                height={35}
                alt="linkedin"
              />
            </div>
            <div>
              <p>LinkedIn</p>
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
          className="flex-1 dark:hover:bg-neutral-950 duration-300 border border-neutral-300 dark:border-neutral-800 h-18 dark:bg-neutral-900 rounded-lg flex items-center justify-between p-3 pl-5"
        >
          <div className="flex gap-4 items-center">
            <div className="border dark:border-neutral-800 rounded bg-white p-2">
              <Image
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/twitter/twitter-original.svg"
                }
                width={20}
                height={20}
                alt="linkedin"
              />
            </div>
            <div>
              <p>X</p>
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
          className="flex-1 dark:hover:bg-neutral-950 duration-300 border border-neutral-300 dark:border-neutral-800 h-18 dark:bg-neutral-900 rounded-lg flex items-center justify-between p-3 pl-5"
        >
          <div className="flex gap-4 items-center">
            <div className="border dark:border-neutral-800 rounded bg-white p-1">
              <Image
                src={
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
                }
                width={28}
                height={28}
                alt="linkedin"
              />
            </div>
            <div>
              <p>GitHub</p>
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
