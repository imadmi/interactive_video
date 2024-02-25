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
import Modal from "./NavbarModal";
import { motion, AnimatePresence } from "framer-motion";
import toast from "react-hot-toast";
import { User, useAppContext } from "../AppContext";
import { constants } from "http2";

const Navbar = () => {
  const context = useAppContext();

  const [isDropsOpen, setSolutionsOpen] = useState(0);
  const [isModalOpen, setisModalOpen] = useState(false);
  const solutionsRef = useRef(null);
  const solutionsRef1 = useRef(null);
  const solutionsRef2 = useRef(null);
  const solutionsRef3 = useRef(null);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      (solutionsRef.current &&
        !(solutionsRef.current as any).contains(e.target as Node) &&
        !(solutionsRef1.current as any).contains(e.target as Node) &&
        !(solutionsRef2.current as any).contains(e.target as Node) &&
        !(solutionsRef3.current as any).contains(e.target as Node)) ||
      (solutionsRef1.current &&
        !(solutionsRef.current as any).contains(e.target as Node) &&
        !(solutionsRef1.current as any).contains(e.target as Node) &&
        !(solutionsRef2.current as any).contains(e.target as Node) &&
        !(solutionsRef3.current as any).contains(e.target as Node)) ||
      (solutionsRef2.current &&
        !(solutionsRef.current as any).contains(e.target as Node) &&
        !(solutionsRef1.current as any).contains(e.target as Node) &&
        !(solutionsRef2.current as any).contains(e.target as Node) &&
        !(solutionsRef3.current as any).contains(e.target as Node)) ||
      (solutionsRef3.current &&
        !(solutionsRef.current as any).contains(e.target as Node) &&
        !(solutionsRef1.current as any).contains(e.target as Node) &&
        !(solutionsRef2.current as any).contains(e.target as Node) &&
        !(solutionsRef3.current as any).contains(e.target as Node))
    ) {
      setSolutionsOpen(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const checkJwtCookie = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}:3001/user`,
          {
            method: "GET",
            credentials: "include",
          }
        );
        var data = await response.json();
        if (data.succes === false) {
          return;
        }
        if (data.user !== null) {
          const user: User = {
            id: data.user.id,
            email: data.user.email,
            name: data.user.name,
          };
          context.setUser(user);
        }
      } catch (error: any) {
        const msg = "Error during login" + error.message;
        toast.error(msg);
      }
    };
    checkJwtCookie();
  }, []);

  return (
    <>
      {!context.isModalOpen && (
        <nav className=" text-black  sticky z-50 top-0 inset-x-0 flex justify-between items-center lg:px-8 bg-white h-14">
          <div className="text-base  font-sans">
            <Link href="/" className="hidden lg:block ">
              <Image
                src={logo}
                alt="Videoask by Typeform"
                priority={true}
                width={500}
                height={500}
                className="h-12 w-full "
              />
            </Link>
            <Link href="/" className="block lg:hidden">
              <Image
                src={logo_sm}
                alt="Videoask by Typeform"
                priority={true}
                width={500}
                height={500}
                className="h-12 w-auto "
              />
            </Link>
          </div>
          <ul className="hidden lg:flex flex-grow gap-8 text-[15px] font-sans items-center justify-center bg-white h-12">
            <li>
              <Link href="/Product">
                <span className="">Product</span>
              </Link>
            </li>
            <li ref={solutionsRef} className="relative">
              <span
                className="cursor-pointer"
                onClick={() => setSolutionsOpen(1)}
              >
                Solutions
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {isDropsOpen === 1 && (
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
            <li ref={solutionsRef1} className="relative">
              <span className="" onClick={() => setSolutionsOpen(2)}>
                Examples
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {isDropsOpen === 2 && (
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
            <li ref={solutionsRef2} className="relative">
              <span className="" onClick={() => setSolutionsOpen(3)}>
                Resources
                <IoIosArrowDown className="inline ml-1" size="18" />
              </span>
              {isDropsOpen === 3 && (
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
          <div className="lg:hidden flex bg-white flex-grow h-12" />

          <div className="relative flex flex-row gap-2 mr-6 text-[15px] bg-white items-center mt-2 justify-end h-12">
            {context.user === null && (
              <>
                <Link
                  href="/login"
                  className="hidden lg:inline bg-gray-300 rounded-full px-4 py-2 mt-2 mr-2"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="bg-black text-white rounded-full px-4 py-2 mt-2"
                >
                  Sign up
                </Link>
              </>
            )}
            {context.user !== null && (
              <div ref={solutionsRef3}>
                <button
                  onClick={() => setSolutionsOpen(4)}
                  className="bg-black text-white rounded-full px-4 py-2"
                >
                  {context.user.name}
                </button>
                {isDropsOpen === 4 && (
                  <div className="absolute top-full right-0 mt-1 bg-white shadow-lg rounded-3xl min-w-32">
                    <ul className="py-1">
                      <li className="">
                        <Link href={`/profile/${context.user.id}`}>
                          <div className="block px-4 py-2 rounded-full hover:bg-gray-100 m-2">
                            Profile
                          </div>
                        </Link>
                      </li>
                      <li className="w-full ">
                        <Link
                          href={`${process.env.NEXT_PUBLIC_API_URL}:3001/auth/logout`}
                          className="w-full"
                        >
                          <div className="block w-[88%] px-4 py-2 text-start rounded-full hover:bg-red-100 m-2">
                            Log out
                          </div>
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            <div className="flex justify-center items-center lg:hidden">
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Modal />
                  </motion.div>
                )}
              </AnimatePresence>
              {!isModalOpen && (
                <div
                  className="bg-slate-200 rounded-full p-1"
                  onClick={() => setisModalOpen(true)}
                >
                  <IoReorderThreeOutline size="30" />
                </div>
              )}
              {isModalOpen && (
                <div
                  className="bg-slate-200 rounded-full p-1 h-10 w-10 flex justify-center items-center"
                  onClick={() => setisModalOpen(false)}
                >
                  <VscChromeClose size="20" />
                </div>
              )}
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
