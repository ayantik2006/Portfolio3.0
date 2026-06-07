import { UniversityIcon } from "lucide-react";
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
      <h1 className="">Education</h1>
      <div className="flex items-cente gap-3">
        <div className={`p-1 w-fit h-fit border rounded-lg ${theme == "dark" ? "bg-neutral-900 border-neutral-700" : ""}`}>
          <div
            className={`flex items-center justify-center rounded-lg w-8 h-8 border ${theme == "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
          >
            <UniversityIcon size={16} className={`${theme=="dark"?"stroke-[#94949D]":"stroke-[#b0b0b6]"}`} />
          </div>
        </div>
        <div className="flex flex-col">
            <h1>National Institute of Technology, Rourkela</h1>
            <h2 className="text-sm text-neutral-500">B.Tech, Civil Engineering</h2>
            <h3 className="text-sm text-neutral-500">2025-2029</h3>
        </div>
      </div>
      <div className="flex items-cente gap-3 mt-5">
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
      </div>
      <div className="flex items-cente gap-3 mt-5">
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
      </div>
    </div>
  );
}

export default Education;
