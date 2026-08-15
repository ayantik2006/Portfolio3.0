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
          The MongoDB Query That Broke HoardSpace&rsquo;s Explore Page
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400 font-normal text-base">
          By Ayantik Sarkar &bull; 15.08.2026 &bull;{" "}
          <a
            href="https://medium.com/@ayantik.sarkar2020/the-mongodb-query-that-broke-hoardspaces-explore-page-efdee2f7cc6d"
            target="_blank"
          >
            Medium
          </a>
        </h2>

        <div className="rounded-lg h-full w-full p-3 mt-6">
          <Image
            src={"/blog3.webp"}
            unoptimized
            height={1024}
            width={1536}
            alt="A MongoDB $sample aggregation query silently overloading HoardSpace's Explore page under repeated requests"
            className="w-full rounded-lg"
            priority
          />
        </div>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          A few days ago, the <Code>/explore</Code> page on{" "}
          <UnderlineLink href="https://hoardspace.in">
            HoardSpace
          </UnderlineLink>{" "}
          started giving us a very unhelpful error:
        </p>

        <Blockquote>fetch failed</Blockquote>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          That was pretty much it.
          <br />
          <br />
          No useful explanation on the frontend. No obvious issue with the
          API. Other routes were working fine.
          <br />
          <br />
          <UnderlineLink href="https://hoardspace.in">
            HoardSpace
          </UnderlineLink>{" "}
          is the outdoor advertising marketplace we&rsquo;re building, and{" "}
          <Code>/explore</Code> is one of the most important parts of the
          product. It&rsquo;s where users browse the hoardings available
          across different locations.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Checking the Usual Suspects
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Naturally, the first thing I did was start checking the usual
          suspects.
          <br />
          <br />
          MongoDB connection? Working.
          <br />
          <br />
          Other API routes? Working.
          <br />
          <br />
          Frontend request? Looked fine.
          <br />
          <br />
          Then I went back to the code that actually fetches the hoardings.
          And there it was.
        </p>

        <CodeBlock>{`{ $sample: { size: 100 } }`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          We were using MongoDB&rsquo;s <Code>$sample</Code> to randomly pick
          hoardings for the Explore page. Something like:
        </p>

        <CodeBlock>{`const hoardings = await Hoarding.aggregate([
  { $match: filters },
  { $sample: { size: 100 } }
]);`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The idea was pretty straightforward. Every time someone opened
          Explore, we&rsquo;d get a random set of hoardings instead of showing
          the same listings in the same order.
          <br />
          <br />
          It worked perfectly while we were developing it.
          <br />
          <br />
          The problem showed up when the number of requests started
          increasing.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          What <Code>$sample</Code> Was Actually Costing Us
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          I initially thought of <Code>$sample</Code> as basically:
        </p>

        <Blockquote>&ldquo;MongoDB, pick 100 random documents.&rdquo;</Blockquote>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          That&rsquo;s what it feels like from the code.
          <br />
          <br />
          The database has thousands of hoardings, and we&rsquo;re asking it
          to randomly select a meaningful chunk of them. Depending on the size
          of the sample and the way the aggregation runs, MongoDB can end up
          doing quite a bit of work.
          <br />
          <br />
          Now imagine doing that on every <Code>/explore</Code> request.
          <br />
          <br />
          One request isn&rsquo;t particularly scary.
        </p>

        <AsciiBlock>{`Request
   ↓
MongoDB
   ↓
$sample
   ↓
100 hoardings`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Do that hundreds of times and the picture changes.
        </p>

        <AsciiBlock>{`Request 1  → $sample
Request 2  → $sample
Request 3  → $sample
Request 4  → $sample
...
Request N  → $sample`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          We were repeatedly asking the database to generate random data even
          though the user didn&rsquo;t actually need a brand-new random pool
          every second.
          <br />
          <br />
          That was the mistake.
          <br />
          <br />
          <span className="font-semibold">
            The query made sense for the feature. The frequency didn&rsquo;t.
          </span>
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The First Thing I Changed
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          I could have removed randomization completely. I didn&rsquo;t want
          to do that.
          <br />
          <br />
          Random listings are useful on Explore. They make the page feel less
          repetitive, especially when we have a large inventory of hoardings.
          <br />
          <br />
          Instead, I asked myself a much simpler question:
        </p>

        <Blockquote>
          Does this random pool really need to be generated for every
          request?
        </Blockquote>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          No.
          <br />
          <br />
          If a user opens Explore and gets a pool generated 20 seconds ago,
          they won&rsquo;t know the difference.
          <br />
          <br />
          That gave me a much better option: cache the random pool.
          <br />
          <br />I created an in-memory cache:
        </p>

        <CodeBlock>{`const randomPoolCache = new Map();`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The first request still goes to MongoDB:
        </p>

        <AsciiBlock>{`/explore
   ↓
MongoDB
   ↓
$sample
   ↓
Random pool
   ↓
Cache it
   ↓
Return hoardings`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The next requests can use that pool:
        </p>

        <AsciiBlock>{`/explore
   ↓
Cache
   ↓
Random pool`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          That alone cuts out a lot of unnecessary <Code>$sample</Code> calls.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          What Is Actually Inside the Cache?
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          This part is surprisingly simple.
          <br />
          <br />
          When the query finishes, we store the result along with when it was
          generated. Conceptually:
        </p>

        <CodeBlock>{`randomPoolCache.set(cacheKey, {
  data: hoardings,
  timestamp: Date.now(),
  refreshing: false
});`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The <Code>Map</Code> lives in the memory of the Node.js process
          running the application.
          <br />
          <br />
          There&rsquo;s no database table for it. There&rsquo;s no file.
          It&rsquo;s just data sitting in the server&rsquo;s RAM while that
          process is alive.
          <br />
          <br />
          If I later do:
        </p>

        <CodeBlock>{`const cached = randomPoolCache.get(cacheKey);`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          I can get the random pool without asking MongoDB again.
          <br />
          <br />
          That&rsquo;s why an in-memory cache is so fast. It also explains its
          biggest limitation: restart the server and the cache is gone.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          I Didn&rsquo;t Want Explore to Show the Same Pool Forever
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Caching introduced another problem.
          <br />
          <br />
          If we kept the pool indefinitely, Explore wouldn&rsquo;t really be
          random anymore. We needed to refresh it occasionally.
          <br />
          <br />I ended up using two limits:
        </p>

        <ul className="w-full p-3 pl-8 list-disc dark:text-neutral-300 text-neutral-700">
          <li>60 seconds as a soft TTL</li>
          <li>10 minutes as a hard TTL</li>
        </ul>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          For the first 60 seconds, the cache is fresh and we just use it.
          <br />
          <br />
          After 60 seconds, it&rsquo;s considered stale, but we can still use
          it. Instead of making the user wait for MongoDB, we return the
          stale pool and start a background refresh.
        </p>

        <AsciiBlock>{`Request
   ↓
Cache is stale
   ↓
Return existing pool
   ↓
Background refresh
        ↓
     MongoDB
        ↓
   New random pool
        ↓
      Cache`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The next request gets the new pool.
          <br />
          <br />
          That approach matters because I didn&rsquo;t want a user to open{" "}
          <Code>/explore</Code> and sit there waiting just because our cache
          decided it was time for a refresh.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          There Was One More Problem
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Imagine the cache becomes stale and 50 users hit{" "}
          <Code>/explore</Code> around the same time.
          <br />
          <br />
          If every request starts its own refresh, we&rsquo;ve just created
          another burst of <Code>$sample</Code> queries. Not exactly what we
          wanted.
          <br />
          <br />
          So the cache entry also keeps track of whether a refresh is already
          happening. Something along the lines of:
        </p>

        <CodeBlock>{`if (!cached.refreshing) {
  cached.refreshing = true;
  // refresh in background
}`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Now one request handles the refresh while the others can continue
          using the existing data.
          <br />
          <br />
          It&rsquo;s a small piece of state, but without it, the cache could
          still put unnecessary pressure on MongoDB during traffic spikes.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Why the 10-Minute Limit?
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The background refresh isn&rsquo;t guaranteed to succeed.
          <br />
          <br />
          If MongoDB is having problems, we don&rsquo;t want to keep serving
          the same cached pool forever. That&rsquo;s why there&rsquo;s a hard
          TTL. The behavior is roughly:
        </p>

        <AsciiBlock>{`0 - 60 seconds
→ Use cache

60 seconds - 10 minutes
→ Use cache
→ Refresh in background

More than 10 minutes
→ Cache is too old
→ Fetch fresh data`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The 60-second number isn&rsquo;t sacred. It&rsquo;s a product
          decision.
          <br />
          <br />
          For Explore, a random pool being a little old doesn&rsquo;t matter
          much. The important part is deciding how stale your particular data
          is allowed to be.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Cache Also Has to Understand Filters
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          This was another thing I had to be careful about.
          <br />
          <br />
          A user filtering for Bhubaneswar shouldn&rsquo;t get the cached
          random pool for Delhi. Likewise, different combinations of filters
          need different pools.
          <br />
          <br />
          So the cache is keyed using the query/filter combination.
          Conceptually:
        </p>

        <AsciiBlock>{`randomPoolCache

"Bhubaneswar + Category A"
        ↓
     Pool A

"Delhi + Category B"
        ↓
     Pool B

"Mumbai + Category A"
        ↓
     Pool C`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          That&rsquo;s why the cache isn&rsquo;t just one giant array of
          random hoardings. There can be different cached pools for different
          Explore queries.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          While Fixing This, I Found Another Problem
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The <Code>/explore</Code> issue wasn&rsquo;t the only performance
          problem I found.
          <br />
          <br />
          Our admin hoardings API was returning entire Mongoose documents to
          the dashboard. The admin table didn&rsquo;t need everything. It
          needed a few fields such as the title, city, price, category,
          status, and some other metadata.
          <br />
          <br />
          The documents also contained things like images, descriptions and
          availability information. Sending all of that for thousands of
          hoardings was unnecessary.
          <br />
          <br />
          So I changed the query to select only the fields the dashboard
          actually uses:
        </p>

        <CodeBlock>{`Hoarding
  .find(...)
  .select("title city price category status")
  .lean();`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          <Code>.select()</Code> reduces the amount of data we pull.{" "}
          <Code>.lean()</Code> tells Mongoose that we just want plain
          JavaScript objects instead of full Mongoose documents.
          <br />
          <br />
          Neither change is revolutionary. They just remove work we
          don&rsquo;t need.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          I Also Changed the Admin UI
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          There was a smaller problem on the frontend.
          <br />
          <br />
          When the admin API failed, the dashboard could look like there were
          simply no hoardings. That&rsquo;s confusing. An empty result and a
          failed request are two completely different things.
          <br />
          <br />
          So I added an explicit error state with a Retry button. Now if the
          request fails, the dashboard actually tells us that it failed. That
          makes debugging a lot less mysterious.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Part That Stuck With Me
        </h2>
        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          The funny thing about this bug is that the original code
          wasn&rsquo;t obviously bad.
        </p>

        <CodeBlock>{`{ $sample: { size: 100 } }`}</CodeBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          did exactly what we wanted. It returned random hoardings. It worked
          locally.
          <br />
          <br />
          The problem appeared when the same operation started running
          repeatedly under real traffic.
          <br />
          <br />
          That&rsquo;s something I think is easy to miss when building a
          startup. You spend a lot of time asking:
        </p>

        <Blockquote>Does this feature work?</Blockquote>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Then users arrive and you have to start asking:
        </p>

        <Blockquote>
          What does this feature do when 100 requests hit it at the same
          time?
        </Blockquote>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Those are very different questions.
          <br />
          <br />
          For <UnderlineLink href="https://hoardspace.in">
            HoardSpace
          </UnderlineLink>
          , the answer was that repeatedly generating random pools was
          unnecessary.
          <br />
          <br />
          We still use <Code>$sample</Code>. We just don&rsquo;t make MongoDB
          do that work for every single <Code>/explore</Code> request
          anymore.
        </p>

        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          The Current Flow
        </h2>

        <AsciiBlock>{`First request
     ↓
   $sample
     ↓
Random pool
     ↓
In-memory cache
     ↓
Serve multiple requests`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          Then periodically:
        </p>

        <AsciiBlock>{`Cached pool gets old
        ↓
Serve it immediately
        ↓
Refresh in background
        ↓
New pool replaces old pool`}</AsciiBlock>

        <p className="w-full p-3 dark:text-neutral-300 text-neutral-700">
          There are still things I&rsquo;d change as{" "}
          <UnderlineLink href="https://hoardspace.in">
            HoardSpace
          </UnderlineLink>{" "}
          grows. An in-memory cache is tied to a particular server instance,
          so multiple instances won&rsquo;t automatically share the same
          pool. A distributed cache such as Redis would solve that later.
          <br />
          <br />
          For now, the important part was removing a repeated expensive
          operation from the hot path of <Code>/explore</Code>. That one
          change made the problem a lot easier to reason about.
          <br />
          <br />
          And it was a good reminder that sometimes the performance problem
          isn&rsquo;t hiding in a complicated algorithm.
          <br />
          <br />
          <span className="font-semibold">
            Sometimes it&rsquo;s just one perfectly valid database operation
            being called way too many times.
          </span>
          <br />
          <br />
        </p>

        <Footer />
      </div>
    </div>
  );
}

const UnderlineLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline underline-offset-2 font-semibold hover:text-neutral-500 dark:hover:text-neutral-400"
    >
      {children}
    </a>
  );
};

const Code = ({ children }: { children: React.ReactNode }) => {
  return (
    <code className="px-1.5 py-0.5 rounded text-[0.85em] font-mono bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200">
      {children}
    </code>
  );
};

const CodeBlock = ({ children }: { children: string }) => {
  return (
    <pre className="w-full p-4 mt-3 mb-1 rounded-lg overflow-x-auto text-sm font-mono bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-neutral-200">
      <code>{children}</code>
    </pre>
  );
};

const AsciiBlock = ({ children }: { children: string }) => {
  return (
    <pre className="w-full p-4 mt-3 mb-1 rounded-lg overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400">
      {children}
    </pre>
  );
};

const Blockquote = ({ children }: { children: React.ReactNode }) => {
  return (
    <blockquote className="w-full p-4 mt-3 mb-1 border-l-4 border-neutral-400 dark:border-neutral-600 italic text-neutral-700 dark:text-neutral-300 bg-neutral-100 dark:bg-neutral-900 rounded-r-md">
      {children}
    </blockquote>
  );
};
