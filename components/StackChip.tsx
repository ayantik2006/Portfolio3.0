import { useTheme } from "next-themes";
import Image from "next/image";

function StackChip({ img, stack }: { img: string; stack: string }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`${theme==="dark"?"bg-neutral-900 border-neutral-700":""} flex items-center gap-2 py-2 px-3 rounded-md border-2 border-dashed`}>
        <Image src={img} height={18} width={18} alt={stack}/>
        <p className="text-sm cursor-default">{stack}</p>
    </div>
  )
}

export default StackChip;
