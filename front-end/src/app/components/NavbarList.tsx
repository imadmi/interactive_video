import { useEffect, useRef } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { useAppContext } from "../AppContext";

interface NavbarListProps {
  NavbarRef: React.RefObject<HTMLElement>;
  NavbarRef1: React.RefObject<HTMLElement>;
  NavbarRef2: React.RefObject<HTMLElement>;
}

const NavbarList: React.FC<NavbarListProps> = ({
  NavbarRef,
  NavbarRef1,
  NavbarRef2,
}) => {
  const context = useAppContext();

  return (
    <>
      <ul
        className="hidden lg:flex flex-grow gap-8 text-[15px] font-sans 
      items-center justify-center bg-white h-12"
      >
        <li>
          <span className="">Product</span>
        </li>
        <li ref={NavbarRef as any} className="relative cursor-pointer">
          <span onClick={() => context.setDropOpen(1)}>
            Solutions
            <IoIosArrowDown className="inline ml-1" size="18" />
          </span>
          {context.isDropsOpen === 1 && (
            <div
              className="absolute top-full mt-1 bg-white shadow-lg 
            rounded-3xl min-w-48"
            >
              <ul className="py-1">
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Recruitment
                  </div>
                </li>
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Sales & Marketing
                  </div>
                </li>
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Other
                  </div>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li>
          <span className="">Pricing</span>
        </li>
        <li ref={NavbarRef1 as any} className="relative cursor-pointer">
          <span className="" onClick={() => context.setDropOpen(2)}>
            Examples
            <IoIosArrowDown className="inline ml-1" size="18" />
          </span>
          {context.isDropsOpen === 2 && (
            <div
              className="absolute top-full mt-1 bg-white shadow-lg 
            rounded-3xl min-w-52"
            >
              <ul className="py-1">
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Templates
                  </div>
                </li>
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Case Studies
                  </div>
                </li>
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Inspiration Examples
                  </div>
                </li>
              </ul>
            </div>
          )}
        </li>
        <li ref={NavbarRef2 as any} className="relative cursor-pointer">
          <span className="" onClick={() => context.setDropOpen(3)}>
            Resources
            <IoIosArrowDown className="inline ml-1" size="18" />
          </span>
          {context.isDropsOpen === 3 && (
            <div
              className="absolute top-full mt-1 bg-white shadow-lg 
            rounded-3xl min-w-32"
            >
              <ul className="py-1">
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Blog
                  </div>
                </li>
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Community
                  </div>
                </li>
                <li className="">
                  <div
                    className="block px-4 py-2 rounded-full 
                  hover:bg-gray-100 m-2"
                  >
                    Help
                  </div>
                </li>
              </ul>
            </div>
          )}
        </li>
      </ul>
    </>
  );
};

export default NavbarList;
