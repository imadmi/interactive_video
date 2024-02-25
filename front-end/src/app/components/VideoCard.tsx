import React from "react";
import { IoOpenOutline } from "react-icons/io5";
import { GoShareAndroid } from "react-icons/go";

export default function VideoCard() {
  return (
    <div>
      <div
        className="w-full rounded-md text-white absolute bottom-0 
                right-0 flex items-center h-1 group-hover:h-40 opacity-0 
                group-hover:opacity-100 transition-all duration-300"
      >
        <div
          className="w-full h-full rounded-md bg-gray-400
                bg-opacity-40 backdrop-blur-lg flex justify-center items-center"
        >
          <div className="flex flex-row items-center">
            <IoOpenOutline
              className="text-gray-800 m-2 hover:text-gray-400 
            "
              size="25"
            />
            <div className="border-r border-gray-500 h-8" />
            <GoShareAndroid
              className="text-gray-800 m-2 hover:text-gray-400 
            "
              size="25"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
