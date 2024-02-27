import React from "react";
import VideoPlayer from "./VideoPlayer";

export default function HomeForthCompo() {
  return (
    <div className="flex w-full flex-col lg:flex-row mt-20 items-center">
      <div
        className="lg:w-[40%] flex flex-col items-center text-center mb-9 font-sans 
      lg:pl-[10%] lg:text-start"
      >
        <div className="w-full lg:w-full sm:w-[400px] text-3xl mb-10">
          Stanley uses VideoAsk to increase his conversion rate
        </div>
        <div
          className="bg-[#F2F2F2] w-full lg:w-full sm:w-[450px] text-start p-6 
         rounded-bl-[10px] rounded-r-[40px] rounded-t-[40px] text-2xl"
        >
          Once I implemented VideoAsk,
          <span className="font-semibold">
            I took my conversion rate from 65% up to about 98%.
          </span>
        </div>
        <div
          className="text-gray-600 text-start w-full lg:w-full sm:w-[450px] 
        text-sm mt-3"
        >
          Stanley Tate — Lawyer
          <span
            className="border-b border-violet-600
          text-violet-600 font-semibold"
          >
            @ Tate Law
          </span>
        </div>
      </div>
      <div className="z-10 overflow-hidden rounded-[50px] h-[600px] mx-[3%] lg:w-[60%]">
        <VideoPlayer VideoUrl="/videos/homevideo.mp4" />
      </div>
    </div>
  );
}
