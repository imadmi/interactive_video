import Link from "next/link";
import SlideUpComponent from "./components/SlideUpComponent";

export default function NotFound() {
  return (
    <div className="h-[90vw] w-full text-black flex flex-col items-center justify-center">
        <div className="flex flex-row">
          <SlideUpComponent>
            <h2 className="m-4 font-mono">404</h2>
          </SlideUpComponent>
          <div className="border border-r border-slate-400" />
          <SlideUpComponent>
            <p className="m-4">Could not find the requested resource</p>
          </SlideUpComponent>
        </div>
      <SlideUpComponent>
        <Link href="/" className="text-xl block m-4 hover:font-semibold hover:text-gray-800">
          <div className="block font-semibold">Return Home</div>
        </Link>
      </SlideUpComponent>
    </div>
  );
}
