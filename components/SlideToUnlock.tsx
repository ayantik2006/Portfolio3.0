import { ArrowBigRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function SlideToUnlock({ onUnlock }: { onUnlock: (val: boolean) => void }) {
  const [isGrabbed, setIsGrabbed] = useState(false);
  const mainDivRef = useRef<HTMLDivElement | null>(null);
  const lockDivRef = useRef<HTMLDivElement | null>(null);
  const [isGrabMoving, setIsGrabMoving] = useState(false);
  //   const [lockX, setLockX] = useState<number>(
  //     // eslint-disable-next-line react-hooks/refs
  //     (mainDivRef.current?.clientLeft ? mainDivRef.current?.clientLeft : 0) + 66,
  //   );
  const lockXDefault =
    // eslint-disable-next-line react-hooks/refs
    Number(mainDivRef.current?.getBoundingClientRect().left) + 66;

  const [clickX, setClickX] = useState(0);
  const [translateVal, setTranslateVal] = useState(0);
  const [isLocked, setLocked] = useState(true);

  useEffect(() => {
    function handleMouseUp() {
      setIsGrabbed(false);
      setIsGrabMoving(false);
      const max =
        Number(mainDivRef.current?.getBoundingClientRect().left) +
        Number(Number(mainDivRef.current?.getBoundingClientRect().width)) -
        Number(lockDivRef.current?.getBoundingClientRect().width) -
        6;
      if (Number(lockDivRef.current?.getBoundingClientRect().left) >= max) {
        setTranslateVal(170);
        if (isLocked === true) {
          setLocked(false);
          onUnlock(false);
          const audio = new Audio(
            "https://pub-44700d99452c492c871392639d6006fc.r2.dev/unlock.mp3",
          );
          audio.play();
        }
      } else setTranslateVal(0);
    }

    function handleMouseMove(e: MouseEvent) {
      if (!isGrabbed) return;

      const max =
        Number(mainDivRef.current?.getBoundingClientRect().left) +
        Number(Number(mainDivRef.current?.getBoundingClientRect().width)) -
        Number(lockDivRef.current?.getBoundingClientRect().width) -
        6;

      if (Number(lockDivRef.current?.getBoundingClientRect().left) > max)
        return;

      // Number(mainDivRef.current?.getBoundingClientRect().width)-5
      const xAbs = e.x;
      if (xAbs > clickX) {
        setIsGrabMoving(true);
        const translate = xAbs - clickX;
        setTranslateVal(translate);
        setClickX(xAbs);
      } else {
        if (
          Number(lockDivRef.current?.getBoundingClientRect().left) <=
          lockXDefault
        )
          return;
        setIsGrabMoving(true);
        const translate = -(xAbs - clickX);
        setTranslateVal(translate);
        setClickX(xAbs);
      }
    }

    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isGrabbed]);

  return (
    <div
      className="w-60 h-12 dark:bg-neutral-700/60 bg-neutral-200/50 rounded-lg border p-1 flex items-center"
      ref={mainDivRef}
    >
      <div
        className={`bg-white absolute w-15 h-10 rounded-md flex items-center justify-center cursor-grab dark:shadow-none shadow-[0_1px_3px_gray] ${isGrabbed ? "cursor-grabbing" : "cursor-grab"}`}
        ref={lockDivRef}
        onMouseDown={(e) => {
          setIsGrabbed(true);
          setClickX(e.clientX);
        }}
        style={{
          // left: `${lockXDefault}px`,
          translate: `${translateVal}px`,
        }}
      >
        <ArrowBigRight className="fill-neutral-400 stroke-neutral-400" size={30} />
      </div>
      <div className="ml-auto mr-7 text-lg font-semibold text-neutral-500 dark:text-neutral-300 select-none">
        {!isGrabMoving && isLocked && <p>slide to unlock</p>}
      </div>
    </div>
  );
}

export default SlideToUnlock;
