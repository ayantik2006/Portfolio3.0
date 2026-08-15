import { AnimatePresence, motion } from "framer-motion";
import { Languages, QuoteIcon } from "lucide-react";
import { useState } from "react";

function Quote() {
  const [isHindi, setIsHindi] = useState(false);

  return (
    <div className="relative max-w-full w-full mb-10 overflow-hidden border border-black/10 dark:border-white/10 bg-black/[0.015] dark:bg-white/[0.02] p-5 sm:p-8 md:p-10">
      <QuoteIcon
        className="absolute top-4 left-4 text-black/5 dark:text-white/5 pointer-events-none"
        size={64}
        strokeWidth={1}
      />

      <button
        type="button"
        aria-label={isHindi ? "Switch to English" : "Switch to Hindi"}
        title={isHindi ? "Switch to English" : "Switch to Hindi"}
        onClick={() => setIsHindi((prev) => !prev)}
        className="absolute top-3 right-3 p-1.5 rounded-md text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5 active:scale-90 transition-all"
      >
        <Languages size={16} />
      </button>

      <div className="relative">
        <AnimatePresence mode="wait">
          <motion.p
            key={isHindi ? "hi" : "en"}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 0.35 }}
            className="text-base sm:text-lg md:text-xl font-semibold italic font-mono leading-relaxed text-neutral-600 dark:text-neutral-300 pr-6"
          >
            {!isHindi
              ? "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
              : "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"}
          </motion.p>
        </AnimatePresence>

        <div className="flex items-center justify-end gap-2 mt-4">
          <span className="h-px w-6 bg-neutral-300 dark:bg-neutral-700" />
          <p className="text-xs font-semibold uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
            Bhagavad Gita 2.47
          </p>
        </div>
      </div>
    </div>
  );
}

export default Quote;
