import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

function IntroEmail() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied,setIsCopied]=useState(false);
  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="mailto:ayantik.sarkar2020@gmail.com" className="hover:underline">
        ayantik.sarkar2020@gmail.com
      </a>

      <button
        className={`p-1 duration-300 rounded group ${theme == "dark" ? "hover:bg-neutral-800" : ""}`}
        onClick={()=>{
            navigator.clipboard.writeText("ayantik.sarkar2020@gmail.com");
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }}
      >
        {!isCopied && <Copy
          size={14}
          className={`group ${theme == "dark" ? "group-hover:stroke-white" : ""}`}
        />}
        {isCopied && <Check
          size={14}
          className={`group ${theme == "dark" ? "group-hover:stroke-white" : ""}`}
        />}
      </button>
    </div>
  );
}

export default IntroEmail;
