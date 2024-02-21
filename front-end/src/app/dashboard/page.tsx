"use client";
import { AiOutlineDelete } from "react-icons/ai";

// import { useState } from 'react'

// export function UploadForm() {
//   const [file, setFile] = useState<File>()

//   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     if (!file) return

//     try {
//       const data = new FormData()
//       data.set('file', file)

//       const res = await fetch('/api/upload', {
//         method: 'POST',
//         body: data
//       })
//       // handle the error
//       if (!res.ok) throw new Error(await res.text())
//     } catch (e: any) {
//       // Handle errors here
//       console.error(e)
//     }
//   }

//   return (
//     <form onSubmit={onSubmit}>
//       <input
//         type="file"
//         name="file"
//         onChange={(e) => setFile(e.target.files?.[0])}
//       />
//       <input type="submit" value="Upload" />
//     </form>
//   )
// }

// export default UploadForm

import React, { useState } from "react";
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

  const handleVideoAskChange = (index: number, e: any) => {
    const newVideoAsk = [...videoAsk];
    const { name, value } = e.target;
    // You may need to ensure that the name is a valid key of VideoAsk
    if (name in newVideoAsk[index]) {
      (newVideoAsk[index] as any)[name] = value;
      setVideoAsk(newVideoAsk);
    }
  };

  // Handler for questions
  const handleQuestionChange = (
    videoAskIndex: number,
    questionIndex: number,
    e: any
  ) => {
    const newVideoAsk = [...videoAsk];
    const { name, value } = e.target;
    // Similar type assertion can be used here
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
    const newVideoAsk = [...videoAsk];
    newVideoAsk[videoAskIndex].questions.splice(questionIndex, 1);
    setVideoAsk(newVideoAsk);
  };

  const removeVideoAsk = (index: number) => {
    const newVideoAsk = [...videoAsk];
    newVideoAsk.splice(index, 1);
    setVideoAsk(newVideoAsk);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log(videoAsk);
    // Submit videoAsk to your backend or API here

    const res = await fetch("http://localhost:3001/saveVideoAsk", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoAsk),
    }); 
    const data = await res.json();

    console.log(data);



    // // Convert the videoAsk object to a JSON string
    // const dataStr = JSON.stringify(videoAsk, null, 2);
    // // Create a Blob with the JSON content
    // const blob = new Blob([dataStr], { type: "application/json" });
    // // Create a URL for the blob
    // const url = URL.createObjectURL(blob);
    // // Create a temporary anchor element and trigger the download
    // const link = document.createElement("a");
    // link.download = "videoAsk.json";
    // link.href = url;
    // document.body.appendChild(link); // Append to body to ensure it can be clicked
    // link.click(); // Trigger the download
    // document.body.removeChild(link);
  };

  return (
    <div className="flex justify-center overflow-y-auto my-[10%]">
      <div className="sm:w-[500px] w-[80%] ">
        <div className="mb-4 font-sans font-bold text-lg">
          Create a videoAsk :
        </div>
        <form onSubmit={handleSubmit} className="">
          {videoAsk.map((videoAsk, videoAskIndex) => (
            <div
              key={videoAskIndex}
              className="border border-gray-300 p-4 rounded-md"
            >
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
                      className="border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2 mr-2"
                    />
                    <input
                      type="text"
                      name="next_video_id"
                      value={qst.next_video_id || ""}
                      onChange={(e) =>
                        handleQuestionChange(videoAskIndex, questionIndex, e)
                      }
                      required
                      className="border-gray-500  bg-slate-100 bg-opacity-10 placeholder-gray-800 appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:border-2 focus:border-green-400 focus:-outline mb-2"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        removeQuestion(videoAskIndex, questionIndex)
                      }
                      className="flex justify-center"
                    >
                      <AiOutlineDelete size="25" className="ml-2 mb-2" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => addQuestion(videoAskIndex)}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md  text-sm font-sans text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
              onClick={addVideoAsk}
              className="w-40 text-center hover:bg-green-100 hover:border-green-400 items-center px-4 py-2 border rounded-md text-sm font-sans border-gray-300 text-black"
            >
              Add VideoAsk
            </button>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-40 text-center items-center px-4 py-2 border border-transparent rounded-md  text-sm font-sans text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUploadForm;
