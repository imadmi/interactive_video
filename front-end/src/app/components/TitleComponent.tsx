import React, { useEffect, useState } from "react";
import { useAppContext } from "../AppContext";
import { IoMdClose } from "react-icons/io";

export default function TitleComponent() {
  const context = useAppContext();
  const [istitleVisible, setistitleVisible] = useState(true);

  useEffect(() => {
    if (context.videoAsk.title) {
      setistitleVisible(true);
    }
  }, [context.videoAsk.title]);

  return (
    <>
      {istitleVisible && context.videoAsk.title && (
        <div
          className="absolute top-24 left-5 text-gray-100 font-sans max-w-full lg:w-[45%]
        text-6xl w-[90%] z-10 flex flex-col drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]
        "
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            {context.videoAsk.title}
          </div>
          <IoMdClose
            className="block text-white mt-3 ml-3 hover:rounded-full 
          hover:bg-slate-200 hover:text-black p-2 hover:bg-opacity-80"
            size="40"
            onClick={() => setistitleVisible(false)}
          />
        </div>
      )}
    </>
  );
}
