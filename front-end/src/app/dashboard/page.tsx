"use client";
import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import toast from "react-hot-toast";
import { useAppContext } from "../AppContext";
import UploadVideo from "../components/UploadVideo";
import { FaAnglesDown } from "react-icons/fa6";

const VideoUploadForm = () => {
  const context = useAppContext();
  const [isFormVisible, setIsFormVisible] = useState<boolean[]>([true]);

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
    // make all the form invisible except the last one
    const newIsFormVisible = [...isFormVisible];
    newIsFormVisible.forEach((bool, index) => {
      newIsFormVisible[index] = false;
    });

    newIsFormVisible.push(true);
    setIsFormVisible(newIsFormVisible);

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
    const newIsFormVisible = [...isFormVisible];
    newIsFormVisible.splice(index, 1);
    setIsFormVisible(newIsFormVisible);

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
        credentials: "include",
        body: JSON.stringify(context.videoAsks),
      }
    );
    console.log(context.videoAsks);
    const data = await res.json();

    
    if (data.success) {
      toast.success("VideoAsk created successfully");
    } else if (data.error) {
      const msg = "Failed to create VideoAsk :" + data.error;
      toast.error(msg);
    } else {
      toast.error("Failed to create VideoAsk");
    }
  };

  const toggleHide = (index: number) => {
    const newIsFormVisible = [...isFormVisible];
    newIsFormVisible[index] = !newIsFormVisible[index];
    setIsFormVisible(newIsFormVisible);
  };

  return (
    <div className="relative flex justify-center ">
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
              {!videoAsk.url && context.isModalOpen && <UploadVideo />}
              <div className="">
                <div className="flex w-full flex-row justify-between">
                  <div className="flex flex-row items-center">
                    <label
                      className={`block text-sm font-sans text-gray-700 ${
                        isFormVisible[videoAskIndex] === true && "mb-2 "
                      }`}
                    >
                      Video ID:
                    </label>
                    {isFormVisible[videoAskIndex] === false && (
                      <div
                        className={`ml-4 ${
                          isFormVisible[videoAskIndex] === true && "mb-2 "
                        }`}
                      >
                        {videoAsk.id}
                      </div>
                    )}
                  </div>
                  <button
                    className="relative"
                    onClick={() => toggleHide(videoAskIndex)}
                  >
                    <FaAnglesDown
                      size="17 "
                      className={`text-gray-400 relative ${
                        isFormVisible[videoAskIndex] === true &&
                        "rotate-180 mb-2 "
                      } -z-50 ease-in-out transition-all duration-300`}
                    />
                  </button>
                </div>

                {isFormVisible[videoAskIndex] === true && (
                  <>
                    <input
                      type="text"
                      id={`id`}
                      name="id"
                      value={videoAsk.id}
                      onChange={(e) => handleVideoAskChange(videoAskIndex, e)}
                      className="border-gray-500  bg-slate-100 bg-opacity-10 
                      placeholder-gray-800 appearance-none border rounded w-full 
                      py-2 px-3 text-black leading-tight focus:outline-none 
                      focus:border-2 focus:border-green-400 focus:-outline mb-2"
                    />
                    <label className="block text-sm font-sans text-gray-700 mb-2">
                      Video Title:
                    </label>
                    <input
                      type="text"
                      id={`title`}
                      name="title"
                      value={videoAsk.title}
                      onChange={(e) => handleVideoAskChange(videoAskIndex, e)}
                      className="border-gray-500  bg-slate-100 bg-opacity-10 
                      placeholder-gray-800 appearance-none border rounded w-full 
                      py-2 px-3 text-black leading-tight focus:outline-none 
                      focus:border-2 focus:border-green-400 focus:-outline mb-2"
                    />
                  </>
                )}
              </div>

              {isFormVisible[videoAskIndex] === true && (
                <div className="border-b w-full border-gray-200 mt-4 mb-2" />
              )}

              {isFormVisible[videoAskIndex] === true && (
                <>
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
                            handleQuestionChange(
                              videoAskIndex,
                              questionIndex,
                              e
                            )
                          }
                          placeholder="Question"
                          className=" placeholder:text-sm placeholder:text-gray-400 
                          border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 
                          appearance-none border rounded w-full py-2 px-3 text-black 
                          leading-tight focus:outline-none focus:border-2 focus:border-green-400 
                          focus:-outline mb-2 mr-2"
                        />
                        <input
                          type="text"
                          name="next_video_id"
                          value={qst.next_video_id || ""}
                          onChange={(e) =>
                            handleQuestionChange(
                              videoAskIndex,
                              questionIndex,
                              e
                            )
                          }
                          placeholder="Next Video ID"
                          className="placeholder:text-sm placeholder:text-gray-400 
                          border-gray-500  bg-slate-100 bg-opacity-10 
                          placeholder-gray-800 appearance-none border rounded w-full 
                          py-2 px-3 text-black leading-tight focus:outline-none 
                          focus:border-2 focus:border-green-400 focus:-outline mb-2"
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
                </>
              )}

              {isFormVisible[videoAskIndex] === true && (
                <div className="text-xs">
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => addQuestion(videoAskIndex)}
                      className="inline-flex items-center px-2 sm:px-4 py-2 border 
                      border-transparent rounded-md  text-sm font-sans text-white 
                      bg-indigo-600 hover:bg-indigo-700 focus:outline-none 
                      focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
                    >
                      Add question
                    </button>
                    <button
                      type="button"
                      onClick={() => removeVideoAsk(videoAskIndex)}
                      className="hover:bg-red-100 hover:border-red-400 inline-flex 
                      items-center px-2 sm:px-4 py-2 border rounded-md text-sm font-sans 
                      border-gray-300 text-black"
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
                        className="hover:bg-green-100 hover:border-green-400 inline-flex 
                        items-center px-2 sm:px-4 py-2 border rounded-md text-sm font-sans 
                        border-gray-300 text-black"
                      >
                        Upload Video
                      </button>
                    )}
                  </div>
                </div>
              )}
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
              className="w-40 text-center hover:bg-green-100 hover:border-green-400 
              items-center px-4 py-2 border rounded-md text-sm font-sans border-gray-300 text-black"
            >
              Add VideoAsk
            </button>
          </div>
          <div className="flex justify-center mb-5">
            <button
              onClick={handleSubmit}
              className="mb-5 w-40 text-center items-center px-4 py-2 border border-transparent 
              rounded-md  text-sm font-sans text-white bg-indigo-600 hover:bg-indigo-700 
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700"
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
