import { useRef, useState } from "react";

function WheelPicker1({
  options,
  onChange,
}: {
  options: string[];
  onChange: (value: string) => void;
}) {
  const parentDivRef = useRef<HTMLDivElement | null>(null);
  const childDivRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [closestIndex, setClosestIndex] = useState(0);

  return (
    <div className="w-full dark:bg-neutral-900 border dark:border-neutral-700 border-neutral-300 rounded-md py-4">
      <div
        className="w-full max-h-40 h-fit flex flex-col gap-2 items-center overflow-y-auto px-2 snap-y snap-mandatory scroll-smooth overflow-x-hidden"
        onScroll={() => {
          if (!parentDivRef.current) return;

          const parentRect = parentDivRef.current.getBoundingClientRect();
          const parentCenter = parentRect.top + parentRect.height / 2;

          let closestIndex = -1;
          let minDistance = Infinity;

          childDivRefs.current.forEach((el, index) => {
            if (!el) return;

            const rect = el.getBoundingClientRect();
            const childCenter = rect.top + rect.height / 2;

            const distance = Math.abs(childCenter - parentCenter);

            if (distance < minDistance) {
              minDistance = distance;
              closestIndex = index;
            }
          });
          if (options[closestIndex]) {
            setClosestIndex(closestIndex);
            onChange(options[closestIndex]);
          }
        }}
        style={{
          scrollbarWidth: "none",
          scrollBehavior: "smooth",
          paddingTop: "80px",
          paddingBottom: "80px",
          scrollSnapType: "y mandatory"
        }}
        ref={parentDivRef}
      >
        {[...options].map((option, index) => (
          <div
            key={index}
            ref={(el) => {
              childDivRefs.current[index] = el;
            }}
            className={`flex w-full items-center justify-center py-1 mx-1 rounded duration-300 ${
              index === closestIndex ? "dark:bg-neutral-800/60 bg-neutral-200/50 " : ""
            }`}
          >
            <p
              className={`relative duration-300 cursor-default  ${index === closestIndex ? "dark:text-white text-neutral-500 text-[1.2rem]" : "dark:text-neutral-400/90"}`}
            >
              {option}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WheelPicker1;
