import Image from "next/image";
import { Scale } from "./Scale";
import { useTheme } from "next-themes";
import { useState } from "react";

function Banner() {
  const {theme} = useTheme()

  return (
    <div className="p-3 relative w-fit mx-auto sm:mx-0">
      <div className="relative w-32 h-32 sm:w-40 sm:h-40">
        <Scale className="h-1 absolute top-0 -left-3.5 w-[calc(100%+30px)]" />
        <Scale className="w-1 absolute -top-3.5 left-0 h-[calc(100%+30px)]" />
        <Image
          src={"/profile-pic.png"}
          width={150}
          height={150}
          alt="Ayantik Sarkar"
          className="rounded-full p-4 sm:p-5 w-full h-full"
          draggable={false}
          style={{
            filter: theme==="dark"?"brightness(80%)":"brightness(100%)",
          }}
        />
        <Scale className="w-1 absolute -top-3.5 right-0 h-[calc(100%+30px)]" />
        <Scale className="h-1 absolute bottom-0 -left-3.5 w-[calc(100%+30px)]" />
      </div>
    </div>
  );
}

export default Banner;
