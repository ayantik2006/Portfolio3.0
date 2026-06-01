export const Scale = ({ className }: { className: string }) => {
  return (
    <div
      className={`${className} text-black/15 dark:text-white/15 bg-[repeating-linear-gradient(45deg,transparent_0px,transparent_4px,currentColor_4px,currentColor_6px)]`}
      style={{
        backgroundColor: "transparent",
      }}
    />
  );
};
