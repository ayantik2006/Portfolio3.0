import Image from "next/image";
import { Scale } from "./Scale";
import { useTheme } from "next-themes";
import { useState } from "react";
import { motion } from "framer-motion";

function Banner() {
  const { theme } = useTheme();
  const [isAvatarHovered, setIsAvatarHovered] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  return (
    <div>
      <div className="p-3 relative w-fit mx-auto sm:mx-0">
        <motion.div
          className="relative w-32 h-32 sm:w-40 sm:h-40"
          style={{
            filter: "grayscale(90%)",
          }}
          whileHover={{
            filter: "grayscale(0%)",
          }}
        >
          <Scale className="h-1 absolute top-0 -left-3.5 w-[calc(100%+30px)]" />
          <Scale className="w-1 absolute -top-3.5 left-0 h-[calc(100%+30px)]" />
          <Image
            src={"/profile-pic.jpg"}
            width={160}
            height={160}
            loading="eager"
            alt="Ayantik Sarkar"
            className="rounded-full p-4 sm:p-5 w-full h-full object-cover cursor-none"
            draggable={false}
            onMouseEnter={()=>setIsAvatarHovered(true)}
            onMouseLeave={()=>setIsAvatarHovered(false)}
            onMouseMove={(e) => {
              setX(e.clientX);
              setY(e.clientY);
            }}
          />
          <Scale className="w-1 absolute -top-3.5 right-0 h-[calc(100%+30px)]" />
          <Scale className="h-1 absolute bottom-0 -left-3.5 w-[calc(100%+30px)]" />
        </motion.div>
      </div>
      {isAvatarHovered && (
        <div
          className="h-6 w-6 bg-transparent backdrop-blur-[0.1px] rounded-full fixed"
          style={{
            left: x,
            top: y,
            filter: "invert(100%)"
          }}
        />
      )}
    </div>
  );
}

export default Banner;
