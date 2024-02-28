import SlideUpComponent from "./SlideUpComponent";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";

export default function HomeFisrCompo() {
  return (
    <>
      <div className="m-[26px] p-[24px] flex flex-col lg:flex-row">
        <div className="relative flex flex-col lg:items-start items-center w-full">
          <SlideUpComponent>
            <h1 className="text-5xl sm:text-6xl font-serif lg:mx-0 xl:mx-[10%] 
            mx-[10%] lg:text-start text-center">
              Get face to face with interactive video
            </h1>
          </SlideUpComponent>
          <SlideUpComponent delay={1}>
            <h2 className="text-2xl font-sans font-light lg:mx-0 xl:mx-[10%] 
            md:mx-[20%] mx-[10%] mt-14 text-center lg:text-start ">
              VideoAsk helps you streamline your conversations and build
              business relationships at scale.
            </h2>
          </SlideUpComponent>

          <SlideUpComponent
            delay={3}
            className="w-full text-white xl:mx-[10%] flex justify-center 
            lg:justify-start"
          >
            <Link href="/signup" className="">
              <div
                className="h-[74px] flex flex-row items-center justify-center 
                bg-black sm:w-56 w-[70vw] 
             text-2xl font-sans font-light mt-14 text-center rounded-full"
              >
                <p className="text-center inline mx-2">Start for free</p>
                <FaArrowRight />
              </div>
            </Link>
          </SlideUpComponent>
          <SlideUpComponent delay={4} className="xl:mx-[10%] w-full ">
            <p className="mt-6 text-center lg:text-start">
              ✌️ No credit card required.
            </p>
          </SlideUpComponent>
        </div>
        <div>
          <SlideUpComponent delay={5}>
            <video className="w-full" autoPlay loop muted>
              <source src="/videos/video.mp4" type="video/mp4" />
            </video>
          </SlideUpComponent>
        </div>
      </div>
      <div className="p-[24px] text-gray-500 text-center font-sans mb-12">
          <SlideUpComponent >
            +10K companies scaled up with VideoAsk
          </SlideUpComponent>
        </div>
    </>
  );
}
