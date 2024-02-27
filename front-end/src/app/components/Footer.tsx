import Image from "next/image";
import Link from "next/link";
import { GoArrowRight } from "react-icons/go";
import logo from "../../../public/logo.svg";
import { FiInstagram } from "react-icons/fi";
import { AiOutlineYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div
      className="mt-20 pb-10 w-full bg-black md:rounded-t-[100px] rounded-t-[50px] 
    text-white font-sans "
    >
      <footer className="flex md:flex-row flex-col md:pt-20 pt-10 px-[4%] relative">
        <div className="w-[20%] p-4">
          <List
            title="FEATURES"
            details={[
              "Live calls",
              "Video funnels",
              "Video chatbots",
              "Video Forms",
              "Asynchronous video interviews",
              "Direct messaging",
              "NPS",
              "Embed widget",
            ]}
          />
        </div>
        <div className="w-[20%] p-4">
          <List
            title="USE CASES"
            details={[
              "Candidate sourcing",
              "Candidate screening",
              "Candidate selecting",
              "Onboarding",
              "Lead generation",
              "Lead conversion",
              "Lead nurture",
              "Testimonial collection",
              "Maintain customer loyalty",
              "Education",
              "Research & Feedback",
              "Support",
            ]}
          />
        </div>
        <div className="w-[20%] p-4">
          <List
            title="SUPPORT"
            details={[
              "Help Center",
              "What's New",
              "Contact Support 👋",
              "Developer APIs",
              "System status",
              "Careers",
              "Terms & conditions",
              "Report abuse",
            ]}
          />
        </div>
        <div>
          <Link
            href={"/signup"}
            className="absolute top-20 right-20 bg-yellow-400 text-black
        w-64 h-64 flex justify-center items-center rounded-full text-4xl
        hover:rotate-180 transition-all duration-300 ease-in-out"
          >
            Sign up <GoArrowRight className="inline-block ml-2" size="40" />
          </Link>
        </div>
      </footer>
      <div className="mt-10 w-full flex flex-col md:flex-row items-center">
        <Link
          href="/"
          className="w-full md:w-1/2 flex flex-row items-center"
        >
          <Image
            src={logo}
            alt="logo"
            priority={true}
            className="mb-6 filter invert h-12 w-1/2 "
          />
          <div className="w-1/2 h-12 hover:text-zinc-700 cursor-pointer">
            All rights © Typeform
          </div>
        </Link>
        <div className="w-full md:w-1/2 h-12 flex flex-row">
          <div className="mr-6 hover:text-zinc-700 cursor-pointer">
            <FiInstagram className="inline-block mx-2" size="25" />
            Instagram
          </div>
          <div className="hover:text-zinc-700 cursor-pointer">
            <AiOutlineYoutube className="inline-block mx-2" size="25" />
            Youtube
          </div>
        </div>
      </div>
    </div>
  );
};

type Props = {
  title: string;
  details: string[];
};

const List = ({ title, details }: Props) => {
  return (
    <ul>
      <div className="text-2xl font-mono mb-8">{title}</div>
      {details.map((detail: string) => (
        <div key={detail} className="my-4 hover:text-zinc-700 cursor-pointer">
          {detail}
        </div>
      ))}
    </ul>
  );
};

export default Footer;
