"use client";

import { useAppContext } from "@/app/AppContext";
import VideoAskComponent from "@/app/components/VideoAskComponent";
import { use, useEffect, useRef, useState } from "react";

const Page = (param: any) => {
  const context = useAppContext();

  console.log(param.params.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:3001/getVideoAsk/${param.params.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.error("Fetching error:", response);
        }

        const data = await response.json();
        context.setvideoAsk(data);
        console.log(data);
        // Handle the data as needed, e.g., setting it to state
      } catch (error) {
        console.error("Fetching error:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  return (
    <div className="w-screen bg-red-400">
      <VideoAskComponent
        // mockData={mockData}
        routedTo="/dashboard"
        // buttonLink="/dashboard"
      />
    </div>
  );
};

export default Page;
