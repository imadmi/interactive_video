"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { useAppContext } from "../AppContext";
import VideoPlayerProgress from "../components/VideoPlayerProgress";
import PauseComponent from "../components/PauseComponent";
import VideoControls from "../components/VideoControllers";
import QuestionList from "../components/VideoQuestios";
import { VideoAsk } from "../../app/get-started/types";
import TitleComponent from "./TitleComponent";

type VideoAskComponentProps = {
  mockData?: VideoAsk[];
  routedTo?: string;
  buttonLink?: string;
};

const VideoAskComponent: React.FC<VideoAskComponentProps> = ({
  mockData,
  routedTo = "/dashboard",
  buttonLink,
}) => {
  const context = useAppContext();
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);

  // Initializes the video player with the first video from the mockData array upon component mount or when mockData changes
  useEffect(() => {
    if (mockData) {
      context.setvideoAsk(mockData[0]);
    }
  }, [mockData]);

  // changes the videoAsk based on the question clicked
  const handleQuestionClick = async (nextVideoId: string | null) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (nextVideoId && mockData !== undefined && mockData.length > 0) {
      const nextVideo = mockData.find((video) => video.id === nextVideoId);

      if (nextVideo) {
        context.setvideoAsk(nextVideo);
      } else {
        console.error("Video with the specified ID was not found.");
      }
    } else if (nextVideoId === null) {
      router.push(routedTo);
    }
  };

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
  }, [context.videoAsk]);

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
    context.videoAsk,
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
  }, [context.videoAsk, context.UpdatedCurrentTime, context.isFullscrean]);

  const togglePlayPause = async () => {
    const video = videoRef.current;
    if (video) {
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

  const toggleAimation = async () => {
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

  const divRef = useRef<HTMLDivElement>(null);
  const [divHeight, setDivHeight] = useState<number>(0);

  useEffect(() => {
    if (divRef.current) {
      setDivHeight(divRef.current.offsetHeight);
    }
  }, []);

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      video.onloadedmetadata = () => {
        context.setisVideoPortrait(video.videoHeight > video.videoWidth);
      };
    }
  }, [context.videoAsk.url]);

  return (
    <div
      className="w-screen h-screen flex flex-col items-center 
    justify-center bg-gray-100"
    >
      <PauseComponent
        togglePlayPause={togglePlayPause}
        buttonLink={buttonLink}
      />

      <div
        className={`relative  ${
          context.isFullscrean
            ? "w-screen h-screen"
            : "mx-0 sm:mx-[10%] h-full sm:h-[60%]  w-full sm:w-[80%] sm:rounded-3xl lg:flex-row"
        }  overflow-hidden  flex justify-center items-center bg-black lg:bg-white `}
        onClick={togglePlayPause}
      >
        <TitleComponent />
        <div
          ref={divRef}
          className={`lg:relative lg:h-full ${
            context.isFullscrean ? "w-full" : "max-w-full lg:w-1/2"
          }  bg-gray-950 flex items-center justify-center`}
        >
          <VideoControls
            videoRef={videoRef}
            toggleFullscreen={toggleFullscreen}
            toggleMute={toggleMute}
            togglePlaybackSpeed={togglePlaybackSpeed}
            formatTime={formatTime}
          />
          <div
            className={`${
              context.isFullscrean ? "w-screen h-screen" : "lg:w-[60vw]"
            } flex items-center justify-center ${
              context.isVideoPortrait ? "h-full w-auto" : "w-full sm:h-auto"
            }`}
            style={{
              animation: context.animate ? "swipeUp 0.3s ease-in forwards" : ``,
            }}
          >
            <VideoPlayerProgress progress={context.videoProgress} />
            {context.videoAsk && context.videoAsk.url && (
              <video
                src={context.videoAsk.url}
                ref={videoRef}
                loop
                muted={context.isMuted}
                autoPlay
                className={`h-screen w-screen object-cover sm:object-contain 
                ${
                  context.isVideoPortrait
                    ? `sm:h-[${divHeight}px] lg:h-full`
                    : "sm:w-full sm:h-auto"
                }
                `}
              >
                <source src={context.videoAsk.url} />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>

        <QuestionList
          handleQuestionClick={handleQuestionClick}
          toggleAnimation={toggleAimation}
          triggerBlink={triggerBlink}
        />
      </div>
      {buttonLink && (
        <Link
          href={buttonLink}
          className={`bg-gray-900 px-6 py-4 rounded-xl mt-10 text-white ${
            context.isFullscrean ? "hidden" : "hidden sm:block"
          } `}
        >
          <div className="inline-block font-semibold">Go to your Dashboard</div>
          <FaArrowRightLong className="inline-block ml-3" />
        </Link>
      )}
    </div>
  );
};

export default VideoAskComponent;
