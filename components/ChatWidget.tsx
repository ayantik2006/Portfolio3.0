"use client";

import { Phone, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const msgBoxRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const messages: string[] = JSON.parse(
      localStorage.getItem("ayantik's-portfolio-messages") || "[]",
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(messages);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages,isChatOpen]);

  return (
    <div
      className={`fixed z-1000 bottom-0 right-0 p-4 flex gap-3 flex-col ${hanken.className}`}
    >
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="w-85 h-130 dark:bg-neutral-200 bg-neutral-50 rounded-lg flex flex-col p-6 dark:shadow-[inset_0px_0px_5px_#606162] shadow-[inset_0px_0px_5px_lightgray]"
            initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
            exit={{
              scale: 0.8,
              opacity: 0,
              filter: "blur(10px)",
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <div className="flex gap-2">
              <div className="w-8 h-8">
                <Image
                  src={"/favicon.png"}
                  width={100}
                  height={100}
                  loading="eager"
                  alt="Ayantik Sarkar"
                  className="rounded-full object-cover h-full w-full"
                  draggable={false}
                />
              </div>
              <div className="flex flex-col">
                <div className="text-black font-semibold text-sm flex gap-2">
                  <p>Ayantik Sarkar</p>
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse inline-block mt-[6px]" />
                </div>
                <p className="text-neutral-500 text-xs">
                  Drop a message to Ayantik!
                </p>
              </div>
            </div>
            <div className="w-full dark:bg-neutral-100 bg-white border rounded-lg h-full max-h-70 overflow-auto my-2 p-3 chat-widget-scrollbar">
              {messages.length == 0 ? (
                <p className="text-sm text-black/40 italic">
                  No conversations!
                </p>
              ) : (
                <div className="w-full h-ful flex flex-col gap-2">
                  {messages.map((msg, index) => {
                    return (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 10000,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        key={index}
                        className="bg-black p-2 w-fit text-sm rounded-tr-xl rounded-sm text-white"
                      >
                        <p>{msg}</p>
                      </motion.div>
                    );
                  })}
                  <div ref={bottomRef} />
                </div>
              )}
            </div>
            <form
              className="w-full flex flex-col"
              onSubmit={async (e) => {
                e.preventDefault();
              }}
            >
              <textarea
                placeholder="Write a beautiful message to me :)"
                className="w-full placeholder:text-sm dark:bg-neutral-100 bg-white border rounded-lg h-20 my-2 outline-none text-black selection:bg-black! selection:text-white! p-2 focus:ring-2 ring-neutral-300"
                ref={msgBoxRef}
                name="message"
                onChange={(e) => {
                  setMessage(e.currentTarget.value);
                }}
              ></textarea>
              <button
                className="text-white text-sm bg-black py-2 rounded-md cursor-pointer duration-300 hover:opacity-90"
                type="submit"
                onClick={async () => {
                  if (message.trim() == "") return;
                  const updatedMessages = [...messages, message];

                  setMessages(updatedMessages);

                  localStorage.setItem(
                    "ayantik's-portfolio-messages",
                    JSON.stringify(updatedMessages),
                  );

                  if (msgBoxRef.current) {
                    msgBoxRef.current.value = "";
                    msgBoxRef.current.focus();
                  }

                  await fetch("/api/contact", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      message,
                    }),
                  });

                  setMessage("");
                }}
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        className="w-10 self-end h-10 bg-neutral-300 rounded-full p-1 border border-neutral-600 cursor-pointer"
        onClick={() => setIsChatOpen((prev) => !prev)}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          scale: [1.1, 1],
        }}
        transition={{
          type: "spring",
          stiffness: 160,
        }}
      >
        <motion.div className="h-full w-full rounded-full bg-white flex items-center justify-center">
          <AnimatePresence mode="wait">
            {!isChatOpen ? (
              <motion.div
                key={"closed"}
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
                <Phone className="stroke-neutral-500" size={15} />
              </motion.div>
            ) : (
              <motion.div
                key={"opened"}
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
                <X className="stroke-neutral-500" size={15} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default ChatWidget;
