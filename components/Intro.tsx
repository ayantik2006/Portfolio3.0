import { Clock2, Code, CodeXml, Lightbulb, Link, Mail, MapPin, Mars, Phone } from "lucide-react";
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

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Intro() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`mt-10 w-full flex gap-6 sm:gap-2 flex-col sm:flex-row justify-between text-balance font-mono`}
    >
      <div
        className={`text-sm flex flex-col gap-2 min-w-0 ${theme === "dark" ? "text-neutral-200" : ""}`}
      >
        <div className="flex items-center gap-2">
          <IntroIcon
            icon={<Lightbulb size={16} className="stroke-[#9F9FA9]" />}
          />
          <p>
            CTO @
            <a
              href="https://hoardspace.in"
              target="_blank"
              className="hover:underline font-semibold"
            >
              hoardspace.in
            </a>
          </p>
        </div>
        <div className="flex items-center gap-2">
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
        </div>
        <div className="flex items-center gap-2">
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
        </div>
        <div className="flex items-center gap-2">
          <IntroIcon icon={<Link size={16} className="stroke-[#9F9FA9]" />} />
          <p>
            <a href="" target="_blank" className="hover:underline">
              Portfolio
            </a>
          </p>
        </div>
      </div>
      <div
        className={`text-sm flex flex-col gap-2 min-w-0 ${theme === "dark" ? "text-neutral-200" : ""}`}
      >
        <div className="flex items-center gap-2">
          <IntroIcon icon={<Mars size={16} className="stroke-[#9F9FA9]" />} />
          <p>he/him</p>
        </div>
        <div className="flex items-center gap-2">
          <IntroIcon icon={<Clock2 size={16} className="stroke-[#9F9FA9]" />} />
          <Tooltip>
            <TooltipTrigger>
                {new Date().getHours()+":"+new Date().getMinutes()}
            </TooltipTrigger>
            <TooltipContent>
              <p className={`${hanken.className} font-semibold`}>Indian Standard Time (IST)</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <div className="flex items-center gap-2">
          <IntroIcon icon={<Mail size={16} className="stroke-[#9F9FA9]" />} />
          <IntroEmail/>
        </div>
         <div className="flex items-center gap-2">
          <IntroIcon icon={<Phone size={16} className="stroke-[#9F9FA9]" />} />
          <IntroPhone/>
        </div>
      </div>
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
