import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { useState } from "react";

function IntroPhone() {
  const { theme, setTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied,setIsCopied]=useState(false);
  return (
    <div
      className="flex items-center gap-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href="tel:+91 7595882545" className="hover:underline">
        +91 7595882545
      </a>

      <button
        className={`p-1 duration-300 rounded group ${theme == "dark" ? "hover:bg-neutral-800" : "hover:bg-neutral-200/60"}`}
        onClick={()=>{
            navigator.clipboard.writeText("+91 7595882545");
            setIsCopied(true);
            setTimeout(() => {
                setIsCopied(false);
            }, 3000);
        }}
      >
        <AnimatePresence mode="wait">
          {!isCopied ? (
            <motion.div
              key={"copy"}
              initial={{ scale: 0.8, opacity: 0 }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Copy
                size={14}
                className={`group ${theme == "dark" ? "group-hover:stroke-white" : ""}`}
              />
            </motion.div>
          ) : (
            <motion.div
              key={"check"}
              initial={{ scale: 0.8, opacity: 0 }}
              exit={{
                scale: 0.8,
                opacity: 0,
              }}
              animate={{
                scale: 1,
                opacity: 1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <Check
                size={14}
                className={`group ${theme == "dark" ? "group-hover:stroke-white" : ""}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}

export default IntroPhone;
