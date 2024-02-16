"use client";
import Image from "next/image";
import Link from "next/link";
import icon from "../../../public/icon.jpeg";
import logo from "../../../public/logo.png";
import logo_sm from "../../../public/logo_sm.png";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import { IoReorderThreeOutline } from "react-icons/io5";
import { VscChromeClose } from "react-icons/vsc";
import SlideRightComponent from "./SlideRightComponent";

const Modal = () => {
  const [isDropsOpen, setSolutionsOpen] = useState(0);
  const solutionsRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      solutionsRef.current &&
      !(solutionsRef.current as unknown as Node).contains(event.target as Node)
    ) {
      setSolutionsOpen(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [solutionsRef]);
  return (
    <div
      className="fixed top-12 left-0 text-1xl font-mono font-normal w-screen bg-white 
    "
    >
      <div className="p-4 mx-4 mt-10 rounded-lg flex flex-col justify-between h-[90vh]">
        <ul className="flex flex-col gap-8 justify-center mt-2">
          <li>
            <SlideRightComponent >
              <Link href="/Product">
                <span className="">Product</span>
              </Link>
            </SlideRightComponent>
          </li>
          <li ref={solutionsRef} className="relative">
            <SlideRightComponent delay={1}>
              <span
                className="cursor-pointer"
                onClick={() => setSolutionsOpen(1)}
              >
                Solutions
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {isDropsOpen === 1 && (
                <div className="absolute top-full mt-1 bg-white z-10 shadow-lg rounded-3xl min-w-52">
                  <ul className="py-1">
                    <li className="">
                      <Link href="/recruitment">
                        <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                          Recruitment
                        </div>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/sales-marketing">
                        <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                          Sales & Marketing
                        </div>
                      </Link>
                    </li>
                    <li className="">
                      <Link href="/other">
                        <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                          Other
                        </div>
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </SlideRightComponent>
          </li>
          <li>
          <SlideRightComponent delay={2}>


            <Link href="/Pricing">
              <span className="">Pricing</span>
            </Link>
          </SlideRightComponent>
          </li>
          <li ref={solutionsRef} className="relative">
          <SlideRightComponent delay={3}>


            <span className="" onClick={() => setSolutionsOpen(2)}>
              Examples
              <IoIosArrowDown className="inline ml-1" size="18" />
            </span>
            {isDropsOpen === 2 && (
              <div className="absolute top-full mt-1 z-10 bg-white shadow-lg rounded-3xl min-w-60">
                <ul className="py-1">
                  <li className="">
                    <Link href="/templates">
                      <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                        Templates
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/case-studies">
                      <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                        Case Studies
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/examples">
                      <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                        Inspiration Examples
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            </SlideRightComponent>
          </li>
          <li ref={solutionsRef} className="relative">
          <SlideRightComponent delay={4}>


            <span className="" onClick={() => setSolutionsOpen(3)}>
              Resources
              <IoIosArrowDown className="inline ml-1" size="18" />
            </span>
            {isDropsOpen === 3 && (
                <div className="absolute top-full mt-1 z-10 bg-white shadow-lg rounded-3xl min-w-32">
                <ul className="py-1">
                  <li className="">
                    <Link href="/blog">
                      <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                        Blog
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/community">
                      <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                        Community
                      </div>
                    </Link>
                  </li>
                  <li className="">
                    <Link href="/help">
                      <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                        Help
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            </SlideRightComponent>
          </li>
        </ul>
        <button className="inline bg-gray-300 rounded-full px-4 py-2 mt-2 w-24">
          Log in
        </button>
      </div>
    </div>
  );
};

export default Modal;
