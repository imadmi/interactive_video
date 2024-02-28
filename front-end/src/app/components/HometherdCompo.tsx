import SlideUpComponent from "./SlideUpComponent";

export default function HometherdCompo() {
  return (
    <SlideUpComponent
      className="bg-[#F2F2F2] w-full flex flex-col lg:flex-row 
        px-[5%] lg:pl-[5%] mt-20 lg:rounded-[100px] rounded-[50px]"
    >
      <div
        className="text-center lg:text-start mt-10 lg:mt-0 
      lg:w-[35%] flex flex-col lg:justify-center items-center"
      >
        <h2 className="w-full sm:w-96 lg:w-full text-5xl font-sans mb-5">
          Make it part of your workflow
        </h2>
        <div className="w-full sm:w-96 lg:w-full text-xl ">
          Connect VideoAsk to over 1,500 applications through Zapier, 
          or use our API and
          <span
            className="border-b-2 border-blue-500 text-blue-500 
          cursor-pointer"
          >
            webhooks
          </span>
          .
        </div>
      </div>
      <div className="lg:w-[60%] bg-green-200 lg:my-8">
        <img src="workFlow.png" alt="companies" className="w-full bg-cover" />
      </div>
    </SlideUpComponent>
  );
}
