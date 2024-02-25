"use client";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useAppContext } from "../../AppContext";
import VidesGallery from "@/app/components/VidesGallery";

export const VideoUploadForm = () => {
  const context = useAppContext();

  return (
    <div className="w-full flex flex-col items-center justify-center
     ">
      <div className="font-bold text-2xl h-20 mt-12">Your videoAsks :</div>
      <VidesGallery />
    </div>
  );
};

export default VideoUploadForm;
