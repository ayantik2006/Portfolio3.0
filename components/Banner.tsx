import Image from "next/image";

function Banner() {
  return (
    <div>
      <div className="relative w-fit shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-r-2 border-dotted border-black/25 dark:border-white/15">
          <Image
            src={"/dp.png"}
            unoptimized
            fill
            sizes="(min-width: 640px) 128px, 96px"
            priority
            alt="Ayantik Sarkar — Full Stack Developer and CTO at HoardSpace"
            className="rounded-lg p-1.5 sm:p-2 object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
