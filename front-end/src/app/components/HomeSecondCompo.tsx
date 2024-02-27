import Image from "next/image";
import companies from "../../../public/companies.png";
import companies1 from "../../../public/companies1.png";
import companies2 from "../../../public/companies2.png";
import companies3 from "../../../public/companies3.png";
import companies4 from "../../../public/companies4.png";
import SlideUpComponent from "./SlideUpComponent";
import HomeCards from "./HomeCards";
import VideoHomeCard from "./VideoHomeCard";

export default function HomeSecondCompo() {
  return (
    <>
      <SlideUpComponent>
        <div className="text-center p-[24px] ">
          <Image
            src={companies}
            alt="companies"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies1}
            alt="companies1"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies2}
            alt="companies2"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies3}
            alt="companies3"
            className="w-[140px] m-[24px] inline"
          />
          <Image
            src={companies4}
            alt="companies4"
            className="w-[140px] m-[24px] inline"
          />
        </div>
      </SlideUpComponent>
      <SlideUpComponent
        className="flex flex-col lg:flex-row w-full px-[7%] 
  space-x-5 lg:justify-evenly mt-10 items-center"
      >
        <HomeCards
          img="/Group_2.png"
          title="Recruitment"
          details="Streamline the recruitment process with asynchronous 
      interviews, easy scheduling, and tagging."
          linkTo="Learn more"
        />
        <HomeCards
          img="/Group_1.png"
          title="Sales & Marketing"
          details="Establish a bond with your audience from the get-go. 
      VideoAsk lets you gather contact info and capture leads with ease."
          linkTo="Find out how"
        />
        <HomeCards
          img="/Group_3.png"
          title="More Solutions"
          details="One tool, endless possibilities—use VideoAsk for research 
      and feedback, training, and customer support."
          linkTo="Check it out"
        />
      </SlideUpComponent>
      <SlideUpComponent className="p-[10%] text-center text-3xl lg:px-[20%]">
        Scale your high touch communication with asynchronous, interactive video
      </SlideUpComponent>
      <SlideUpComponent>
        <VideoHomeCard
          videoSrc="/videos/homeVideo.mp4"
          title="Gather better data with video forms"
          details="Collecting data has never been easier. Video forms let you 
      collect valuable contact details and feedback in an engaging, 
      interactive, and personal way."
          linkto="See how"
          order={false}
        />{" "}
      </SlideUpComponent>
      <SlideUpComponent>
        <VideoHomeCard
          videoSrc="/videos/homeVideo1.mp4"
          title="Save time with async interviews"
          details="Free up your calendar without losing that human touch. 
      Async interviews let you enhance the candidate experience at scale."
          linkto="Lear more"
          order={true}
        />{" "}
      </SlideUpComponent>
      <SlideUpComponent>
        <VideoHomeCard
          videoSrc="/videos/homeVideo2.mp4"
          title="Be there for your audience 24/7"
          details="Never miss another opportunity to engage. AI-powered video 
      chatbots get you face to face with your audience, any time."
          linkto="Try it now"
          order={false}
        />
      </SlideUpComponent>
    </>
  );
}
