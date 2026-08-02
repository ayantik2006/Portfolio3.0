"use client";

import { usePathname, useRouter } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowLeft } from "lucide-react";
import { Hanken_Grotesk } from "next/font/google";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function BackButton() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") return null;

  return (
    <div className="pointer-events-none absolute inset-x-0 top-4 sm:top-6 left-1/2 -translate-x-1/2 w-full max-w-3xl z-130">
      <div className="pointer-events-auto absolute top-0 left-4 sm:left-6">
        <Tooltip>
          <TooltipTrigger asChild>
            <button
              className="bg-neutral-100 dark:bg-neutral-900 duration-300 px-3 py-2 rounded"
              onClick={() => router.back()}
            >
              <ArrowLeft size={18} />
            </button>
          </TooltipTrigger>
          <TooltipContent className="z-1000">
            <p className={`font-semibold ${hanken.className}`}>Back</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default BackButton;
