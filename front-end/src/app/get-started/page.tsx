"use client";

import { useEffect, useRef, useState } from "react";
import { mockData } from "./mockData";
import VideoAskComponent from "../components/VideoAskComponent";


const Page = () => {
  return (
    <div>
      <VideoAskComponent
        mockData={mockData}
        routedTo="/dashboard"
        buttonLink="/dashboard"
      />
    </div>
  );
};

export default Page;
