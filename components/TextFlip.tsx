import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

function TextFlip({
  words,
  className,
  duration
}: {
  words: string[];
  className?: string;
  duration:number;
}) {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [duration, words.length]);

  return (
    <div>
      <AnimatePresence mode="wait">
        <motion.p
          key={wordIndex}
          className={className}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {words[wordIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

export default TextFlip;
