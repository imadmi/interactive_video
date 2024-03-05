"use client";

import { motion, AnimatePresence } from "framer-motion";
import { IoVolumeMuteSharp } from "react-icons/io5";
import { IoMdVolumeMute } from "react-icons/io";
import { RiFullscreenFill } from "react-icons/ri";
import { MdOutlineFullscreenExit } from "react-icons/md";
import { useAppContext } from "../AppContext";

const VideoControls = ({
  videoRef,
  toggleFullscreen,
  toggleMute,
  togglePlaybackSpeed,
  formatTime,
}: any) => {
  const context = useAppContext();

  return (
    <>
      <AnimatePresence>
        {context.isFullscrean && (
          <motion.div
            className="hidden sm:flex absolute top-7 right-5 z-20 border-2 border-white bg-white
             rounded-lg shadow-2xl items-center justify-center cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              toggleFullscreen();
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <MdOutlineFullscreenExit
              className="text-black rounded-lg shadow-2xl 
            mx-2 my-1"
              size="20"
            />
          </motion.div>
        )}
        {!context.isFullscrean && (
          <motion.div
            className="hidden sm:flex absolute top-7 right-5 z-20 border-2 border-white rounded-lg 
            shadow-2xl items-center justify-center cursor-pointer"
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
        <motion.div
          className={`absolute top-7 right-5 sm:right-[70px] z-20 border-2 ${
            context.playbackSpeed === 1
              ? "border-white bg-black bg-opacity-10"
              : "border-white bg-white"
          } rounded-lg shadow-2xl flex items-center justify-center cursor-pointer`}
          onClick={(event) => {
            event.stopPropagation();
            togglePlaybackSpeed();
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className={`text-${
              context.playbackSpeed === 1 ? "white" : "black"
            } font-sans font-bold text-xs w-9 flex items-center justify-center h-7`}
          >
            {context.playbackSpeed}x
          </div>
        </motion.div>
      </AnimatePresence>
      <AnimatePresence>
        {!context.isMuted ? (
          <motion.div
            className="absolute top-7 right-[70px] sm:right-[122px] z-20 border-2 pl-1 border-white 
            bg-white rounded-lg shadow-2xl flex items-center justify-center cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
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
        ) : (
          <motion.div
            className="absolute top-7 right-[70px] sm:right-[122px] z-20 border-2 border-white rounded-lg 
            shadow-2xl flex items-center justify-center cursor-pointer"
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute top-7 right-[128px] sm:right-[180px] z-20 rounded-lg shadow-2xl flex 
          items-center justify-center cursor-pointer w-auto"
        >
          <div
            className="text-white font-sans font-semibold text-md flex items-center 
          justify-center h-7 w-auto"
          >
            {formatTime(videoRef.current?.currentTime)} /
            {formatTime(videoRef.current?.duration)}
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default VideoControls;
