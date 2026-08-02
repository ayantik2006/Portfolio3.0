import { useTheme } from "next-themes";
import Image from "next/image";
import { motion } from "framer-motion";

function StackChip({ img, stack }: { img: string; stack: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <motion.div
      className={`${theme === "dark" ? "bg-neutral-900 border-neutral-700" : ""} flex items-center gap-2 py-2 px-3 rounded-md border-2 border-dashed overflow-hidden`}
    >
      <Image src={img} height={18} width={18} unoptimized alt={stack} />
      <p className="text-sm cursor-default">{stack}</p>
    </motion.div>
  );
}

export default StackChip;
