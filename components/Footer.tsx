import { Mail, Phone } from "lucide-react";
import { Hanken_Grotesk } from "next/font/google";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-hanken",
});

function Footer() {
  return (
    <div
      className={`${hanken.className} flex flex-col items-cente justify-center mt-20 w-full p-2 sm:p-0`}
    >
      <div>
        <p className="text-neutral-500">
          Inspired from{" "}
          <a
            href="https://chanhdai.com/"
            className="hover:underline font-semibold"
            target="_blank"
          >
            chanhdai.com
          </a>{" "}
          and{" "}
          <a
            href="https://ramx.in/"
            className="hover:underline font-semibold"
            target="_blank"
          >
            ramx.in
          </a>
          <br />
          Built by <a href="" className="underline">Ayantik Sarkar</a>
        </p>
      </div>
      <div className="flex gap-2 mt-2">
        <Link href={"https://github.com/ayantik2006"} target="_blank">
          <FaGithub className="text-neutral-500" />
        </Link>
        <Link href={"https://www.linkedin.com/in/ayantiksarkar/"} target="_blank">
          <FaLinkedin className="text-neutral-500" />
        </Link>
        <Link href={"https://x.com/ayantik2006"} target="_blank">
          <FaXTwitter className="text-neutral-500" />
        </Link>
        <Link href={"mailto:ayantik.sarkar2020@gmail.com"} target="_blank">
          <Mail className="text-neutral-500" size={16} />
        </Link>
        <Link href={"tel:+91 7595882545"} target="_blank">
          <Phone className="text-neutral-500" size={16} />
        </Link>
      </div>
    </div>
  );
}

export default Footer;
