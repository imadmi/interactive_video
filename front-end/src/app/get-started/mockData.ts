import { VideoAsk } from "./types";

const mockData: VideoAsk[] = [
  {
    id: "video1",
    title: "Choose 1 of 5 options",
    url: "/videos/video1.mp4",
    questions: [
      {
        question: "Creating a videoask",
        next_video_id: "video2",
      },
      {
        question: "Navigating your responses",
        next_video_id: "video3",
      },
      {
        question: "Managing your contacts",
        next_video_id: "video4",
      },
      {
        question: "Account and org settings",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video2",
    title: "Choose 1 of 4 options",
    url: "/videos/video2.mp4",
    questions: [
      {
        question: "Navigating your responses",
        next_video_id: "video3",
      },
      {
        question: "Managing your contacts",
        next_video_id: "video4",
      },
      {
        question: "Account and org settings",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video3",
    title: "Choose 1 of 4 options",
    url: "/videos/video3.mp4",
    questions: [
      {
        question: "Creating a videoask",
        next_video_id: "video2",
      },
      {
        question: "Managing your contacts",
        next_video_id: "video4",
      },
      {
        question: "Account and org settings",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video4",
    title: "Choose 1 of 4 options",
    url: "/videos/video4.mp4",
    questions: [
      {
        question: "Creating a videoask",
        next_video_id: "video2",
      },
      {
        question: "Navigating your responses",
        next_video_id: "video3",
      },
      {
        question: "Account and org settings",
        next_video_id: "video5",
      },
      {
        question: "I'm ready, go to my dashboard!",
        next_video_id: null,
      },
    ],
  },

  {
    id: "video5",
    title: "Choose 1 of 4 options",
    url: "/videos/video5.mp4",
    questions: [
      {
        question: "Creating a videoask",
        next_video_id: "video2",
      },
      {
        question: "Navigating your responses",
        next_video_id: "video3",
      },
      {
        question: "Managing your contacts",
        next_video_id: "video4",
      },
      {
        question: "I'm ready, go to my dashboard!",
        next_video_id: null,
      },
    ],
  },

];

export { mockData };
