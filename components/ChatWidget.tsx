"use client";

import { Check, MessageCircle, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Hanken_Grotesk } from "next/font/google";
import { Spinner } from "@/components/ui/spinner";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

type ChatMessage = {
  text: string;
  time: number;
};

const STORAGE_KEY = "ayantik's-portfolio-messages";

function formatTime(time: number) {
  return new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ChatWidget() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle",
  );
  const msgBoxRef = useRef<HTMLTextAreaElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored: (ChatMessage | string)[] = JSON.parse(
      localStorage.getItem(STORAGE_KEY) || "[]",
    );
    const normalized: ChatMessage[] = stored.map((m) =>
      typeof m === "string" ? { text: m, time: Date.now() } : m,
    );
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMessages(normalized);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isChatOpen]);

  const sendMessage = async () => {
    const trimmed = message.trim();
    if (trimmed === "" || status === "sending") return;

    const updatedMessages = [...messages, { text: trimmed, time: Date.now() }];
    setMessages(updatedMessages);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedMessages));
    setMessage("");
    if (msgBoxRef.current) {
      msgBoxRef.current.value = "";
      msgBoxRef.current.style.height = "auto";
    }
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: trimmed }),
      });

      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    } finally {
      msgBoxRef.current?.focus();
    }
  };

  return (
    <div
      className={`fixed z-1000 bottom-0 right-0 p-4 flex gap-3 flex-col items-end ${hanken.className}`}
    >
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            className="w-85 h-130 origin-bottom-right bg-neutral-50 dark:bg-neutral-900 flex flex-col p-5 shadow-[0px_8px_30px_rgba(0,0,0,0.12)] dark:shadow-[0px_8px_30px_rgba(0,0,0,0.5)] border border-neutral-200 dark:border-white/10"
            initial={{ scale: 0.15, opacity: 0, x: 16, y: 16 }}
            exit={{
              scale: 0.15,
              opacity: 0,
              x: 16,
              y: 16,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              x: 0,
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 28,
            }}
          >
            <div className="flex gap-2 items-start pb-4 border-b border-neutral-200 dark:border-white/10">
              <div className="w-9 h-9 relative shrink-0">
                <Image
                  src={"/favicon.png"}
                  unoptimized
                  width={100}
                  height={100}
                  loading="eager"
                  alt="Ayantik Sarkar"
                  className="object-cover h-full w-full"
                  draggable={false}
                />
                <div className="w-2.5 h-2.5 bg-green-500 absolute bottom-0 right-0 border-2 border-neutral-50 dark:border-neutral-900" />
              </div>
              <div className="flex flex-col flex-1">
                <p className="text-black dark:text-white font-semibold text-sm">
                  Ayantik Sarkar
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs">
                  Usually replies within a day
                </p>
              </div>
              <button
                type="button"
                aria-label="Close chat"
                onClick={() => setIsChatOpen(false)}
                className="text-neutral-400 hover:text-neutral-600 dark:hover:text-white duration-200 cursor-pointer p-1 -m-1"
              >
                <X size={16} />
              </button>
            </div>
            <div className="w-full h-full max-h-70 overflow-auto my-2 py-2 chat-widget-scrollbar">
              {messages.length == 0 ? (
                <div className="w-full h-full flex flex-col items-center justify-center gap-2 text-center px-4">
                  <MessageCircle
                    className="stroke-neutral-300 dark:stroke-neutral-700"
                    size={28}
                    strokeWidth={1.5}
                  />
                  <p className="text-sm text-black/40 dark:text-white/30 italic">
                    No conversations yet. Say hi!
                  </p>
                </div>
              ) : (
                <div className="w-full h-full flex flex-col gap-2">
                  {messages.map((msg, index) => {
                    const isLast = index === messages.length - 1;
                    return (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: 20,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.3,
                        }}
                        key={index}
                        className="self-end max-w-[85%] flex flex-col items-end gap-1"
                      >
                        <p className="bg-black dark:bg-white py-2 px-3 text-sm text-white dark:text-black wrap-break-word whitespace-pre-wrap">
                          {msg.text}
                        </p>
                        <div className="flex items-center gap-1 pr-1">
                          <span className="text-[10px] text-neutral-400 dark:text-neutral-500">
                            {formatTime(msg.time)}
                          </span>
                          {isLast && (
                            <>
                              {status === "sending" && (
                                <Spinner className="size-2.5 text-neutral-400" />
                              )}
                              {status === "sent" && (
                                <Check
                                  size={10}
                                  className="text-green-600 dark:text-green-500"
                                />
                              )}
                              {status === "error" && (
                                <span className="text-[10px] text-red-500 dark:text-red-400">
                                  failed
                                </span>
                              )}
                            </>
                          )}
                        </div>
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
                await sendMessage();
              }}
            >
              <textarea
                placeholder="Write a beautiful message to me :)"
                className="w-full placeholder:text-sm placeholder:text-neutral-400 dark:placeholder:text-neutral-500 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-white/10 h-20 max-h-32 my-2 outline-none text-black dark:text-white selection:bg-black! selection:text-white! p-2 resize-none focus:ring-2 ring-neutral-300 dark:ring-neutral-600 duration-200"
                ref={msgBoxRef}
                name="message"
                onChange={(e) => {
                  setMessage(e.currentTarget.value);
                }}
                onKeyDown={async (e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    await sendMessage();
                  }
                }}
              ></textarea>
              <button
                className="text-white dark:text-black text-sm bg-black dark:bg-white py-2 cursor-pointer duration-300 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                type="submit"
                disabled={message.trim() === "" || status === "sending"}
              >
                {status === "sending" ? (
                  <Spinner className="size-4" />
                ) : (
                  <Send size={14} />
                )}
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        type="button"
        aria-label={isChatOpen ? "Close chat" : "Chat with Ayantik"}
        title={isChatOpen ? "Close chat" : "Chat with Ayantik"}
        className="w-12 h-12 bg-black dark:bg-white rounded-full flex items-center justify-center cursor-pointer shadow-[0px_4px_20px_rgba(0,0,0,0.25)] dark:shadow-[0px_4px_20px_rgba(0,0,0,0.5)]"
        onClick={() => setIsChatOpen((prev) => !prev)}
        whileHover={{
          scale: 1.08,
        }}
        whileTap={{
          scale: 0.95,
        }}
        transition={{
          type: "spring",
          stiffness: 260,
          damping: 20,
        }}
      >
        <AnimatePresence mode="wait">
          {!isChatOpen ? (
            <motion.div
              key={"closed"}
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              exit={{
                scale: 0.8,
                opacity: 0,
                rotate: 45,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <MessageCircle className="stroke-white dark:stroke-black" size={20} />
            </motion.div>
          ) : (
            <motion.div
              key={"opened"}
              initial={{ scale: 0.8, opacity: 0, rotate: -45 }}
              exit={{
                scale: 0.8,
                opacity: 0,
                rotate: 45,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: 0,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              <X className="stroke-white dark:stroke-black" size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}

export default ChatWidget;
