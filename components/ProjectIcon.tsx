import { FolderDot } from "lucide-react";
import { useTheme } from "next-themes";

function ProjectIcon() {
  const { theme, setTheme } = useTheme();

  return (
    <div
      className={`p-1 w-fit h-fit border rounded-lg ${theme == "dark" ? "bg-neutral-900 border-neutral-700" : ""}`}
    >
      <div
        className={`flex items-center justify-center rounded-lg w-8 h-8 border ${theme == "dark" ? "bg-neutral-900" : "bg-neutral-100"}`}
      >
        <FolderDot
          size={16}
          className={`${theme == "dark" ? "stroke-[#94949D]" : "stroke-[#b0b0b6]"}`}
        />
      </div>
    </div>
  );
}

export default ProjectIcon;
