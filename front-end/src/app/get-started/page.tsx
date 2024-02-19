"use client";

import { useEffect, useRef, useState } from "react";
import { mockData } from "./mockData";
import { useRouter } from "next/navigation";

interface VideoPlayerControlsProps {
  progress: number;
  isPaused: boolean;
  onPlayPause: () => void;
}

const VideoPlayerControls: React.FC<VideoPlayerControlsProps> = ({
  progress,
  isPaused,
  onPlayPause,
}) => {
  return (
    <div className="relative flex">
      <div
        className="top-20 absolute h-5 bg-red-600"
        style={{ width: `${Math.floor(progress * 500)}px` }}
      ></div>

      <div className="absolute">
        <button
          className="group cursor-pointer flex justify-center items-center"
          onClick={onPlayPause}
        >
          <div className="z-10 fill-white group-hover:fill-[#aaaaaa] transition-colors duration-200 ease-in-out">
            {isPaused ? <div>PlayButton</div> : <div>PauseButton</div>}
          </div>
        </button>
      </div>
    </div>
  );
};

const VideoAskComponent = () => {
  const [videoAsk, setvideoAsk] = useState(mockData[0]);
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

      // add event listener when the video is loaded for the first time
      video.addEventListener("loadedmetadata", handleMetadataLoaded);
      // add event listener when the video is loaded for the first time
      video.addEventListener("timeupdate", handleMetadataLoaded);

      // Cleanup function to remove the event listener
      return () => {
        video.removeEventListener("loadedmetadata", handleMetadataLoaded);
      };
    }
  }, [videoAsk]);

  useEffect(() => {
    if (isPaused) return;
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

  return (
    <div>
      <VideoPlayerControls
        progress={videoProgress}
        isPaused={isPaused}
        onPlayPause={togglePlayPause}
      />
      <video
        src={videoAsk.url}
        ref={videoRef}
        loop
        muted
        autoPlay
        className="rounded-xl w-[500px] h-auto"
      >
        <source src={videoAsk.url} />
      </video>
      <div>
        <div>
          <h2>{videoAsk.title}</h2>
          {videoAsk.questions.map((question, index) => (
            <button
              className="block mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              key={index}
              onClick={() => {
                handleQuestionClick(question.next_video_id);
              }}
            >
              {question.question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VideoAskComponent;
