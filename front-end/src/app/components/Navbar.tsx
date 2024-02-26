"use client";
import { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { User, useAppContext } from "../AppContext";
import Logo from "./Logo";
import NavbarList from "./NavbarList";
import NavbarUser from "./NavbarUser";

const Navbar = () => {
  const context = useAppContext();
  const Ref = useRef<HTMLElement>(null);
  const Ref1 = useRef<HTMLElement>(null);
  const Ref2 = useRef<HTMLElement>(null);
  const Ref3 = useRef<HTMLElement>(null);

  const handleClickOutside = (e: MouseEvent) => {
    const refs = [Ref, Ref1, Ref2, Ref3];
    if (!refs.some((ref) => ref.current?.contains(e.target as Node))) {
      context.setDropOpen(0);
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
        <nav
          className=" text-black  sticky z-50 top-0 inset-x-0 
        flex justify-between items-center lg:px-8 bg-white h-14"
        >
          <Logo />
          <NavbarList NavbarRef={Ref} NavbarRef1={Ref1} NavbarRef2={Ref2} />
          <div className="lg:hidden flex bg-white flex-grow h-12" />

          <NavbarUser NavbarRef={Ref3} />
        </nav>
      )}
    </>
  );
};

export default Navbar;
