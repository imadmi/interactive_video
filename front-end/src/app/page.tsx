"use client";
import Image from "next/image";
import SlideUpComponent from "./components/SlideUpComponent";
import Link from "next/link";
import { AppProvider } from "./AppContext";
import companies from "../../public/companies.png";
import companies1 from "../../public/companies1.png";
import companies2 from "../../public/companies2.png";
import companies3 from "../../public/companies3.png";
import companies4 from "../../public/companies4.png";
import HowToBuild from "./components/HowToBuild";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import HomeFisrCompo from "./components/HomeFisrCompo";
import HomeCards from "./components/HomeCards";

export default function Home() {
  return (
    <AppProvider>
      <div className="">
        <Navbar />
        <HomeFisrCompo />

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
          Scale your high touch communication with asynchronous, interactive
          video
        </SlideUpComponent>
        <SlideUpComponent>
          <HowToBuild />
        </SlideUpComponent>
        <Footer />
      </div>
    </AppProvider>
  );
}
