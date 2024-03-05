import React from "react";
import { MdCloudUpload } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";
import { useAppContext } from "../AppContext";

export default function UploadVideo() {
  const context = useAppContext();
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

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    if (e.dataTransfer.items[0].kind === "file") {
      const file = e.dataTransfer.items[0].getAsFile();
      handelUpload(e, file);
    }
  };

  return (
    <div>
      <div
        className="fixed inset-0 w-screen h-screen bg-gray-500 flex items-center 
                justify-center bg-opacity-40 backdrop-blur-lg"
      >
        <div className="relative w-[450px] h-96 bg-white rounded-[40px] p-4 z-10">
          <button
            onClick={() => context.setisModalOpen(false)}
            className="absolute top-4 right-9"
          >
            <IoClose className="my-3 text-gray-600" size="23" />
          </button>
          <div className="font-bold text-lg ml-7 my-3">Upload a video</div>
          <div
            className="border-dashed border-4 m-4 h-[80%] border-gray-300 rounded-[40px]
                    flex flex-col items-center justify-center space-y-2"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <MdCloudUpload className="text-cyan-400" size="60" />
            <div className=" text-xl font-sans">Drag a video to upload</div>
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
    </div>
  );
}
