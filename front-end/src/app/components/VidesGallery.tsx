import React, { useEffect } from "react";
import VideoCard from "./VideoCard";
import toast from "react-hot-toast";
import { useAppContext } from "../AppContext";

export default function VidesGallery() {
  const context = useAppContext();

  const handleVideoRef = (e: any) => {
    if (e) {
      e.playbackRate = 0.25;
    }
  };

  useEffect(() => {
    try {
      const checkJwtCookie = async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}:3001/myvideoasks`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        var data = await response.json();
        if (data === null || data.succes === false) {
          return;
        } else if (context && data !== null) {
          const myVideoAsks = data.myVideoAsks;
          context.setMyVideoAsks(myVideoAsks);
        }
      };
      checkJwtCookie();
    } catch (error: any) {
      const msg = "Error during getting videos" + error.message;
      toast.error(msg);
    }
  }, []);

  return (
    <div className="w-full px-[5%]">
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 
        lg:grid-cols-4 gap-4 p-4"
      >
        {context.myVideoAsks &&
          context.myVideoAsks.map((video) => (
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
                <VideoCard Id={video.id} />
              </div>
              <div className="w-full  text-center mt-2">
                {video.creationDate.split("T")[0]}
              </div>
            </div>
          ))}
        {!context.myVideoAsks && (
          <div className="bg-white rounded-xl p-4 animate-pulse" />
        )}
      </div>
    </div>
  );
}
