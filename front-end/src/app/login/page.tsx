"use client";
import Link from "next/link";
import { useState } from "react";
import logo from "../../../public/logo.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [errormsg, seterrormsg] = useState("");

  const router = useRouter();

  const handleemail = async (e: any) => {
    e.preventDefault();

    if (email.trim().length == 0) {
      seterrormsg('Enter your mail');
      return;
    }

    if (password.trim().length > 30 || password.trim().length < 8) {
      seterrormsg('Wrong password');
      return;
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}:3001/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',

          
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await res.json();

      if (data.succes === true) {
        return router.push(`/dashboard`);
      } else if (data.succes === false) {
        seterrormsg(data.message);
      }
    } catch (e) {
      seterrormsg('Error while logging in');
    }
  };
  return (
    <div className="relative w-screen h-screen flex items-center 
    justify-center font-sans bg-slate-50">
      <div className="absolute right-0 top-0 p-8">
        Don't have an account? &nbsp;
        <Link
          href="/signup"
          className="bg-black px-4 py-2 rounded-full text-white 
          hover:px-[17px] hover:py-[9px]"
        >
          Sign up
        </Link>
      </div>
      <div className="w-[400px] p-5">
        <div className="text-lg">
          <Image
            src={logo}
            alt="logo"
            priority={true}
            className="mb-6 -translate-x-5"
          />
          Welcome back!
          <div className="font-semibold">Please log in...</div>
        </div>
        <div className="mt-10">
          <div>
            <div className="mb-6">
              <input
                type="text"
                id="email"
                className="form-input w-full bg-slate-50 
                focus:outline-none border-b border-gray-300 
                focus:border-b-green-400 focus:shadow-outline pb-2"
                placeholder="Your e-mail"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="z-10 form-input w-full bg-slate-50 
                focus:outline-none border-b border-gray-300 
                focus:border-b-green-400 focus:shadow-outline pb-2 mb-6"
                placeholder="Your password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="text-red-500 text-xs font-thin font-mono">
              {errormsg}
            </div>

            <button
              className={`bg-violet-800 text-white rounded-md px-4
               py-3 w-full mt-4 hover:py-[13px]
                `}
                onClick={handleemail}
            >
              Log in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
