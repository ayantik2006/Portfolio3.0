'use client';
import { Clock2, CodeXml, Lightbulb, Link, Mail, MapPin, Mars, Phone } from "lucide-react";
import IntroIcon from "./IntroIcon";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Hanken_Grotesk } from "next/font/google";
import IntroEmail from "./IntroEmail";
import IntroPhone from "./IntroPhone";
import { motion, type Variants } from "framer-motion";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

function Intro() {
  const { theme } = useTheme();

  return (
    <div
      className={`mt-10 w-full flex gap-2 sm:gap-2 flex-col sm:flex-row justify-between text-balance font-mono p-2 sm:p-0`}
    >
      <motion.div
        className={`text-sm flex flex-col gap-2 min-w-0 ${theme === "dark" ? "text-neutral-200" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon
            icon={<Lightbulb size={16} className="stroke-[#9F9FA9]" />}
          />
          <div>
            CTO @
            <a
              href="https://hoardspace.in"
              target="_blank"
              className="hover:underline font-semibold"
            >
              hoardspace.in
            </a>
            <div className="w-2.5 h-2.5 inline-block mx-2 animate-pulse bg-green-600 rounded-full"/>
          </div>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon
            icon={<CodeXml size={16} className="stroke-[#9F9FA9]" />}
          />
          <p>
            Building &nbsp;
            <a
              href="https://elimics.com"
              target="_blank"
              className="hover:underline font-semibold"
            >
              Elimics 
            </a>
            &nbsp;&nbsp;and&nbsp;&nbsp;
            <a
              href="https://pulseui-henna.vercel.app/"
              target="_blank"
              className="hover:underline font-semibold"
            >
              Pulse UI
            </a>
          </p>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon icon={<MapPin size={16} className="stroke-[#9F9FA9]" />} />
          <p>
            <a
              href="https://maps.app.goo.gl/oPgKNTaD13DXKKvS7"
              target="_blank"
              className="hover:underline"
            >
              Rourkela, Odisha, India
            </a>
          </p>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon icon={<Link size={16} className="stroke-[#9F9FA9]" />} />
          <p>
            <a href="" target="_blank" className="hover:underline">
              Portfolio
            </a>
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        className={`text-sm flex flex-col gap-2 min-w-0 ${theme === "dark" ? "text-neutral-200" : ""}`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon icon={<Mars size={16} className="stroke-[#9F9FA9]" />} />
          <p>he/him</p>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon icon={<Clock2 size={16} className="stroke-[#9F9FA9]" />} />
          <Tooltip>
            <TooltipTrigger>
              {new Date().getHours() + ":" + new Date().getMinutes()}
            </TooltipTrigger>
            <TooltipContent>
              <p className={`${hanken.className} font-semibold`}>
                Indian Standard Time (IST)
              </p>
            </TooltipContent>
          </Tooltip>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon icon={<Mail size={16} className="stroke-[#9F9FA9]" />} />
          <IntroEmail/>
        </motion.div>
        <motion.div className="flex items-center gap-2" variants={itemVariants}>
          <IntroIcon icon={<Phone size={16} className="stroke-[#9F9FA9]" />} />
          <IntroPhone/>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Intro;

/*
CTO@hoardspace -
building pulseui - 
location - 
phone
email-
gender-
website-
time-
*/
