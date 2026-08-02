import { useTheme } from "next-themes";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Education() {
  const { theme, setTheme } = useTheme();
  return (
    <div
      className={`${hanken.className} mt-10 flex flex-col gap-3 justify-center w-full p-2 sm:p-0`}
    >
      <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)] -mt-3" />
      <h1 className="font-semibold">Education</h1>
      <div className="flex items-cente gap-3">
        <div className={`p-2 w-fit h-fit border rounde shrink-0 ${theme == "dark" ? "bg-neutral-900 border-neutral-700" : ""}`}>
          <div
            className={`flex items-center justify-center rounded-lg w-9 h-9 borde overflow-hidden ${theme == "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
          >
            <img src="/nitr-logo.png" alt="NIT Rourkela" width={32} height={32} className="object-contain" />
          </div>
        </div>
        <div className="flex flex-col">
            <h1>National Institute of Technology, Rourkela</h1>
            <h2 className="text-sm text-neutral-500">B.Tech, Civil Engineering</h2>
            <h3 className="text-sm text-neutral-500">2025-2029</h3>
        </div>
      </div>
      {/* <div className="flex items-cente gap-3 mt-5">
        <div className={`p-1 w-fit h-fit border rounded-lg ${theme == "dark" ? "bg-neutral-900 border-neutral-700" : ""}`}>
          <div
            className={`flex items-center justify-center rounded-lg w-8 h-8 border ${theme == "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
          >
            <UniversityIcon size={16} className={`${theme=="dark"?"stroke-[#94949D]":"stroke-[#b0b0b6]"}`} />
          </div>
        </div>
        <div className="flex flex-col">
            <h1>Hem Sheela Model School, Durgapur</h1>
            <h2 className="text-sm text-neutral-500">CBSE Class XII</h2>
            <h3 className="text-sm text-neutral-500">2023-2025</h3>
        </div>
      </div> */}
      {/* <div className="flex items-cente gap-3 mt-5">
        <div className={`p-1 w-fit h-fit border rounded-lg ${theme == "dark" ? "bg-neutral-900 border-neutral-700" : ""}`}>
          <div
            className={`flex items-center justify-center rounded-lg w-8 h-8 border ${theme == "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
          >
            <UniversityIcon size={16} className={`${theme=="dark"?"stroke-[#94949D]":"stroke-[#b0b0b6]"}`} />
          </div>
        </div>
        <div className="flex flex-col">
            <h1>St. Xavier&apos;s School, Durgapur </h1>
            <h2 className="text-sm text-neutral-500">ICSE Class X</h2>
            <h3 className="text-sm text-neutral-500">2012-2023</h3>
        </div>
      </div> */}
      {/* <div className="w-screen h-6 ml-[calc(50%-50vw)] mr-[calc(50%-50vw)] border-y-2 border-dotted border-black/25 dark:border-white/15 text-black/10 dark:text-white/5 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]" /> */}
    </div>
  );
}

export default Education;
