import { GitHubCalendar } from "react-github-calendar";
import { Hanken_Grotesk } from "next/font/google";
import { Suspense } from "react"
import {
  GitHubContributions,
  GitHubContributionsFallback,
} from "@/components/github-contributions"
import { getCachedContributions } from "@/lib/get-cached-contributions";
// import { getCachedContributions } from "@/components/github-contributions/lib/get-cached-contributions"

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function GitHub() {
  const contributions = getCachedContributions("ayantik2006");
  return (
    <div
      className={`${hanken.className} mt-10 flex flex-col gap-5 justify-center w-full calendar-wrapper p-2 sm:p-0`}
    >
      <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)] -mt-5" />
      <h2 className="font-semibold">GitHub</h2>
      <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={"https://github.com/ayantik2006"}
      />
    </Suspense>
    <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" />
    </div>
  );
}

export default GitHub;
