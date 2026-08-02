import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

const socialLinks = [
  { label: "GitHub", href: "https://github.com/ayantik2006", icon: FaGithub },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ayantiksarkar/",
    icon: FaLinkedin,
  },
  { label: "Twitter", href: "https://x.com/ayantik2006", icon: FaXTwitter },
];

const buttonClass =
  "group inline-flex items-center gap-2 w-fit text-sm px-4 py-1.5 rounded border cursor-pointer transition-colors duration-200 " +
  "text-black/70 bg-linear-to-b from-neutral-100 to-white border-black/10 hover:text-black hover:border-black/20 hover:to-neutral-50 " +
  "dark:text-white/70 dark:from-neutral-900 dark:to-black dark:border-neutral-800 dark:hover:text-white dark:hover:border-neutral-700 dark:hover:to-neutral-900";

function Socials() {
  return (
    <div
      className={`${hanken.className} mt-10 flex flex-col gap-3 items-cente justify-center w-full p-2 sm:p-0`}
    >
      <div className="w-screen h-6 -mt-10 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
      <h2 className="text- py- font-semibold">My Socials</h2>
      <div className="flex items-center gap-2 flex-wrap">
        {socialLinks.map(({ label, href, icon: Icon }) => (
          <Link key={label} href={href} target="_blank" rel="noopener noreferrer">
            <button className={buttonClass}>
              <Icon
                size={15}
                className="text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
              />
              {label}
            </button>
          </Link>
        ))}
      </div>
      <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)] -mb-6" />
    </div>
  );
}

export default Socials;
