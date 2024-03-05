import React from "react";
import { useAppContext } from "../AppContext";

export default function TitleComponent() {
  const context = useAppContext();

  return (
    <>
      <div
        className="absolute top-24 left-5 text-gray-100 font-sans 
      text-6xl w-[90%]"
      >
        {context.videoAsk.title}
      </div>
    </>
  );
}
