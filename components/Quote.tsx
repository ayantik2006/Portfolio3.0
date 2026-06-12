import { Languages, QuoteIcon } from "lucide-react";
import { useState } from "react";

function Quote() {
  const [isHindi, setIsHindi] = useState(false);
  return (
    <div className="max-w-full w-full mb-10 p-8 flex flex-col shadow-[inset_0_1px_4px_#606162] rounded-lg text-neutral-500 relative">
      <Languages
        className="absolute top-3 right-3 cursor-pointer active:scale-90"
        size={18}
        onClick={() => setIsHindi((prev) => !prev)}
      />
      <p className="text-lg font-semibold italic font-mono">
        <span className="inline-block mr-4">
          <QuoteIcon className="rotate-180" size={17} />
        </span>
        {!isHindi
          ? "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action."
          : "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"}
        <span className="inline-block ml-4">
          <QuoteIcon className="" size={17} />
        </span>
      </p>
      <p className="self-end italic font-mono">- Bhagavad Gita 2.47</p>
    </div>
  );
}

export default Quote;
