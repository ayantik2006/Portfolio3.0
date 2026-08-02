"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import Image from "next/image";
import Footer from "@/components/Footer";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function BlogPostClient() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`min-h-screen items-center justify-center pt-14 sm:pt-16 ${theme === "dark" ? "bg-[#100F0F]" : "bg-[#F9F9F9]"} ${hanken.className}`}
    >
      <div className="w-full flex flex-col items-center justify-center px-6 py-4 max-w-3xl mx-auto ">
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          How We Reduced Hours of Manual Data Entry to 10 Minutes Using
          Claude, Cloudinary, and MongoDB
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400 font-normal text-base">
          By Ayantik Sarkar &bull; 02.08.2026 &bull; <a href="https://medium.com/@ayantik.sarkar2020/how-we-reduced-hours-of-manual-data-entry-for-hoardspace-to-10-minutes-using-claude-cloudinary-dd3189373e30" target="_blank">Medium</a>
        </h2>

        <div className="rounded-lg h-full w-full p-3 mt-6">
          <Image
            src={"/blog2.png"}
            unoptimized
            height={1024}
            width={1536}
            alt="HoardSpace's AI-powered ingestion pipeline turning hours of manual data entry into 5-10 minutes"
            className="w-full rounded-lg"
            priority
          />
        </div>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          When you&rsquo;re building a marketplace, you quickly realize that
          some of the hardest engineering problems aren&rsquo;t
          algorithmic&mdash;they&rsquo;re operational.
          <br />
          <br />
          While building <span className="font-semibold">HoardSpace</span>,
          our outdoor advertising marketplace, we faced one such problem.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Problem
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Every time a new advertising vendor joined us, they didn&rsquo;t
          manually create listings on our platform.
          <br />
          <br />
          Instead, they sent us:
          <br />
          <br />
          &bull; An Excel sheet containing hundreds of hoardings and their
          metadata.
          <br />
          <br />
          &bull; A separate PDF containing all the corresponding images.
          <br />
          <br />A single vendor could send anywhere between{" "}
          <span className="font-semibold">100 and 500+ hoardings</span> at
          once.
          <br />
          <br />
          Uploading these manually wasn&rsquo;t realistic.
          <br />
          <br />
          Someone would have to:
          <br />
          <br />
          &bull; Read every row from Excel.
          <br />
          <br />
          &bull; Create a database entry.
          <br />
          <br />
          &bull; Find the matching image.
          <br />
          <br />
          &bull; Upload it.
          <br />
          <br />
          &bull; Copy the image URL.
          <br />
          <br />
          &bull; Attach it to the correct hoarding.
          <br />
          <br />
          Multiply this by hundreds or even thousands of listings, and the
          process becomes incredibly time-consuming and error-prone.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Idea
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          After discussing the problem with Shuvam, we asked ourselves a
          simple question:
          <br />
          <br />
          <span className="font-semibold">
            Why are humans doing work that is essentially data
            transformation?
          </span>
          <br />
          <br />
          Most of the information already existed.
          <br />
          <br />
          It simply needed to be converted into the format our backend
          expected.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Workflow
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          We built a workflow instead of a manual process.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Step 1: Convert Excel into Database Objects
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          We uploaded the vendor&rsquo;s Excel sheet to Claude along with our
          MongoDB schema.
          <br />
          <br />
          Rather than simply asking for JSON, we provided the exact structure
          expected by our database.
          <br />
          <br />
          Claude transformed the spreadsheet into a clean array of JSON
          documents ready for insertion.
          <br />
          <br />
          No manual copy-pasting.
          <br />
          <br />
          No field mapping.
          <br />
          <br />
          No formatting errors.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Step 2: Extract Images
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The vendor images arrived inside a PDF.
          <br />
          <br />
          Claude extracted every image individually.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Step 3: Upload Images
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Each extracted image was uploaded to Cloudinary.
          <br />
          <br />
          Cloudinary returned a permanent URL for every image.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Step 4: Map Images to Listings
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The generated Cloudinary URLs were automatically matched with their
          corresponding hoarding objects.
          <br />
          <br />
          The final JSON now contained both the structured metadata and the
          correct image URLs.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Step 5: Insert into MongoDB
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The completed JSON array was inserted directly into our database.
          <br />
          <br />
          That&rsquo;s it.
          <br />
          <br />
          Hundreds of listings became available on the platform within
          minutes.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Outcome
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          A process that previously required hours of repetitive manual work
          now takes roughly{" "}
          <span className="font-semibold">5&ndash;10 minutes</span>, even for
          very large datasets.
          <br />
          <br />
          The benefits went beyond speed:
          <br />
          <br />
          &bull; Far fewer manual errors
          <br />
          <br />
          &bull; Consistent database structure
          <br />
          <br />
          &bull; Faster vendor onboarding
          <br />
          <br />
          &bull; Reduced engineering effort
          <br />
          <br />
          &bull; Easier scaling as more vendors joined
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          What We Learned
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The biggest takeaway wasn&rsquo;t that Claude can generate JSON.
          <br />
          <br />
          It was that AI is most valuable when it&rsquo;s integrated into an
          existing engineering workflow.
          <br />
          <br />
          Instead of replacing developers, it replaced repetitive
          transformation tasks.
          <br />
          <br />
          The backend still validates data.
          <br />
          <br />
          Cloudinary still manages media.
          <br />
          <br />
          MongoDB still stores the records.
          <br />
          <br />
          Claude simply became an intelligent preprocessing layer between
          messy vendor data and our production database.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Final Thoughts
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Engineering isn&rsquo;t always about building complex distributed
          systems or designing sophisticated algorithms.
          <br />
          <br />
          Sometimes it&rsquo;s about identifying repetitive work, questioning
          why it exists, and designing a better process.
          <br />
          <br />
          This small workflow dramatically improved how we onboard new
          inventory into HoardSpace.
          <br />
          <br />
          And that&rsquo;s probably my favorite kind of engineering&mdash;building
          systems that eliminate work instead of creating more of it.
          <br />
          <br />
        </p>

        <Footer />
      </div>
    </div>
  );
}
