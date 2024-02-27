type VideoHomeCardProps = {
  videoSrc: string;
  title: string;
  details: string;
  linkto: string;
  order: boolean;
};

const VideoHomeCard = (props: VideoHomeCardProps) => {
  return (
    <div
      className={`w-full py-[5%] px-[10%] flex items-center flex-col-reverse 
    ${props.order === false ? "lg:flex-row" : "lg:flex-row-reverse"}`}
    >
      <div className="w-full flex items-center">
        <video className="w-full rounded-[40px]" autoPlay loop muted>
          <source src={props.videoSrc} type="video/mp4" />
        </video>
      </div>
      <div
        className={`w-full lg:w-full sm:w-[500px]  ${
          props.order === false
            ? "lg:pl-[15%] lg:pr-[5%]"
            : "lg:pl-[1%] lg:pr-[15%]"
        }
        lg:pl-[15%] lg:pr-[5%] flex flex-col 
        items-center lg:block text-center lg:text-start`}
      >
        <div className="font-sans text-5xl ">{props.title}</div>
        <div className="my-6 text-lg">{props.details}</div>
        <button className="my-7 text-xl bg-stone-300 py-5 px-7 rounded-full w-auto">
          {props.linkto}
        </button>
      </div>
    </div>
  );
};

export default VideoHomeCard;
