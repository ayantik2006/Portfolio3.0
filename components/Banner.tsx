function Banner() {
  return (
    <div>
      <div className="relative w-fit shrink-0">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 border-l-2 border-r-2 border-dotted border-black/25 dark:border-white/15">
          <img
            src={"/profile-pic.jpg"}
            width={160}
            height={160}
            loading="eager"
            alt="Ayantik Sarkar"
            className="rounded-lg p-1.5 sm:p-2 w-full h-full object-cover"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default Banner;
