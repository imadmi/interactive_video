import React from "react";
import { mockData } from "../get-started/mockData";
import VideoCard from "./VideoCard";

export default function VidesGallery() {

  const handleVideoRef = (e : any) => {
    if (e) {
      e.playbackRate = 0.25;
    }
  };


  return (
    <div className="w-full px-[5%]">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
      lg:grid-cols-4 gap-4 p-4"
      >
        {mockData.map((video) => (
          <div
            key={video.id}
            className="bg-white rounded-xl p-4 group cursor-pointer"
          >
            <div className="relative">
              <video
                className=" w-full h-40 object-cover rounded-md"
                src={video.url}
                muted
                autoPlay
                loop
                ref={handleVideoRef}
              />
              <VideoCard />
              
            </div>
            <div className="w-full  text-center mt-2">{video.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
