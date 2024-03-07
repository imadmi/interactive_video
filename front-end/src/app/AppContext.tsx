import React, { createContext, useContext, useState, ReactNode } from "react";
import { VideoAsk } from "./get-started/types";

export type User = {
  id: string;
  name: string;
  email: string;
};

export type MyVideoAsk = {
  id: string;
  title: string;
  url: string;
  creationDate: string;
};

export type AppContextProps = {
  UpdatedCurrentTime: number;
  setUpdatedCurrentTime: (UpdatedCurrentTime: number) => void;
  videoDuration: number;
  setVideoDuration: (videoDuration: number) => void;
  isFullscrean: boolean;
  setisFullscrean: (isFullscrean: boolean) => void;
  screenWidth: number;
  setScreenWidth: (screenWidth: number) => void;
  videoAsk: VideoAsk;
  setvideoAsk: (videoAsk: any) => void;
  videoAsks: VideoAsk[];
  setVideoAsks: (videoasks: VideoAsk[]) => void;
  videoProgress: number;
  setVideoProgress: (videoProgress: number) => void;
  isPaused: boolean;
  setIsPaused: (isPaused: boolean) => void;
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (playbackSpeed: number) => void;
  animate: boolean;
  setAnimate: (animate: boolean) => void;
  blink: boolean;
  setBlink: (blink: boolean) => void;
  clickedButtonIndex: number;
  setClickedButtonIndex: (clickedButtonIndex: number) => void;
  isModalOpen: boolean;
  setisModalOpen: (isModalOpen: boolean) => void;
  VideoaskIndex: number;
  setVideoaskIndex: (VideoaskIndex: number) => void;
  user: User | null;
  setUser: (user: User) => void;
  isDropsOpen: number;
  setDropOpen: (isDropsOpen: number) => void;
  isDropsOpenModal: number;
  setDropOpenModal: (isDropsOpenModal: number) => void;
  isNavbarModalOpen: boolean;
  setNavbarModalOpen: (isNavbarModalOpen: boolean) => void;
  myVideoAsks: MyVideoAsk[];
  setMyVideoAsks: (myVideoAsks: MyVideoAsk[]) => void;
  isVideoPortrait: boolean;
  setisVideoPortrait: (isVideoPortrait: boolean) => void;
};

const AppContext = createContext<AppContextProps | undefined>(undefined);

type AppProviderProps = {
  children: ReactNode;
};

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const [videoAsk, setvideoAsk] = useState({
    id: "",
    title: "",
    url: "",
    questions: [],
  });
  const [videoAsks, setVideoAsks] = useState<VideoAsk[]>([
    {
      id: "",
      title: "",
      url: "",
      questions: [{ question: "", next_video_id: null }],
    },
  ]);

  const [UpdatedCurrentTime, setUpdatedCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [isFullscrean, setisFullscrean] = useState(false);
  const [screenWidth, setScreenWidth] = useState(0);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [animate, setAnimate] = useState(false);
  const [blink, setBlink] = useState(false);
  const [clickedButtonIndex, setClickedButtonIndex] = useState(0);
  const [isModalOpen, setisModalOpen] = useState(false);
  const [VideoaskIndex, setVideoaskIndex] = useState(0);
  const [user, setUser] = useState<User | null>(null);
  const [isDropsOpen, setDropOpen] = useState(0);
  const [isDropsOpenModal, setDropOpenModal] = useState(0);
  const [isNavbarModalOpen, setNavbarModalOpen] = useState(false);
  const [myVideoAsks, setMyVideoAsks] = useState<MyVideoAsk[]>([]);
  const [isVideoPortrait, setisVideoPortrait] = useState(true);

  const contextValue: AppContextProps = {
    UpdatedCurrentTime,
    setUpdatedCurrentTime,
    videoDuration,
    setVideoDuration,
    isFullscrean,
    setisFullscrean,
    screenWidth,
    setScreenWidth,
    videoAsk,
    setvideoAsk,
    videoProgress,
    setVideoProgress,
    isPaused,
    setIsPaused,
    isMuted,
    setIsMuted,
    playbackSpeed,
    setPlaybackSpeed,
    animate,
    setAnimate,
    blink,
    setBlink,
    clickedButtonIndex,
    setClickedButtonIndex,
    isModalOpen,
    setisModalOpen,
    VideoaskIndex,
    setVideoaskIndex,
    videoAsks,
    setVideoAsks,
    user,
    setUser,
    isDropsOpen,
    setDropOpen,
    isNavbarModalOpen,
    setNavbarModalOpen,
    myVideoAsks,
    setMyVideoAsks,
    isDropsOpenModal,
    setDropOpenModal,
    isVideoPortrait,
    setisVideoPortrait,
  };

  return (
    <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
