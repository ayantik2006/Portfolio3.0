import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Component } from "lucide-react";

function OpeningLaptop() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-fit"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      <motion.div
        className="w-65 h-40 bg-neutral-700 ml-5 flex items-center justify-center p-2 rounded-t-md origin-bottom"
        initial={{
          rotateX: -65,
        }}
        animate={{
          rotateX: isHovered ? 0 : -65,
        }}
        transition={{
          type: "spring",
          stiffness: 90,
          mass: 0.8,
        }}
      >
        <motion.div className="bg-neutral-900 w-full h-full rounded-sm flex flex-col gap-2 items-center justify-center">
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{
                  filter: "blur(10px)",
                  opacity: "0",
                }}
                animate={{
                  filter: "blur(0px)",
                  opacity: 1,
                }}
                exit={{
                  filter: "blur(10px)",
                  opacity: "0",
                }}
              >
                <Image src={"/logo.png"} alt="logo" width={40} height={40} />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="flex items-center gap-1"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.03,
                    },
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.02,
                      staggerDirection: -1,
                    },
                  },
                }}
                initial="closed"
                animate="open"
                exit="closed"
              >
                {["P", "u", "l", "s", "e", " ", "U", "I"].map((char, index) => {
                  return (
                    <motion.p
                      key={index}
                      className="font-semibold text-white"
                      variants={{
                        closed: {
                          opacity: 0,
                          filter: "blur(10px)",
                        },
                        open: {
                          opacity: 1,
                          filter: "blur(0px)",
                        },
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      {char}
                    </motion.p>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
                animate={{
                  opacity: 1,
                  filter: "blur(0px)",
                }}
                transition={{
                  duration: 0.3,
                }}
                exit={{
                  opacity: 0,
                  filter: "blur(10px)",
                }}
              >
                <Link
                  href={"/explore"}
                  className="bg-neutral-700 px-2 py-0.5 rounded-2xl border flex gap-1 items-center justify-center"
                >
                  <motion.div
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                        delay:0.4,
                        duration:0.4
                    }}
                  >
                    <Component size={12} className="stroke-white fill-white" />
                  </motion.div>
                  <p className="text-xs text-white">Components</p>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>

      <div className="bg-linear-to-t from-neutral-800 via-neutral-700 to-neutral-600 w-75 h-4.5 rounded-b-2xl rounded-t-sm relative">
        <div className="rounded-b-2xl absolute mx-auto w-13 left-31 h-2 bg-neutral-500" />
      </div>
    </motion.div>
  );
}

export default OpeningLaptop;
