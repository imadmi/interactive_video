"use client";
import React, { useEffect, useRef, useState } from "react";
import { AppProvider, useAppContext } from "../AppContext";
import VideoControls from "../components/VideoControllers";
import PauseComponent from "../components/PauseComponent";
import PauseVideo from "../components/PauseVideo";
import VideoProgress from "../components/VideoProgress";

export default function page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const context = useAppContext();

  const toggleMute = () => {
    context.setIsMuted(!context.isMuted);
  };
  const toggleFullscreen = () => {
    context.setisFullscrean(!context.isFullscrean);
  };

  // Updates the video duration in the context when the it loads or changes.
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const UpdateVideoDuration = () => {
        context.setVideoDuration(video.duration);
      };
      // "timeupdate" event fires when the currentTime attribute updates.
      video.addEventListener("timeupdate", UpdateVideoDuration);
      return () => {
        video.removeEventListener("timeupdate", UpdateVideoDuration);
      };
    }
  }, []);

  // Updates the video progress in the context when the video is playing.
  useEffect(() => {
    if (context.isPaused) return;
    const currentTime = videoRef.current?.currentTime;

    // use of setTimeout to avoid infinite loop
    let timer = setTimeout(() => {
      if (context.videoDuration != 0 && currentTime != null) {
        // change the video progress onclick
        if (context.videoProgress == currentTime / context.videoDuration) {
          const newTime = context.videoProgress + 0.0000000001;
          context.setVideoProgress(newTime);
        }
        // update the video progress when the video is playing
        else {
          context.setVideoProgress(currentTime / context.videoDuration);
        }
      }
    }, 50);
    return () => clearTimeout(timer);
  }, [
    context.videoProgress,
    context.videoDuration,
    context.isPaused,
    context.isFullscrean,
  ]);

  // Updates the video currentTime allowing users to jump to different parts of the video
  useEffect(() => {
    if (videoRef.current && context.UpdatedCurrentTime != 0) {
      videoRef.current.currentTime = context.UpdatedCurrentTime;
      context.setVideoProgress(
        context.UpdatedCurrentTime / context.videoDuration
      );
    }
  }, [context.UpdatedCurrentTime, context.isFullscrean]);

  const togglePlayPause = async (e: any) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (video) {
      console.log(context.isPaused);
      context.setIsPaused(!video.paused);
      // video.play() and video.pause() return a boolean value
      video.paused ? await video.play() : video.pause();
    }
  };

  const togglePlaybackSpeed = () => {
    const newSpeed =
      context.playbackSpeed === 2 ? 1 : context.playbackSpeed + 0.5;
    context.setPlaybackSpeed(newSpeed);

    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  // Formats the time in seconds to a string in the format "mm:ss"
  const formatTime = (timeInSeconds: number | undefined) => {
    if (!timeInSeconds) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const divRef = useRef<HTMLDivElement>(null);

  // State to store the dimensions
  const [dimensions, setDimensions] = useState({ width:  0, height:  0 });
  const [cursorPosition, setCursorPosition] = useState(0);

  useEffect(() => {
    // Function to update dimensions
    const updateDimensions = () => {
      if (divRef.current) {
        setDimensions({
          width: divRef.current.offsetWidth,
          height: divRef.current.offsetHeight,
        });
      }
    };

    // Update dimensions on initial render
    updateDimensions();

    // Add event listener for window resize
    window.addEventListener('resize', updateDimensions);

    // Cleanup function to remove event listener
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      setCursorPosition(x);
    }
  };
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-[500px] h-[400px]">
        <div
          className={`
          ${
            context.isFullscrean
              ? "w-screen h-screen fixed top-0 right-0"
              : "relative w-full h-full"
          }
          overflow-hidden
      `}
          onClick={togglePlayPause}
          ref={divRef} 
          onMouseMove={handleMouseMove}

        >
          <VideoProgress progress={context.videoProgress} 
          dimensions={dimensions}
          cursorPosition={cursorPosition}/>
          <PauseVideo togglePlayPause={togglePlayPause} />

          <VideoControls
            videoRef={videoRef}
            toggleFullscreen={toggleFullscreen}
            toggleMute={toggleMute}
            togglePlaybackSpeed={togglePlaybackSpeed}
            formatTime={formatTime}
          />
          <video
            ref={videoRef}
            src="/videos/homevideo.mp4"
            loop
            muted={context.isMuted}
            className="h-full w-auto object-cover rounded-3xl z-0"
          >
            <source src="/videos/homevideo.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    </div>
  );
}
