"use client";
import React, { useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { MdCloudUpload } from "react-icons/md";
import { VideoAsk } from "../get-started/types";

export const VideoUploadForm = () => {
  const [videoAsk, setVideoAsk] = useState<VideoAsk[]>([
    {
      id: "",
      title: "",
      url: "",
      questions: [{ question: "", next_video_id: null }],
    },
  ]);
  const [isModalOpen, setisModalOpen] = useState(true);
  const [VideoaskIndex, setVideoaskIndex] = useState(0);

  const handleVideoAskChange = (index: number, e: any) => {
    const newVideoAsk = [...videoAsk];
    const { name, value } = e.target;
    if (name in newVideoAsk[index]) {
      (newVideoAsk[index] as any)[name] = value;
      setVideoAsk(newVideoAsk);
    }
  };

  const handleQuestionChange = (
    videoAskIndex: number,
    questionIndex: number,
    e: any
  ) => {
    const newVideoAsk = [...videoAsk];
    const { name, value } = e.target;
    (newVideoAsk[videoAskIndex].questions[questionIndex] as any)[name] = value;
    setVideoAsk(newVideoAsk);
  };

  const addQuestion = (videoAskIndex: number) => {
    const newVideoAsk = [...videoAsk];
    newVideoAsk[videoAskIndex].questions.push({
      question: "",
      next_video_id: null,
    });
    setVideoAsk(newVideoAsk);
  };

  const addVideoAsk = () => {
    console.log("adding VideoAsk");

    setVideoAsk([
      ...videoAsk,
      {
        id: "",
        title: "",
        url: "",
        questions: [{ question: "", next_video_id: null }],
      },
    ]);
  };

  const removeQuestion = (videoAskIndex: number, questionIndex: number) => {
    console.log("removing question");
    const newVideoAsk = [...videoAsk];
    newVideoAsk[videoAskIndex].questions.splice(questionIndex, 1);
    setVideoAsk(newVideoAsk);
  };

  const removeVideoAsk = (index: number) => {
    console.log("removing VideoAsk");
    const newVideoAsk = [...videoAsk];
    newVideoAsk.splice(index, 1);
    setVideoAsk(newVideoAsk);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("handleSubmit" + videoAsk);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}:3001/saveVideoAsk`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoAsk),
    });
    const data = await res.json();
  };

  const handleDragOver = (event : any) => {
    event.preventDefault();
  };

  const handelUpload = async (e : any, Videofile : File) => {
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
        console.log(resData.path);

        setisModalOpen(false);

        const newVideoAsk = [...videoAsk];
        if ("url" in newVideoAsk[VideoaskIndex]) {
          newVideoAsk[VideoaskIndex].url = resData.path;
          setVideoAsk(newVideoAsk);
        }

        return resData.path;
      } else {
        return "";
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  // const handleDrop = (event) => {
  //   const upload = async (event) => {
  //     event.preventDefault();
  //     event.stopPropagation();

  //     // setFile(event.dataTransfer.files?.[0]);
  //     setFile(event.target.files?.[0]);
  //     console.log(event.target.files?.[0]);
  //     setisModalOpen(false);

  //     const newVideoAsk = [...videoAsk];
  //     // const { name, value } = e.target;
  //     // You may need to ensure that the name is a valid key of VideoAsk

  //     const path = await handelUpload();
  //     if ("url" in newVideoAsk[VideoaskIndex]) {
  //       (newVideoAsk[VideoaskIndex] as any)["url"] = path;
  //       setVideoAsk(newVideoAsk);
  //     }
  //   };
  //   upload();
  // };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const file = event.dataTransfer.files?.[0];
    if (!file) {
      console.log("No file dropped or selected");
      return;
    }

    console.log(file);
    setisModalOpen(false);

    // const path = await handelUpload(event); // Make sure to await the async function
    // const newVideoAsk = [...videoAsk];

    // if ("url" in newVideoAsk[VideoaskIndex]) {
    //   newVideoAsk[VideoaskIndex].url = path; // Assuming url is a property of VideoAsk
    //   setVideoAsk(newVideoAsk); // Update the state with the new array
    // }
  };

  return (
    <div className="relative h-screen flex justify-center overflow-y-auto ">
      <div className="sm:w-[500px] w-[80%] my-[10%]">
        <div className="mb-4 font-sans font-bold text-lg">
          Create a videoAsk :
        </div>
        <div className="">
          {videoAsk.map((videoAsk, videoAskIndex) => (
            <div
              key={videoAskIndex}
              className="border border-gray-300 p-4 rounded-md mb-5"
            >
              {!videoAsk.url && isModalOpen && (
                <div
                  className="fixed inset-0 w-screen h-screen bg-gray-600 flex items-center 
                justify-center bg-opacity-50 backdrop-blur-lg"
                >
                  <div className="relative w-[450px] h-96 bg-white rounded-[40px] p-4">
                    <button
                      onClick={() => setisModalOpen(false)}
                      className="absolute top-4 right-9"
                    >
                      <IoClose className="my-3 text-gray-600" size="23" />
                    </button>
                    <div className="font-bold text-lg ml-7 my-3">
                      Upload a video
                    </div>
                    <div
                      className="border-dashed border-4 m-4 h-[80%] border-gray-300 rounded-[40px]
                    flex flex-col items-center justify-center space-y-2"
                      // onDragOver={handleDragOver}
                      // onDrop={handleDrop}
                    >
                      <MdCloudUpload className="text-cyan-400" size="60" />
                      <div className=" text-xl font-sans">
                        Drag a video to upload
                      </div>
                      <div className="font-thin text-lg"> Or</div>
                      <input
                        id="videoInput"
                        type="file"
                        name="file"
                        accept="video/*"
                        onChange={(e) => {
                          if (
                            e.target.files &&
                            e.target.files?.[0] &&
                            e.target.files.length > 0
                          ) {
                            handelUpload(e, e.target.files?.[0]);
                          }
                        }}
                        hidden
                      />
                      <button
                        onClick={(e) => {
                          document.getElementById("videoInput")?.click();
                        }}
                        className="rounded-full border-[3px] border-cyan-400 text-cyan-400 py-1 px-4"
                      >
                        Brows files
                      </button>
                    </div>
                  </div>
                </div>
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
              <div className="mb-4">
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
              </div>
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
              </div>
            </div>
          ))}
          <div className="flex justify-center mt-5 mb-3">
            <button
              type="button"
              onClick={() => {
                addVideoAsk();
                setisModalOpen(true);
                setVideoaskIndex(videoAsk.length);
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
