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
      className={`${hanken.className} mt-10 flex flex-col gap-5 justify-center w-full calendar-wrapper`}
    >
      <h1 className="">GitHub</h1>
      <Suspense fallback={<GitHubContributionsFallback />}>
      <GitHubContributions
        contributions={contributions}
        githubProfileUrl={"https://github.com/ayantik2006"}
      />
    </Suspense>
    </div>
  );
}

export default GitHub;
