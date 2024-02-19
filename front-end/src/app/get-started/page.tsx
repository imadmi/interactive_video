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

const VideoPlayerControls = ({ progress }: { progress: number }) => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add the event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="absolute top-0 flex flex-col w-full h-full items-center justify-start">
      <div className="relative w-full">
        <div className="absolute top-0 left-0 h-2 w-full bg-gray-800 opacity-40" />
        <button
          className="hidden lg:block absolute top-0 h-2 hover:h-3 bg-violet-600 transition-all duration-200 z-10"
          style={{ width: `${Math.floor(progress * screenWidth * 0.4)}px` }}
          onClick={() => {
            console.log("Clicked on progress bar");
          }}
        />
        <button
          className="lg:hidden absolute top-0 h-2 hover:h-3 bg-violet-600 transition-all duration-200 z-10"
          style={{ width: `${Math.floor(progress * screenWidth * 0.8)}px` }}
          onClick={() => {
            console.log("Clicked on progress bar");
          }}
        />
      </div>
    </div>
  );
};

const VideoAskComponent = () => {
  const [videoAsk, setvideoAsk] = useState(mockData[0]);

  const [inputValue, setInputValue] = useState("");

  const router = useRouter();

  const handleQuestionClick = (nextVideoId: string | null) => {
    if (nextVideoId) {
      const nextVideo = mockData.find((video) => video.id === nextVideoId);

      if (nextVideo) {
        setvideoAsk(nextVideo);
      } else {
        console.error("Video with the specified ID was not found.");
      }
    } else {
      // router.push("/dashboard");
      console.log("Navigating to dashboard...");
    }
  };

  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [videoDuration, setVideoDuration] = useState<number>();
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      console.log("Video duration: ", video.duration);
      console.log("Video videoProgress: ", videoProgress);
      const handleMetadataLoaded = () => {
        // Now we can safely set the video duration
        setVideoDuration(video.duration);
        console.log("Video duration: ", video.duration);
      };

      // add event listener when the video is loaded
      video.addEventListener("timeupdate", handleMetadataLoaded);
      // Cleanup function to remove the event listener
      return () => {
        video.removeEventListener("timeupdate", handleMetadataLoaded);
      };
    }
  }, [videoAsk]);

  useEffect(() => {
    if (isPaused) return;
    if (videoRef.current) {
      // videoRef.current.currentTime = 100;
    }

    const currentTime = videoRef.current?.currentTime;
    if (videoDuration != null && currentTime != null) {
      let timer = setTimeout(() => {
        if (videoProgress == currentTime / videoDuration) {
          setVideoProgress((prev) => prev + 0.000001);
        } else {
          setVideoProgress(currentTime / videoDuration);
        }
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [videoAsk, videoProgress, videoDuration, isPaused]);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      setIsPaused(!video.paused);
      video.paused ? video.play() : video.pause();
    }
  };

  const togglePlaybackSpeed = () => {
    const newSpeed = playbackSpeed === 2 ? 1 : playbackSpeed + 0.5;
    setPlaybackSpeed(newSpeed);

    if (videoRef.current) {
      videoRef.current.playbackRate = newSpeed;
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-gray-100">
      <AnimatePresence>
        {isPaused && (
          <motion.div
            className="absolute top-[40%] z-10 rounded-full shadow-inner lg:-translate-x-[20vw] "
            onClick={togglePlayPause}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaCirclePlay
              className="text-white rounded-full shadow-2xl"
              size="70"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className="relative  mx-[10%] rounded-3xl overflow-hidden h-[60%] flex items-center bg-white lg:flex-row"
        onClick={togglePlayPause}
      >
        <div className="lg:relative lg:h-full lg:w-1/2 bg-gray-950 flex items-center justify-center">
          <AnimatePresence>
            {!isMuted && (
              <motion.div
                className="absolute top-5 right-16 z-20 border-2 pl-1 border-white bg-white rounded-lg shadow-2xl "
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
            {isMuted && (
              <motion.div
                className="absolute top-5 right-16 z-20 border-2 border-white rounded-lg shadow-2xl"
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
            {playbackSpeed === 1 && (
              <motion.div
                className="absolute top-5 right-5 z-20 border-2 border-white bg-black bg-opacity-10 rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlaybackSpeed();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-white font-sans font-bold text-xs w-9 flex items-center justify-center h-7">
                  {playbackSpeed}x
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {(playbackSpeed === 1.5 || playbackSpeed === 2) && (
              <motion.div
                className="absolute top-5 right-5 z-20 border-2  border-white bg-white rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
                onClick={(event) => {
                  event.stopPropagation();
                  togglePlaybackSpeed();
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="text-black font-sans font-bold text-xs w-9 flex items-center justify-center h-7">
                  {playbackSpeed}x
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="lg:w-full">
            <VideoPlayerControls progress={videoProgress} />
            <video
              src={videoAsk.url}
              ref={videoRef}
              loop
              muted={isMuted}
              autoPlay
              className="w-full h-auto"
            >
              <source src={videoAsk.url} />
            </video>
          </div>
        </div>
        <div className="lg:relative lg:w-1/2 absolute bottom-0 w-full lg:max-h-[100%] min-h-0 max-h-[50%] text-center overflow-y-auto">
          <div className="flex flex-col items-center mb-4">
            <h3 className="font-thin font-sans mb-3 lg:font-normal text-gray-300 lg:text-gray-700  text-md lg:mb-3">
              {videoAsk.title}
            </h3>
            {videoAsk.questions.map((question, index) => (
              <button
                className="flex flex-row items-center text-left lg:md:w-4/6 md:w-3/6 w-[90%] mb-2 p-3 bg-black bg-opacity-55 lg:text-black lg:bg-opacity-10 lg:border border-2 border-gray-700 border-opacity-5 hover:border-opacity-100 hover:border-violet-600 text-white py-2 px-4 rounded-full font-semibold font-sans"
                key={index}
                onClick={(event) => {
                  event.stopPropagation();
                  handleQuestionClick(question.next_video_id);
                  setIsPaused(false);
                }}
              >
                <div className="bg-violet-600 bg-opacity-80 font-mono font-thin text-sm w-8 h-8 rounded-full text-center flex items-center justify-center mr-3 lg:text-white">
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
        className="bg-gray-900 px-6 py-4 rounded-xl mt-10 text-white"
      >
        <div className="inline-block font-semibold">Go to your Dashboard</div>
        <FaArrowRightLong className="inline-block ml-3" />
      </Link>
    </div>
  );
};

export default VideoAskComponent;
