"use client";
import Image from "next/image";
import Link from "next/link";
import icon from "../../../public/icon.jpeg";
import logo from "../../../public/logo.png";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

const Navbar = () => {
  const [isSolutionsOpen, setSolutionsOpen] = useState(0);
  const solutionsRef = useRef(null); // Ref for the solutions dropdown

  const toggleSolutions = () => {
    setSolutionsOpen(0);
  };

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
    <nav className=" text-black  sticky z-50 top-0 inset-x-0 flex justify-between items-center mx-8">
      <div className="text-base  font-sans">
        <Link href="/">
          <Image
            src={logo}
            alt="Videoask by Typeform"
            priority={true}
            className="h-12 w-auto "
          />
        </Link>
      </div>
      <ul className="hidden lg:flex gap-8 text-[15px] font-sans justify-center mt-2">
        <li>
          <Link href="/Product">
            <span className="">Product</span>
          </Link>
        </li>
        <li ref={solutionsRef} className="relative">
          <span className="cursor-pointer" onClick={() => setSolutionsOpen(1)}>
            Solutions
            <IoIosArrowDown className="inline ml-1" size="18" />
          </span>
          {isSolutionsOpen === 1 && (
            <div className="absolute top-full mt-1 bg-white shadow-lg rounded-3xl min-w-48">
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
        </li>
        <li>
          <Link href="/Pricing">
            <span className="">Pricing</span>
          </Link>
        </li>
        <li>
          <span className="" onClick={() => setSolutionsOpen(2)}>
            Examples
            <IoIosArrowDown className="inline ml-1" size="18" />
          </span>
          {isSolutionsOpen === 2 && (
            <div className="absolute top-full mt-1 bg-white shadow-lg rounded-3xl min-w-48">
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
        </li>
        <li>
          <span className="" onClick={() => setSolutionsOpen(3)}>
            Resources
            <IoIosArrowDown className="inline ml-1" size="18" />
          </span>
          {isSolutionsOpen === 3 && (
            <div className="absolute top-full mt-1 bg-white shadow-lg rounded-3xl min-w-32">
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
        </li>
      </ul>
      <div className="flex flex-row gap-2 mr-6 text-[15px]">
        <button className="hidden lg:inline bg-gray-300 rounded-full px-4 py-2 mt-2">
          Log in
        </button>
        <button className=" bg-black text-white rounded-full px-4 py-2 mt-2">
          Sign up
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
