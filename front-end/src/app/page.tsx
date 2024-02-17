import Image from "next/image";
import SlideUpComponent from "./components/SlideUpComponent";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

import companies from "../../public/companies.png";
import companies1 from "../../public/companies1.png";
import companies2 from "../../public/companies2.png";
import companies3 from "../../public/companies3.png";
import companies4 from "../../public/companies4.png";
import HowToBuild from "./components/HowToBuild";

export default function Home() {
  return (
    <div className="m-[26px] p-[24px]">
      <div className="flex flex-col lg:flex-row">
        <div className="relative flex flex-col lg:items-start items-center w-full">
          <SlideUpComponent>
            <h1 className="text-5xl sm:text-6xl font-serif lg:mx-0 mx-[10%] lg:text-start text-center">
              Get face to face with interactive video
            </h1>
          </SlideUpComponent>
          <SlideUpComponent delay={1}>
            <h2 className="text-2xl font-sans font-light lg:mx-0  md:mx-[20%] mx-[10%] mt-14 text-center lg:text-start ">
              VideoAsk helps you streamline your conversations and build
              business relationships at scale.
            </h2>
          </SlideUpComponent>

          <SlideUpComponent delay={3}>
            <Link href="/" className="w-full h-20 text-white ">
              <div
                className="h-[74px] flex flex-row items-center justify-center bg-black sm:w-56 w-[70vw]
             text-2xl font-sans font-light mt-14 text-center rounded-full"
              >
                <p className="text-center inline mx-2">Start for free</p>
                <FaArrowRight />
              </div>
            </Link>
          </SlideUpComponent>
          <SlideUpComponent delay={4}>
            <p className="mt-6 text-center">✌️ No credit card required.</p>
          </SlideUpComponent>
        </div>
        <div>
          <SlideUpComponent delay={5}>
            <video className="w-full" autoPlay loop muted>
              <source src="/videos/video1.mp4" type="video/mp4" />
            </video>
          </SlideUpComponent>
        </div>
      </div>
      <div className="text-gray-500 text-center w-full font-sans mb-12">
        <SlideUpComponent delay={6}>
          +10K companies scaled up with VideoAsk
        </SlideUpComponent>
      </div>
      <SlideUpComponent delay={7}>
        <div className="text-center ">
          <Image
            src={companies}
            alt="companies"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies1}
            alt="companies1"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies2}
            alt="companies2"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies3}
            alt="companies3"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies4}
            alt="companies4"
            className="w-[140px] m-[24px] inline"
          />
        </div>
      </SlideUpComponent>
      <div>
        <HowToBuild />
      </div>
    </div>
  );
}
