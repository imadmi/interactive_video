import React from "react";

type Props = {
  img: string;
  title: string;
  details: string;
  linkTo: string;
};

const HomeCards = ({ img, title, details, linkTo }: Props) => {
  return (
    <div className="w-full sm:w-[500px] lg:w-[30%]">
      <div className="flex justify-center items-center w-full h-[350px] ">
        <img
          src={img}
          alt={title}
          className="object-cover w-full h-full rounded-[45px]"
        />
      </div>
      <div className="text-center">
        <h2 className="text-2xl my-7 font-mono">{title}</h2>
        <div className="px-3 text-sm">{details}</div>
        <button className="my-7 text-xl bg-stone-300 py-5 px-7 rounded-full">
          {linkTo}
        </button>
      </div>
    </div>
  );
};

export default HomeCards;
