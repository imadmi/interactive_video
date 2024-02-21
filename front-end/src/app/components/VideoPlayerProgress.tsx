"use client";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../AppContext";

// This functional component takes a prop named progress,
// which represents the current progress of the video as a percentage.

const VideoPlayerProgress = ({ progress }: { progress: number }) => {
  const context = useAppContext();

  const handleResize = () => {
    context.setScreenWidth(window.innerWidth);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    context.setScreenWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // This function calculates the click ratio based on the user's click position on the progress bar.
  // This ratio is then used to update the current time of the video.
  const ClickRatioFunc = (event: any) => {
    if (event.clientX === undefined) return;

    let clickRatio = 0;

    if (context.isFullscrean === true) {
      clickRatio = event.clientX / context.screenWidth;
    } else if (context.isFullscrean === false && context.screenWidth > 1024) {
      clickRatio =
        (event.clientX - context.screenWidth * 0.1) /
        (context.screenWidth - context.screenWidth * 0.6);
    } else if (context.isFullscrean === false && context.screenWidth <= 1024) {
      clickRatio =
        (event.clientX - context.screenWidth * 0.1) /
        (context.screenWidth - context.screenWidth * 0.2);
    }
    context.setUpdatedCurrentTime(clickRatio * context.videoDuration);
  };

  return (
    <div className="absolute top-0 flex flex-col w-full h-full items-center justify-start">
      <div className="relative w-full">
        <div
          className="absolute top-0 left-0 h-2 w-full bg-gray-600 opacity-40 z-10 cursor-pointer"
          onClick={(event) => {
            event.stopPropagation();
            ClickRatioFunc(event);
          }}
        />
        <button
          className={`${
            context.isFullscrean ? "hidden" : "hidden lg:block"
          }   absolute top-0 h-2 hover:h-3 bg-violet-600 transition-all duration-75 z-10`}
          style={{
            width: `${Math.floor(progress * context.screenWidth * 0.4)}px`,
          }}
          onClick={(event) => {
            event.stopPropagation();
            ClickRatioFunc(event);
          }}
        />
        <button
          className={` ${
            context.isFullscrean ? "hidden" : "block"
          } lg:hidden absolute top-0 h-2 hover:h-3 bg-violet-600 transition-all duration-75 z-10`}
          style={{
            width: `${Math.floor(progress * context.screenWidth * 0.8)}px`,
          }}
          onClick={(event) => {
            event.stopPropagation();
            ClickRatioFunc(event);
          }}
        />
        <button
          className={`${
            context.isFullscrean ? "block" : "hidden"
          } absolute top-0 h-2 hover:h-3 bg-violet-600 transition-all duration-75 z-10`}
          style={{ width: `${Math.floor(progress * context.screenWidth)}px` }}
          onClick={(event) => {
            event.stopPropagation();
            ClickRatioFunc(event);
          }}
        />
      </div>
    </div>
  );
};


export default VideoPlayerProgress;
