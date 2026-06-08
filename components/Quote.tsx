import { QuoteIcon } from "lucide-react";

function Quote() {
  return (
    <div className="max-w-full w-full mb-10 p-8 flex flex-col dark: shadow-[inset_0_1px_4px_#606162] rounded-lg text-neutral-500">
      <p className="text-lg font-semibold italic font-mono">
        <span className="inline-block mr-4">
          <QuoteIcon className="rotate-180" size={17} />
        </span>
        It is better to perform one&apos;s own duty imperfectly than to master
        the duty of another.
        <span className="inline-block ml-4">
          <QuoteIcon className="" size={17} />
        </span>
      </p>
      <p className="self-end italic font-mono">- Bhagavad Gita</p>
    </div>
  );
}

export default Quote;
