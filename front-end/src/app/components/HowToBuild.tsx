"use client";
import { FaPlus } from "react-icons/fa6";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type HowToBuildcardProps = {
  isVisible: boolean;
  card: {
    title: string;
    description: string;
  };
  url?: string;
};

const HowToBuild = () => {
  const [cardtoshow, setCardtoshow] = useState<number>(0);
  const [videourl, setvideourl] = useState("");
  const cards = [
    {
      title: "01. Record once",
      description:
        "Find a great light source, angle, and talking points. Record directly in-app or upload pre-recorded videos.",
    },
    {
      title: "02. Choose",
      description:
        "With 9 answer types, viewers can respond with text, audio, and video. They can also reply to actions including easy scheduling, payment, opinion scale, and file upload.",
    },
    {
      title: "03. Build",
      description:
        "Make every conversation relevant and automate segmenting with our choose-your-own-adventure style builder.",
    },
    {
      title: "04. Share",
      description:
        "Easily share your videoask as a URL link anywhere, embedded in an email, or on your website as a widget or iframe.",
    },
    {
      title: "05. Streamline",
      description:
        "With your videoask all set up, you can skip the tedious tasks and jump straight into meaningful work.",
    },
  ];

  return (
    <div className="bg-[#131313] md:rounded-[100px] rounded-[50px] text-white font-sans font-light px-4 py-12 sm:p-12 sm:px-40">
      <div className="flex items-center justify-center ">
        <h1 className="sm:text-5xl text-4xl">Easy to build. Code free.</h1>
      </div>
      <div className="flex flex-col md:items-center justify-start items-start md:justify-center mt-12 w-full">
        <div className="flex md:items-center justify-start items-start md:justify-center  w-full ">
          <button
            onClick={() => setCardtoshow(0)}
            className="text-[#777777] text-lg  w-full text-start"
          >
            {!(cardtoshow === 0) && (
              <div className="w-full hover:bg-slate-200 rounded-full py-5">
                <FaPlus size="18" className="inline mr-3 mb-1 " />
                01.&nbsp;Record once
              </div>
            )}
            {cardtoshow === 0 && (
              <HowToBuildcard
                isVisible={cardtoshow === 0}
                card={cards[0]}
                url="/videos/howtobuild.mp4"
              />
            )}
          </button>
        </div>
        <div className={`flex md:items-center justify-start items-start md:justify-center w-full`}>
          <button
            onClick={() => setCardtoshow(1)}
            className="text-[#777777] text-lg  w-full text-start"
          >
            {!(cardtoshow === 1) && (
              <div className="w-full hover:bg-slate-200 rounded-full py-5">
                <FaPlus size="18" className="inline mr-3 mb-1 " />
                02.&nbsp;Choose
              </div>
            )}
            {cardtoshow === 1 && (
              <HowToBuildcard
                isVisible={cardtoshow === 1}
                card={cards[1]}
                url="/videos/howtobuild1.mp4"
              />
            )}
          </button>
        </div>
        <div className={`flex md:items-center justify-start items-start md:justify-center w-full`}>
          <button
            onClick={() => setCardtoshow(2)}
            className="text-[#777777] text-lg  w-full text-start"
          >
            {!(cardtoshow === 2) && (
              <div className="w-full hover:bg-slate-200 rounded-full py-5">
                <FaPlus size="18" className="inline mr-3 mb-1 " />
                03.&nbsp;Build
              </div>
            )}
            {cardtoshow === 2 && (
              <HowToBuildcard
                isVisible={cardtoshow === 2}
                card={cards[2]}
                url="/videos/howtobuild2.mp4"
              />
            )}
          </button>
        </div>
        <div className={`flex md:items-center justify-start items-start md:justify-center w-full`}>
          <button
            onClick={() => setCardtoshow(3)}
            className="text-[#777777] text-lg  w-full text-start"
          >
            {!(cardtoshow === 3) && (
              <div className="w-full hover:bg-slate-200 rounded-full py-5">
                <FaPlus size="18" className="inline mr-3 mb-1 " />
                04.&nbsp;Share
              </div>
            )}
            {cardtoshow === 3 && (
              <HowToBuildcard
                isVisible={cardtoshow === 3}
                card={cards[3]}
                url="/videos/howtobuild3.mp4"
              />
            )}
          </button>
        </div>
        <div className={`flex md:items-center justify-start items-start md:justify-center w-full`}>
          <button
            onClick={() => setCardtoshow(4)}
            className="text-[#777777] text-lg  w-full text-start"
          >
            {!(cardtoshow === 4) && (
              <div className="w-full hover:bg-slate-200 rounded-full py-5">
                <FaPlus size="18" className="inline mr-3 mb-1 " />
                05.&nbsp;Streamline
              </div>
            )}
            {cardtoshow === 4 && (
              <HowToBuildcard
                isVisible={cardtoshow === 4}
                card={cards[4]}
                url="/videos/howtobuild4.mp4"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const HowToBuildcard = ({ isVisible, card, url }: HowToBuildcardProps) => {
  return (
    <div>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white text-black font-sans p-4 rounded-3xl w-full my-2"
          >
            <div className="text-lg text-start font-semibold">{card.title}</div>
            <div className="text-start text-base">{card.description}</div>
            <video className="w-full my-4 rounded-[50px]" autoPlay loop muted>
              <source src={url} type="video/mp4" />
            </video>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HowToBuild;
