import { Check, Volume2 } from "lucide-react";
import { useTheme } from "next-themes";
import { useRef, useState } from "react";
import TextFlip from "@/components/TextFlip";
import { motion } from "framer-motion";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Name() {
  const { theme } = useTheme();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex flex-col items-start w-full min-w-0 flex-1 pb-3">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center flex-wrap justify-start">
          <h1
            className={`text-xl sm:text-2xl ${hanken.className} font-semibold text-left`}
          >
            Ayantik Sarkar
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="blue"
            viewBox="0 0 24 24"
            className="size-4.5 text-info select-none"
            aria-label="Verified"
          >
            <path
              fill="#009CF5"
              d="M24 12a4.454 4.454 0 0 0-2.564-3.91 4.437 4.437 0 0 0-.948-4.578 4.436 4.436 0 0 0-4.577-.948A4.44 4.44 0 0 0 12 0a4.423 4.423 0 0 0-3.9 2.564 4.434 4.434 0 0 0-2.43-.178 4.425 4.425 0 0 0-2.158 1.126 4.42 4.42 0 0 0-1.12 2.156 4.42 4.42 0 0 0 .183 2.421A4.456 4.456 0 0 0 0 12a4.465 4.465 0 0 0 2.576 3.91 4.433 4.433 0 0 0 .936 4.577 4.459 4.459 0 0 0 4.577.95A4.454 4.454 0 0 0 12 24a4.439 4.439 0 0 0 3.91-2.563 4.26 4.26 0 0 0 5.526-5.526A4.453 4.453 0 0 0 24 12Zm-13.709 4.917-4.38-4.378 1.652-1.663 2.646 2.646L15.83 7.4l1.72 1.591-7.258 7.926Z"
            ></path>
          </svg>
          <motion.div
            whileTap={{
              scale: 0.9,
            }}
          >
            <Volume2Icon
              className={`stroke-zinc-400 duration-300 ${theme === "dark" ? "hover:stroke-white" : "hover:stroke-black"}`}
              size={18}
              onClick={() => {
                if (!audioRef.current) return;

                if (playing) {
                  audioRef.current.pause();
                } else {
                  audioRef.current.play();
                }

                setPlaying(!playing);
              }}
            />
            <audio
              ref={audioRef}
              src="/name.m4a"
              onEnded={() => setPlaying(false)}
            />
          </motion.div>
        </div>
        <div
          className={`flex mt-2 w-full gap-4 text-sm ${hanken.className} text-[#ABABAD]`}
        >
          <TextFlip
            words={["Full Stack Developer", "Product Engineer", "Design Systems Engineer"]}
            className="font-mono"
            duration={1500}
          />
        </div>
      </div>
    </div>
  );
}

export default Name;

type Volume2Props = {
  className?: string;
  size?: number;
  onClick?: () => void;
};

export function Volume2Icon({ className, size = 24, onClick }: Volume2Props) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
      whileTap={"tapped"}
    >
      <motion.path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <motion.path
        d="M16 9a5 5 0 0 1 0 6"
        variants={{
          tapped: {
            opacity: [0, 1],
            transition: {
              duration: 0.3,
            },
          },
        }}
      />
      <motion.path
        d="M19.364 18.364a9 9 0 0 0 0-12.728"
        variants={{
          tapped: {
            opacity: [0, 1],
            transition: {
              duration: 0.3,
            },
          },
        }}
      />
    </motion.svg>
  );
}
