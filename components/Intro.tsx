'use client';
import { CodeXml, Lightbulb, Mail, MapPin, Mars, Phone } from "lucide-react";
import IntroIcon from "./IntroIcon";
import { useTheme } from "next-themes";
import IntroEmail from "./IntroEmail";
import IntroPhone from "./IntroPhone";
import { motion, type Variants } from "framer-motion";

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

const cellBase =
  "flex items-center gap-2 py-4 pr-4 border-dotted border-black/25 dark:border-white/15 transition-colors duration-200 hover:bg-black/5 dark:hover:bg-white/5";

const cellLeft = `${cellBase} sm:border-r w-[calc(100%+5rem)] -ml-[2.5rem] pl-14 sm:w-[calc(100%+3rem)] sm:-ml-[3rem] sm:pl-16`;

const cellRight = `${cellBase} w-[calc(100%+5rem)] -ml-[2.5rem] pl-14 sm:w-[calc(100%+3rem)] sm:ml-0 sm:pl-4`;

const rowLine =
  "col-span-1 sm:col-span-2 w-[calc(100%+5rem)] sm:w-[calc(100%+6rem)] -ml-[2.5rem] sm:-ml-[3rem] border-t border-dotted border-black/25 dark:border-white/15";

const midLine =
  "sm:hidden w-[calc(100%+5rem)] -ml-[2.5rem] border-t border-dotted border-black/25 dark:border-white/15";

function Intro() {
  const { theme } = useTheme();

  return (
    <motion.div
      className={`w-full grid grid-cols-1 sm:grid-cols-2 text-sm font-mono text-balance ${theme === "dark" ? "text-neutral-200" : ""}`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div className={cellLeft} variants={itemVariants}>
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
          <span className="relative inline-flex w-2.5 h-2.5 mx-2 align-middle">
            <span className="absolute inset-0 rounded-full bg-green-500 animate-ping-slow opacity-75" />
            <span className="absolute inset-0 rounded-full bg-green-500 blur-[3px] opacity-60" />
            <span className="relative w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.8)]" />
          </span>
        </div>
      </motion.div>
      <div className={midLine} />
      <motion.div className={cellRight} variants={itemVariants}>
        <IntroIcon icon={<Mars size={16} className="stroke-[#9F9FA9]" />} />
        <p>he/him</p>
      </motion.div>

      <div className={rowLine} />

      <motion.div className={cellLeft} variants={itemVariants}>
        <IntroIcon icon={<CodeXml size={16} className="stroke-[#9F9FA9]" />} />
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
      <div className={midLine} />
      <motion.div className={cellRight} variants={itemVariants}>
        <IntroIcon icon={<Mail size={16} className="stroke-[#9F9FA9]" />} />
        <IntroEmail />
      </motion.div>

      <div className={rowLine} />

      <motion.div className={cellLeft} variants={itemVariants}>
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
      <div className={midLine} />
      <motion.div className={cellRight} variants={itemVariants}>
        <IntroIcon icon={<Phone size={16} className="stroke-[#9F9FA9]" />} />
        <IntroPhone />
      </motion.div>
    </motion.div>
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
