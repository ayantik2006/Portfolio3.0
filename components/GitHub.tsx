import { GitHubCalendar } from "react-github-calendar";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function GitHub() {
  return (
    <div
      className={`${hanken.className} mt-10 flex flex-col gap-5 justify-center w-full calendar-wrapper`}
    >
      <h1 className="">GitHub</h1>
      <GitHubCalendar
        username="ayantik2006"
        blockSize={10}
        blockMargin={4}
        fontSize={14}
        theme={{
          light: ["#0f0f0f", "#1f2937", "#22c55e", "#16a34a", "#15803d"],
          dark: ["#0f0f0f", "#1f2937", "#22c55e", "#16a34a", "#15803d"],
        }}
      />
    </div>
  );
}

export default GitHub;
