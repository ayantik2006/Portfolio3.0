"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { Scale } from "@/components/Scale";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Footer from "@/components/Footer";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

export default function Page() {
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
        {/* <Link
          href={"/blogs"}
          className="w-full flex gap-1 items-center text-neutral-400 cursor-pointer hover:text-white duration-300"
        >
          <ArrowLeft size={16} />
          <p className="text-sm">Blogs</p>
        </Link> */}
        <h1
          className={`text-2xl ${hanken.className} font-semibold mr-auto mt-5`}
        >
          What 1 Year of Frontend Development Taught Me About Building Memorable
          Websites
        </h1>
        <h2 className="mr-auto mt-1 text-neutral-400">
          - Ayantik Sarkar &bull; 12.06.2026 &bull; <a href="https://medium.com/@ayantik.sarkar2020/what-1-year-of-frontend-development-taught-me-about-building-memorable-websites-fc8a9497987c?postPublishedType=initial" target="_blank">Medium</a>
        </h2>
        
        <div className="rounded-lg h-full w-full p-3 mt-6">
          <Image
            src={"/blog1.png"}
            height={300}
            width={300}
            alt="blog1"
            className="w-full rounded-lg"
          />
        </div>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          It’s been about a year since I started exploring web development,
          working primarily with React, Tailwind CSS, and motion.dev. During
          this journey, I’ve spent countless hours building projects, studying
          great websites, and gradually developing an eye for what makes a web
          experience truly memorable. <br />
          <br />
          The more websites I explored, the more I realized that the ones I
          remembered weren’t always the most complex or feature-rich. Instead,
          they were the ones that made me feel something through thoughtful
          interactions, attention to detail, and a strong sense of personality.{" "}
          <br /> <br />
          That realization inspired me to write this article. <br /> <br />
          As this is my first article, I’m approaching it not as an expert
          sharing definitive answers, but as a developer documenting lessons and
          observations from my first year of learning and building on the web. I
          hope you’ll find some value in these insights, and I’d genuinely
          appreciate your feedback. <br /> <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Most Websites Are Forgettable
        </h2>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          How many of them can you clearly remember? <br /> <br />
          Most likely, only one or two. <br /> <br />
          The interesting thing is that many of those websites were probably
          well-built. They loaded quickly, looked modern, and worked exactly as
          intended. From a technical standpoint, there was nothing wrong with
          them. <br /> <br />
          Yet they left no lasting impression. <br /> <br />
          For a long time, I thought that building a good website was mostly
          about functionality and aesthetics. If the design looked clean and the
          code was solid, the website was successful. <br /> <br />
          But the more websites I explored, the more I noticed a pattern. <br />{" "}
          <br />
          The websites that stayed in my mind weren’t necessarily the most
          beautiful or the most technically advanced. They were the ones that
          made me interact, explore, and engage. A clever hover effect, a
          satisfying animation, thoughtful typography, or an unexpected
          interaction often made a bigger impact than an entire page of
          features. <br /> <br />
          That’s when I started thinking about websites differently. <br />{" "}
          <br />
          A website isn’t just a collection of components and pages. <br />{" "}
          <br />
          It’s an experience that users take away from it. <br />
          <br />
        </p>
        <div className="rounded-lg h-full w-full p-3">
          <Image
            src={"/good-eww-ui.png"}
            height={300}
            width={300}
            alt="blog1"
            className="w-full rounded-lg"
          />
        </div>
        <p className="p-3 dark:text-neutral-300 text-neutral-700 italic border-l-4">
          “Very often, design is the most immediate way of defining what
          products become in people’s minds.” <br />— Jony Ive
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Users Remember Experiences, Not Layouts
        </h2>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          Take a look at the two interfaces above.
          <br />
          <br />
          Both of them accomplish the same task: helping users manage their
          work.
          <br />
          <br />
          They contain similar information, similar features, and similar
          functionality.
          <br />
          <br />
          Yet one feels significantly better to use.
          <br />
          <br />
          Why?
          <br />
          <br />
          The answer isn’t functionality. It’s experience.
          <br />
          <br />
          The modern interface uses spacing, hierarchy, color, and visual
          feedback to guide the user’s attention. Important information stands
          out naturally, making the interface easier to understand at a glance.
          <br />
          <br />
          The older interface isn’t necessarily broken. It works. But it forces
          users to process more information manually. Everything competes for
          attention, making the experience feel heavier than it needs to be.
          <br />
          <br />
          This was one of the biggest realizations I had while studying websites
          over the past year.
          <br />
          <br />
          Users rarely remember the exact layout of a website. They don’t
          remember whether a card was 320 pixels wide or whether a button had an
          8-pixel border radius.
          <br />
          <br />
          What they remember is how the website made them feel.
          <br />
          <br />
          Was it intuitive?
          <br />
          <br />
          Was it enjoyable?
          <br />
          <br />
          Did it feel polished?
          <br />
          <br />
          Did it make them want to keep exploring?
          <br />
          <br />
          The most memorable websites focus on answering those questions.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Small Details Create Personality
        </h2>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          One portfolio that changed how I think about web design is the
          portfolio of{" "}
          <a
            href="https://chanhdai.com/"
            target="_blank"
            className="font-semibold"
          >
            Chánh Đại.
          </a>{" "}
          <br />
          <br />
          At first glance, the website appears surprisingly simple. There are no
          overwhelming animations, no excessive visual effects, and no attempt
          to grab attention through gimmicks.
          <br />
          <br />
          Yet after spending a few minutes exploring it, the experience feels
          incredibly polished.
          <br />
          <br />
          The spacing is consistent. The typography is carefully chosen. Every
          component feels intentional. Information is presented clearly, and the
          overall experience feels effortless.
          <br />
          <br />
          What stood out to me wasn’t a single feature. It was the accumulation
          of dozens of small details.
          <br />
          <br />
          The site demonstrates something many developers overlook: memorable
          design isn’t always about adding more. Sometimes it’s about refining
          what’s already there.
          <br />
          <br />
          Over the past year, I’ve noticed that many beginners - including
          myself at times - focus heavily on large visual effects. We spend
          hours building complex animations while ignoring spacing, hierarchy,
          typography, and consistency.
          <br />
          <br />
          But websites like Chánh Đại’s portfolio show that craftsmanship often
          lives in the details.
          <br />
          <br />
          A polished website is rarely the result of one impressive feature.
          <br />
          <br />
          It’s the result of hundreds of thoughtful decisions working together.
          <br />
          <br />
        </p>
        <Link
          href={"https://chanhdai.com/"}
          target="_blank"
          className="rounded-lg h-full w-full p-3"
        >
          <Image
            src={"/dai.png"}
            height={300}
            width={300}
            alt="blog1"
            className="w-full rounded-lg"
          />
          <p className="text-xs p-3 dark:text-neutral-300 text-neutral-700">
            Chánh Đại’s portfolio. A great example of how constraints,
            consistency, and attention to detail can create a memorable
            experience.
          </p>
        </Link>
        <Link
          href={"https://ayantiksarkar.com"}
          target="_blank"
          className="rounded-lg h-full w-full p-3"
        >
          <Image
            src={"/ayantik.png"}
            height={300}
            width={300}
            alt="blog1"
            className="w-full rounded-lg"
          />
          <p className="text-xs p-3 dark:text-neutral-300 text-neutral-700">
            My personal portfolio website
          </p>
        </Link>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Constraints Can Create Better Design
        </h2>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          One detail that stood out to me while exploring Chánh Đại’s portfolio
          was its restrained layout. <br />
          <br />
          Many modern websites try to occupy every inch of available screen
          space. Wide sections, oversized typography, and full-width content
          have become increasingly common.
          <br />
          <br />
          This portfolio takes a different approach.
          <br />
          <br />
          The content lives inside a carefully constrained grid. Instead of
          feeling limiting, the restricted width creates focus. My eyes
          naturally know where to look because every element feels aligned to a
          larger structure.
          <br />
          <br />
          The result is a website that feels deliberate.
          <br />
          <br />
          Nothing appears randomly placed. Every section seems to exist within a
          system.
          <br />
          <br />
          As a beginner, I used to think good design came from adding more —
          more animations, more effects, more visual complexity.
          <br />
          <br />
          Websites like this taught me the opposite lesson.
          <br />
          <br />
          Sometimes great design comes from constraints.
          <br />
          <br />
          When designers intentionally limit themselves, they often create
          experiences that feel more cohesive, readable, and memorable.
          <br />
          <br />
          Other websites that embrace similar design constraints include:
          <br />
          <br />
          <a
            href="https://www.manuarora.in/"
            className="font-semibold"
            target="_blank"
          >
            &bull; Manu Arora,
          </a>
          <br />
          <br />
          <a
            href="https://www.designerdada.com/"
            className="font-semibold"
            target="_blank"
          >
            &bull; Akash Bhadange aka @designerdada
          </a>
          <br />
          <br />
          <a href="https://ramx.in/" className="font-semibold" target="_blank">
            &bull; Ramkrishna Swarnkar
          </a>
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Motion Should Have a Purpose
        </h2>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          As I started learning Framer Motion, I fell into the same trap many
          frontend developers do. <br />
          <br />
          I wanted to animate everything.
          <br />
          <br />
          Buttons bounced.
          <br />
          <br />
          Cards faded in.
          <br />
          <br />
          Sections slid from every direction.
          <br />
          <br />
          At first, it felt impressive.
          <br />
          <br />
          But after exploring more websites and building more projects, I
          realized that animation alone doesn’t make an experience better.
          <br />
          <br />
          Good motion has a job.
          <br />
          <br />
          It guides attention.
          <br />
          <br />
          Provides feedback.
          <br />
          <br />
          Explains changes in the interface.
          <br />
          <br />
          Makes interactions feel natural.
          <br />
          <br />
          Bad motion exists only because it can.
          <br />
          <br />
          The websites I enjoy most don’t use animation to show off technical
          skill. They use it to improve usability.
          <br />
          <br />
          A subtle hover state can make an interface feel responsive.
          <br />
          <br />
          A smooth transition can help users understand where content came from
          and where it went.
          <br />
          <br />
          A loading animation can reassure users that something is happening.
          <br />
          <br />
          The best animations often go unnoticed because they feel like a
          natural part of the experience.
          <br />
          <br />
          That’s a lesson I’m still learning every time I build a new project.
          <br />
          <br />
        </p>
        <h2
          className={`text-xl ${hanken.className} font-semibold mr-auto pl-3 mt-5`}
        >
          Final Thoughts
        </h2>
        <p className="p-3 dark:text-neutral-300 text-neutral-700">
          After a year of frontend development, I don’t think memorable websites
          are built through flashy effects or complicated technology. <br />
          <br />
          They’re built through intention.
          <br />
          <br />
          Thoughtful spacing.
          <br />
          <br />
          Meaningful motion.
          <br />
          <br />
          Clear hierarchy.
          <br />
          <br />
          Attention to detail.
          <br />
          <br />
          A consistent design system.
          <br />
          <br />
          The websites that inspired me the most weren’t always the most
          complex.
          <br />
          <br />
          They were the ones where every decision felt deliberate.
          <br />
          <br />
          As I continue learning and building, that’s the standard I want to aim
          for — not just creating websites that work, but creating websites that
          people remember.
          <br />
          <br />
          One year isn’t a long time in web development, and I’m still learning
          every day. But if there’s one lesson I’ll carry into the next year,
          it’s this:
          <br />
          <br />
          People rarely remember every feature on a website.
          <br />
          <br />
          They remember how it made them feel.
          <br />
          <br />
          Thanks for reading. If this resonated with you, I’d love to hear your
          thoughts and learn from your experiences as well.
          <br />
          <br />
        </p>
        
        <Footer/>
      </div>
    </div>
  );
}
