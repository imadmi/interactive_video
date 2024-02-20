"use client";

import { useEffect, useRef, useState } from "react";
import { mockData } from "./mockData";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCirclePlay } from "react-icons/fa6";
import { FaArrowRightLong } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { IoMdVolumeMute } from "react-icons/io";
import { useAppContext } from "../AppContext";
import { RiFullscreenFill } from "react-icons/ri";
import { MdOutlineFullscreenExit } from "react-icons/md";
import VideoPlayerProgress from "../components/VideoPlayerProgress";


const VideoAskComponent = () => {
  const context = useAppContext();
  const router = useRouter();

  const handleQuestionClick = async (nextVideoId: string | null) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (nextVideoId) {
      const nextVideo = mockData.find((video) => video.id === nextVideoId);

      if (nextVideo) {
        context.setvideoAsk(nextVideo);
      } else {
        console.error("Video with the specified ID was not found.");
      }
    } else {
      // router.push("/dashboard");
      console.log("Navigating to dashboard...");
    }
  };

  const toggleMute = () => {
    context.setIsMuted(!context.isMuted);
  };
  const toggleFullscreen = () => {
    context.setisFullscrean(!context.isFullscrean);
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleMetadataLoaded = () => {
        context.setVideoDuration(video.duration);
      };

      video.addEventListener("timeupdate", handleMetadataLoaded);
      return () => {
        video.removeEventListener("timeupdate", handleMetadataLoaded);
      };
    }
  }, [context.videoAsk]);

  useEffect(() => {
    if (context.isPaused) return;

    const currentTime = videoRef.current?.currentTime;

    let timer = setTimeout(() => {
      if (context.videoDuration != 0 && currentTime != null) {
        if (context.videoProgress == currentTime / context.videoDuration) {
          const newTime = context.videoProgress  + 0.000001;
          context.setVideoProgress(newTime);
        } else {
          context.setVideoProgress(currentTime / context.videoDuration);
        }
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [
    context.videoAsk,
    context.videoProgress,
    context.videoDuration,
    context.isPaused,
    context.isFullscrean,
  ]);

  useEffect(() => {
    if (videoRef.current && context.UpdatedCurrentTime != 0) {
      videoRef.current.currentTime = context.UpdatedCurrentTime;
      context.setVideoProgress(
        context.UpdatedCurrentTime / context.videoDuration
      );
    }
  }, [context.videoAsk, context.UpdatedCurrentTime, context.isFullscrean]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      context.setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
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

  const formatTime = (timeInSeconds: number | undefined) => {
    if (!timeInSeconds) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const toggleAimation = async () => {
    // wait 500ms for a previos animation to end
    await new Promise((resolve) => setTimeout(resolve, 500));

    context.setAnimate(true);
    setTimeout(() => {
      context.setAnimate(false);
    }, 400);
  };

  const triggerBlink = () => {
    context.setBlink(true);
    setTimeout(() => {
      context.setBlink(false);
    }, 500);
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <AnimatePresence>
        {context.isPaused && (
          <motion.div
            className={`absolute ${
              context.isFullscrean
                ? " top-[46%] "
                : " top-[40%] lg:top-[42%] lg:-translate-x-[20vw] "
            } z-10 rounded-full shadow-black shadow-2xl cursor-pointer`}
            onClick={togglePlayPause}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaCirclePlay
              className="text-white rounded-full shadow-2xl bg-black bg-opacity-60"
              size="70"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`relative  ${
          context.isFullscrean
            ? "w-screen h-screen"
            : "mx-[10%] h-[60%] rounded-3xl lg:flex-row"
        }  overflow-hidden  flex items-center bg-black lg:bg-white `}
        onClick={togglePlayPause}
      >
        <div
          className={`lg:relative lg:h-full ${
            context.isFullscrean ? "w-full" : "lg:w-1/2"
          }  bg-gray-950 flex items-center justify-center`}
        >
          <AnimatePresence>
            {context.isFullscrean && (
              <motion.div
                className="absolute top-7 right-5 z-20 border-2 border-white bg-white 
                rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(); // Stop the click event from propagating to the parent
                  toggleFullscreen();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <MdOutlineFullscreenExit
                  className="text-black rounded-lg shadow-2xl mx-2 my-1"
                  size="20"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!context.isFullscrean && (
              <motion.div
                className="absolute top-7 right-5 z-20 border-2 border-white rounded-lg
                 shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleFullscreen();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <RiFullscreenFill
                  className="text-white rounded-lg shadow-2xl mx-2 my-1"
                  size="20"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!context.isMuted && (
              <motion.div
                className="absolute top-7 right-[122px] z-20 border-2 pl-1 border-white
                 bg-white rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation(); // Stop the click event from propagating to the parent
                  toggleMute();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IoMdVolumeMute
                  className="text-black rounded-lg shadow-2xl mx-2 my-1"
                  size="20"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {context.isMuted && (
              <motion.div
                className="absolute top-7 right-[122px] z-20 border-2 border-white 
                rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  toggleMute();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <IoVolumeMuteSharp
                  className="text-white rounded-lg shadow-2xl mx-2 my-1"
                  size="20"
                />
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {context.playbackSpeed === 1 && (
              <motion.div
                className="absolute top-7 right-[70px] z-20 border-2 border-white bg-black 
                bg-opacity-10 rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlaybackSpeed();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-white font-sans font-bold text-xs w-9 flex items-center
                 justify-center h-7">
                  {context.playbackSpeed}x
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(context.playbackSpeed === 1.5 || context.playbackSpeed === 2) && (
              <motion.div
                className="absolute top-7 right-[70px] z-20 border-2 border-white bg-white
                 rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlaybackSpeed();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-black font-sans font-bold text-xs w-9 flex items-center
                 justify-center h-7">
                  {context.playbackSpeed}x
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute top-7 right-[180px] z-20 rounded-lg shadow-2xl flex 
              items-center justify-center cursor-pointer w-auto">
              <div className="text-white font-sans font-semibold text-md flex 
              items-center justify-center h-7 w-auto">
                {formatTime(videoRef.current?.currentTime)} /{" "}
                {formatTime(videoRef.current?.duration)}
              </div>
            </motion.div>
          </AnimatePresence>
          <div
            className={`lg:w-full ${
              context.isFullscrean
                ? "w-screen h-screen flex items-center justify-center"
                : "w-[80vw] auto"
            }`}
            style={{
              animation: context.animate ? "swipeUp 0.3s ease-in forwards" : ``,
            }}
          >
            <VideoPlayerProgress progress={context.videoProgress} />
            <video
              src={context.videoAsk.url}
              ref={videoRef}
              loop
              muted={context.isMuted}
              autoPlay
              className="h-full w-auto"
            >
              <source src={context.videoAsk.url} />
            </video>
          </div>
        </div>
        <div
          className={`${
            context.isFullscrean ? "lg:hidden" : "block"
          } lg:relative lg:w-1/2 absolute bottom-0 w-full lg:max-h-[100%] min-h-0
           max-h-[50%] text-center overflow-y-auto`}
          style={{
            animation: context.animate ? "swipeUp 0.3s ease-in forwards" : "",
          }}>
          <div className="flex flex-col items-center mb-4">
            <h3 className="font-thin font-sans mb-3 lg:font-normal text-gray-300
             lg:text-gray-700  text-md lg:mb-3">
              {context.videoAsk.title}
            </h3>
            {context.videoAsk.questions.map((question, index) => (
              <button
                className="flex flex-row items-center text-left lg:w-4/6 md:w-3/6
                 w-[90%] mb-2 lg:mb-3 p-3 bg-black bg-opacity-55 lg:text-black
                  lg:bg-opacity-10 lg:border border-2 border-gray-700 border-opacity-5
                   hover:border-opacity-100 hover:border-violet-600 text-white py-2 
                   px-4 rounded-full font-semibold font-sans"
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  handleQuestionClick(question.next_video_id);
                  context.setIsPaused(false);
                  toggleAimation();
                  triggerBlink();
                  context.setClickedButtonIndex(index);
                  context.setUpdatedCurrentTime(0);
                }}
                style={{
                  animation:
                    context.blink && context.clickedButtonIndex === index
                      ? "blink 0.5s linear"
                      : "",
                }}
              >
                <div className="bg-violet-600 bg-opacity-80 font-mono font-thin text-sm
                 w-8 h-8 rounded-full text-center flex items-center justify-center mr-3
                  lg:text-white">
                  {index + 1}
                </div>
                <div className="inline">{question.question}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
      <Link
        href="/dashboard"
        className={`bg-gray-900 px-6 py-4 rounded-xl mt-10 text-white ${
          context.isFullscrean ? "hidden" : "block"
        } `}
      >
        <div className="inline-block font-semibold">Go to your Dashboard</div>
        <FaArrowRightLong className="inline-block ml-3" />
      </Link>
    </div>
  );
};

export default VideoAskComponent;
