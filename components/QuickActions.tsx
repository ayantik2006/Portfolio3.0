import Link from "next/link";
import { Hanken_Grotesk } from "next/font/google";
import { FileText, Mail } from "lucide-react";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

const buttonClass =
  "group inline-flex items-center gap-2 w-fit text-sm px-4 py-1.5 rounded border cursor-pointer transition-colors duration-200 " +
  "text-black/70 bg-linear-to-b from-neutral-100 to-white border-black/10 hover:text-black hover:border-black/20 hover:to-neutral-50 " +
  "dark:text-white/70 dark:from-neutral-900 dark:to-black dark:border-neutral-800 dark:hover:text-white dark:hover:border-neutral-700 dark:hover:to-neutral-900";

const ctaButtonClass =
  "group inline-flex items-center gap-2 w-fit text-sm px-4 py-1.5 rounded border cursor-pointer transition-colors duration-200 " +
  "text-white bg-linear-to-b from-neutral-700 to-black border-black hover:from-neutral-600 hover:to-neutral-900 " +
  "dark:text-black dark:bg-linear-to-b dark:from-white dark:to-neutral-300 dark:border-white dark:hover:from-neutral-50 dark:hover:to-neutral-200";

function QuickActions() {
  return (
    <div
      className={`${hanken.className} mt-6 flex items-center gap-2 flex-wrap w-full`}
    >
      <Link href="/resume">
        <button className={ctaButtonClass}>
          <FileText
            size={15}
            className="text-white/70 dark:text-black/60 transition-colors duration-200"
          />
          Resume
        </button>
      </Link>
      <Link href="mailto:ayantik.sarkar2020@gmail.com">
        <button className={buttonClass}>
          <Mail
            size={15}
            className="text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white transition-colors duration-200"
          />
          Send an Email
        </button>
      </Link>
    </div>
  );
}

export default QuickActions;
