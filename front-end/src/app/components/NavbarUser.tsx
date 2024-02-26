import React from "react";
import { useAppContext } from "../AppContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NvabarModalButton from "./NvabarModalButton";

interface NavbarListProps {
  NavbarRef: React.RefObject<HTMLElement>;
}

const NavbarUser: React.FC<NavbarListProps> = ({ NavbarRef }) => {
  const context = useAppContext();
  const path = usePathname();

  return (
    <>
      <div
        className="relative flex flex-row gap-2 mr-6 text-[15px] bg-white 
      items-center mt-2 justify-end h-12"
      >
        {context.user === null && (
          <>
            <Link
              href="/login"
              className="hidden lg:inline bg-gray-300 rounded-full px-4 py-2 
              mt-2 mr-2"
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
          <div ref={NavbarRef as any}>
            <button
              onClick={() => context.setDropOpen(4)}
              className="bg-black text-white rounded-full px-4 py-2"
            >
              {context.user.name}
            </button>
            {context.isDropsOpen === 4 && (
              <div
                className="absolute top-full right-0 mt-1 bg-white shadow-lg 
                rounded-3xl min-w-32"
              >
                <ul className="py-1">
                  <li className="">
                    {path.split("/")[1] === "profile" ? (
                      <Link href={`/dashboard`}>
                        <div
                          className="block px-4 py-2 rounded-full 
                        hover:bg-gray-100 m-2"
                        >
                          dashboard
                        </div>
                      </Link>
                    ) : (
                      <Link href={`/profile/${context.user.id}`}>
                        <div
                          className="block px-4 py-2 rounded-full 
                        hover:bg-gray-100 m-2"
                        >
                          Profile
                        </div>
                      </Link>
                    )}
                  </li>
                  <li className="w-full ">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_API_URL}:3001/auth/logout`}
                      className="w-full"
                    >
                      <div
                        className="block w-[88%] px-4 py-2 text-start rounded-full 
                         hover:bg-red-100 m-2"
                      >
                        Log out
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
        <NvabarModalButton />
      </div>
    </>
  );
};

export default NavbarUser;
