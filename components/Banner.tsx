import Image from "next/image";
import { useTheme } from "next-themes";
import { useState } from "react";
import { NoiseBackground } from "@/components/ui/noise-background";

function Banner() {
  const { theme, setTheme } = useTheme();
  const [isMousePressedOnPic, setIsMousePressedOnPic] = useState(false);
  const [isProfilePic,setIsProfilePic]=useState(true);

  return (
    <div className="w-full h-30 border-2 p-2 rounded-lg">
      <div className="w-full h-full border-2 flex items-center justify-center rounded-lg">
        <div
          className={`rounded-full translate-y-6 p-2 border-2 ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"} duration-400 ${isMousePressedOnPic?"scale-[0.7] rotate-y-180":"scale-[1]"}`}
          onMouseDown={() => {
            setIsMousePressedOnPic(true);
        }}
        onMouseUp={()=>{
            setIsMousePressedOnPic(false);
            setIsProfilePic((prev)=>!prev);
          }}
        >
          <div className="rounded-full">
            <Image
              src={isProfilePic?"/profile-pic.png":"/avatar.png"}
              width={100}
              height={200}
              alt="Ayantik Sarkar"
              className="rounded-full"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
