import React from "react";
import { useAppContext } from "../AppContext";

const QuestionList = ({
  handleQuestionClick,
  toggleAnimation,
  triggerBlink,
}: any) => {
  const context = useAppContext();

  const handleClickingQST = (
    event: any,
    next_video_id: string | null,
    index: number
  ) => {
    event.stopPropagation();
    handleQuestionClick(next_video_id);
    context.setIsPaused(false);
    toggleAnimation();
    triggerBlink();
    context.setClickedButtonIndex(index);
    context.setUpdatedCurrentTime(0);
    context.setPlaybackSpeed(1);
  };

  return (
    <div
      className={`${
        context.isFullscrean ? "lg:hidden" : "block"
      } lg:relative lg:w-1/2 absolute bottom-0 w-full lg:max-h-[100%] min-h-0
           max-h-[50%] text-center overflow-y-auto`}
      style={{
        animation: context.animate ? "swipeUp 0.3s ease-in forwards" : "",
      }}
    >
      <div className="flex flex-col items-center mb-4">
        <h3
          className="font-thin font-sans mb-3 lg:font-normal text-gray-300
       lg:text-gray-700 text-md lg:mb-3"
        >
          Choose 1 of {context.videoAsk.questions.length} options
        </h3>
        {context.videoAsk && context.videoAsk.questions && (
          <>
            {context.videoAsk.questions.map((question, index) => (
              <button
                className="flex flex-row items-center text-left lg:w-4/6 md:w-3/6 
            w-[90%] mb-2 lg:mb-3 p-3 bg-black bg-opacity-55 lg:text-black 
            lg:bg-opacity-10 lg:border border-2 border-gray-700 border-opacity-5 
            hover:border-opacity-100 hover:border-violet-600 text-white py-2 
            px-4 rounded-full font-semibold font-sans"
                key={index}
                // onClick={(event) => {
                //   event.stopPropagation();
                //   handleQuestionClick(question.next_video_id);
                //   context.setIsPaused(false);
                //   toggleAnimation();
                //   triggerBlink();
                //   context.setClickedButtonIndex(index);
                //   context.setUpdatedCurrentTime(0);
                //   context.setPlaybackSpeed(1);
                // }}
                onClick={(e) =>
                  handleClickingQST(e, question.next_video_id, index)
                }
                style={{
                  animation:
                    context.blink && context.clickedButtonIndex === index
                      ? "blink 0.5s linear"
                      : "",
                }}
              >
                <div
                  className="bg-violet-600 bg-opacity-80 font-mono font-thin 
              text-sm w-8 h-8 rounded-full text-center flex items-center justify-center
              mr-3 lg:text-white"
                >
                  {index + 1}
                </div>
                <div className="inline">{question.question}</div>
              </button>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
