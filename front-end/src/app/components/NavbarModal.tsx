"use client";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";
import SlideRightComponent from "./SlideRightComponent";
import { useAppContext } from "../AppContext";
import Link from "next/link";

const Modal = () => {
  const context = useAppContext();
  const Ref = useRef<HTMLElement>(null);
  const Ref1 = useRef<HTMLElement>(null);
  const Ref2 = useRef<HTMLElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const refs = [Ref, Ref1, Ref2];
    if (!refs.some((ref) => ref.current?.contains(e.target as Node))) {
      context.setDropOpenModal(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="fixed top-14 left-0 text-1xl font-mono font-normal 
      w-screen bg-white h-screen"
    >
      <div
        className="p-4 mx-4 mt-10 rounded-lg flex flex-col 
      justify-between h-[85vh]"
      >
        <ul className="flex flex-col gap-8 justify-center mt-2">
          <li>
            <SlideRightComponent>
              <span className="cursor-pointer">Product</span>
            </SlideRightComponent>
          </li>
          <li ref={Ref as any} className="relative">
            <SlideRightComponent delay={1}>
              <span
                className="cursor-pointer"
                onClick={() => context.setDropOpenModal(1)}
              >
                Solutions
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {context.isDropsOpenModal === 1 && (
                <div
                  className="absolute top-full mt-1 bg-white 
                z-10 shadow-lg rounded-3xl min-w-52"
                >
                  <ul className="py-1">
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Recruitment
                    </li>
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Sales & Marketing
                    </li>
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Other
                    </li>
                  </ul>
                </div>
              )}
            </SlideRightComponent>
          </li>
          <li>
            <SlideRightComponent delay={2}>
              <span className="cursor-pointer">Pricing</span>
            </SlideRightComponent>
          </li>
          <li ref={Ref1 as any} className="relative">
            <SlideRightComponent delay={3}>
              <span onClick={() => context.setDropOpenModal(2)}>
                Examples
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {context.isDropsOpenModal === 2 && (
                <div
                  className="absolute top-full mt-1 z-10 bg-white 
                shadow-lg rounded-3xl min-w-60"
                >
                  <ul className="py-1">
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Templates
                    </li>
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Case Studies
                    </li>
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Inspiration Examples
                    </li>
                  </ul>
                </div>
              )}
            </SlideRightComponent>
          </li>
          <li ref={Ref2 as any} className="relative">
            <SlideRightComponent delay={4}>
              <span
                className="cursor-pointer"
                onClick={() => context.setDropOpenModal(3)}
              >
                Resources
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {context.isDropsOpenModal === 3 && (
                <div
                  className="absolute top-full mt-1 z-10 bg-white 
                shadow-lg rounded-3xl min-w-32"
                >
                  <ul className="py-1">
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Blog
                    </li>
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Community
                    </li>
                    <li
                      className="block px-4 py-2 rounded-full 
                      hover:bg-gray-100 m-2"
                    >
                      Help
                    </li>
                  </ul>
                </div>
              )}
            </SlideRightComponent>
          </li>
        </ul>
        <Link
          href="/login"
          className="inline bg-gray-300 rounded-full px-4 py-2 
        mt-2 w-24"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default Modal;
