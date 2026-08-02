export const Scale = ({ className }: { className: string }) => {
  return (
    <div
        className={`${className} text-black/10 dark:text-white/5 border-x border-dotted border-black/15 dark:border-white/20 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_5px,currentColor_5px,currentColor_6px)]`}
        style={{
          backgroundColor: "transparent",
        }}
      />
  );
};
