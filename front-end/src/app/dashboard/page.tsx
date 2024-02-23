"use client";
import React, { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { VideoAsk } from "../get-started/types";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "../AppContext";
import UploadVideo from "../components/UploadVideo";

export const VideoUploadForm = () => {
  const context = useAppContext();

  const handleVideoAskChange = (index: number, e: any) => {
    const newVideoAsk = [...context.videoAsks];
    const { name, value } = e.target;
    if (name in newVideoAsk[index]) {
      (newVideoAsk[index] as any)[name] = value;
      context.setVideoAsks(newVideoAsk);
    }
  };

  const handleQuestionChange = (
    videoAskIndex: number,
    questionIndex: number,
    e: any
  ) => {
    const newVideoAsk = [...context.videoAsks];
    const { name, value } = e.target;
    (newVideoAsk[videoAskIndex].questions[questionIndex] as any)[name] = value;
    context.setVideoAsks(newVideoAsk);
  };

  const addQuestion = (videoAskIndex: number) => {
    const newVideoAsk = [...context.videoAsks];
    newVideoAsk[videoAskIndex].questions.push({
      question: "",
      next_video_id: null,
    });
    context.setVideoAsks(newVideoAsk);
  };

  const addVideoAsk = () => {
    context.setVideoAsks([
      ...context.videoAsks,
      {
        id: "",
        title: "",
        url: "",
        questions: [{ question: "", next_video_id: null }],
      },
    ]);
  };

  const removeQuestion = (videoAskIndex: number, questionIndex: number) => {
    const newVideoAsk = [...context.videoAsks];
    newVideoAsk[videoAskIndex].questions.splice(questionIndex, 1);
    context.setVideoAsks(newVideoAsk);
  };

  const removeVideoAsk = (index: number) => {
    const newVideoAsk = [...context.videoAsks];
    newVideoAsk.splice(index, 1);
    context.setVideoAsks(newVideoAsk);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}:3001/saveVideoAsk`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(context.videoAsks),
      }
    );
    const data = await res.json();
    if (res.ok) {
      toast.success("VideoAsk created successfully");
    }
    if (data.success) {
      toast.success("VideoAsk created successfully");
    } else if (data.error) {
      const msg = "Failed to create VideoAsk" + data.error;
      toast.error(msg);
    } else {
      toast.error("Failed to create VideoAsk");
    }
  };

  const handleDragOver = (event: any) => {
    event.preventDefault();
  };

  const handelUpload = async (e: any, Videofile: File) => {
    e.preventDefault();

    if (!Videofile) return;

    try {
      const data = new FormData();
      data.set("file", Videofile);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: data,
      });

      const resData = await res.json();
      if (!res.ok) return "";

      if (resData && resData.success) {
        context.setisModalOpen(false);
        const newVideoAsk = [...context.videoAsks];
        if ("url" in newVideoAsk[context.VideoaskIndex]) {
          newVideoAsk[context.VideoaskIndex].url = resData.path;
          context.setVideoAsks(newVideoAsk);
        }
        return resData.path;
      } else {
        toast.error("Failed to upload video");
        return "";
      }
    } catch (e: any) {
      toast.error("Failed to upload video" + e);
      return "";
    }
  };


  return (
    <div className="relative h-screen flex justify-center overflow-y-auto ">
      <div className="sm:w-[500px] w-[80%] my-[10%]">
        <div className="mb-4 font-sans font-bold text-lg">
          Create a videoAsk :
        </div>
        <div className="">
          {context.videoAsks.map((videoAsk, videoAskIndex) => (
            <div
              key={videoAskIndex}
              className="border border-gray-300 p-4 rounded-md mb-5"
            >
              {!videoAsk.url && context.isModalOpen && (
                <UploadVideo />
              )}
              <div className="mb-4">
                <label
                  htmlFor={`title-${videoAskIndex}`}
                  className="block text-sm font-sans text-gray-700 mb-2"
                >
                  Video identity:
                </label>
                <input
                  type="text"
                  id={`id-${videoAskIndex}`}
                  name="id"
                  value={videoAsk.id}
                  onChange={(e) => handleVideoAskChange(videoAskIndex, e)}
                  required
                  className="border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2"
                />
                <label
                  htmlFor={`title-${videoAskIndex}`}
                  className="block text-sm font-sans text-gray-700 mb-2"
                >
                  Video Title:
                </label>
                <input
                  type="text"
                  id={`title-${videoAskIndex}`}
                  name="title"
                  value={videoAsk.title}
                  onChange={(e) => handleVideoAskChange(videoAskIndex, e)}
                  required
                  className="border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2"
                />
              </div>
              {/* <div className="mb-4">
                <label
                  htmlFor={`url-${videoAskIndex}`}
                  className="block text-sm font-sans text-gray-700 mb-2"
                >
                  Video URL:
                </label>
                <input
                  type="text"
                  id={`url-${videoAskIndex}`}
                  name="url"
                  value={videoAsk.url}
                  onChange={(e) => handleVideoAskChange(videoAskIndex, e)}
                  required
                  className="border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2"
                />
              </div> */}
              <div>
                <div className="text-md font-semibold font-sans text-gray-700 mb-2">
                  Questions :
                </div>

                {videoAsk.questions.map((qst, questionIndex) => (
                  <div
                    key={questionIndex}
                    className="flex items-center justify-center mb-4"
                  >
                    <input
                      type="text"
                      name="question"
                      value={qst.question}
                      onChange={(e) =>
                        handleQuestionChange(videoAskIndex, questionIndex, e)
                      }
                      required
                      placeholder="Question"
                      className=" placeholder:text-sm placeholder:text-gray-400 border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2 mr-2"
                    />
                    <input
                      type="text"
                      name="next_video_id"
                      value={qst.next_video_id || ""}
                      onChange={(e) =>
                        handleQuestionChange(videoAskIndex, questionIndex, e)
                      }
                      placeholder="Next Video ID"
                      className="placeholder:text-sm placeholder:text-gray-400 border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(videoAskIndex, questionIndex)
                      }
                      className="flex justify-center"
                    >
                      <AiOutlineDelete
                        size="25"
                        className="ml-2 mb-2 hover:text-red-500"
                      />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => addQuestion(videoAskIndex)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md  text-sm font-sans text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
                >
                  Add question
                </button>
                <button
                  type="button"
                  onClick={() => removeVideoAsk(videoAskIndex)}
                  className="hover:bg-red-100 hover:border-red-400 inline-flex items-center px-4 py-2 border rounded-md text-sm font-sans border-gray-300 text-black"
                >
                  Delete VideoAsk
                </button>
                {!videoAsk.url && (
                  <button
                    type="button"
                    onClick={() => {
                      context.setVideoaskIndex(videoAskIndex);
                      context.setisModalOpen(true);
                    }}
                    className="hover:bg-green-100 hover:border-green-400 inline-flex items-center px-4 py-2 border rounded-md text-sm font-sans border-gray-300 text-black"
                  >
                    Upload Video
                  </button>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-5 mb-3">
            <button
              type="button"
              onClick={() => {
                addVideoAsk();
                context.setisModalOpen(true);
                context.setVideoaskIndex(context.videoAsks.length);
              }}
              className="w-40 text-center hover:bg-green-100 hover:border-green-400 items-center px-4 py-2 border rounded-md text-sm font-sans border-gray-300 text-black"
            >
              Add VideoAsk
            </button>
          </div>
          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="w-40 text-center items-center px-4 py-2 border border-transparent rounded-md  text-sm font-sans text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoUploadForm;
