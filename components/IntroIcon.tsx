import { useTheme } from "next-themes";

function IntroIcon({ icon }: { icon: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  return (
    <div className={`rounded-lg p-[0.1rem] ${theme==="dark"?"border-[#1C1C1F]":"bg-[#F4F4F5] border-[#EEEEF0]"} border`}>
      <div className={`w-6 h-6 rounded-md flex items-center justify-center ${theme==="dark"?"bg-[#27272A] border-[#39393D]":"bg-[#F4F4F5] border-[#E1E1E3]"} border`}>{icon}</div>
    </div>
  );
}

export default IntroIcon;
