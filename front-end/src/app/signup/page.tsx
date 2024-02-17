"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { TbUserEdit } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";

const Signup = () => {
  const passwordRef = useRef(null);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [inPassword, setInPassword] = useState(false);
  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    upperCase: false,
    lowerCase: false,
    number: false,
  });

  useEffect(() => {
    const handleClickOutside = (e: any) => {
      if (
        passwordRef.current &&
        !(passwordRef.current as unknown as Node).contains(e.target)
      ) {
        setInPassword(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [passwordRef]);

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    const validations = {
      length: value.length >= 8,
      upperCase: /[A-Z]/.test(value),
      lowerCase: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
    };

    setPasswordValidations(validations);
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center font-sans bg-slate-50">
      <div className="absolute right-0 top-0 p-8">
        Already have an account? &nbsp;
        <Link
          href="/login"
          className="bg-black px-4 py-2 rounded-full text-white hover:px-[17px] hover:py-[9px]"
        >
          Log in
        </Link>
      </div>
      <div className="w-[400px] p-5">
        <div className="text-lg">
          <TbUserEdit size="50" className="mb-6" />
          Hello.
          <div className="font-semibold">To get started please sign up...</div>
        </div>
        <div className="mt-10">
          <div>
            <div className="mb-6">
              <input
                type="text"
                id="name"
                className="form-input w-full bg-slate-50 focus:outline-none border-b border-gray-300 focus:border-b-green-400 focus:shadow-outline pb-2"
                placeholder="Your name"
                onChange={(e) => setname(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <input
                type="text"
                id="email"
                className="form-input w-full bg-slate-50 focus:outline-none border-b border-gray-300 focus:border-b-green-400 focus:shadow-outline pb-2"
                placeholder="Your e-mail"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <input
                type="password"
                id="password"
                className="z-10 form-input w-full bg-slate-50 focus:outline-none border-b border-gray-300 focus:border-b-green-400 focus:shadow-outline pb-2 mb-6"
                placeholder="Your password"
                onFocus={() => setInPassword(true)}
                onChange={(e) => {
                  handlePasswordChange(e.target.value);
                }}
                ref={passwordRef}
              />
              <AnimatePresence>
                {inPassword && (
                  <motion.div
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-xs mt-1">
                      <div className="mb-2">
                        Hey 👋️ your password must contain:
                      </div>
                      <ul className="">
                        <li
                          className={
                            passwordValidations.length
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {passwordValidations.length ? (
                            <FaCheckCircle
                              className="text-green-500 inline mr-2 ml-[1px]"
                              size="15"
                            />
                          ) : (
                            <IoCloseCircleSharp
                              className="text-red-500 inline mr-2"
                              size="18"
                            />
                          )}
                          At least 8 characters in length
                        </li>
                        <li
                          className={
                            passwordValidations.lowerCase
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {passwordValidations.lowerCase ? (
                            <FaCheckCircle
                              className="text-green-500 inline mr-2 ml-[1px]"
                              size="15"
                            />
                          ) : (
                            <IoCloseCircleSharp
                              className="text-red-500 inline mr-2"
                              size="18"
                            />
                          )}
                          Lower case letters (ie. a-z)
                        </li>
                        <li
                          className={
                            passwordValidations.upperCase
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {passwordValidations.upperCase ? (
                            <FaCheckCircle
                              className="text-green-500 inline mr-2 ml-[1px]"
                              size="15"
                            />
                          ) : (
                            <IoCloseCircleSharp
                              className="text-red-500 inline mr-2"
                              size="18"
                            />
                          )}
                          Upper case letters (ie. A-Z)
                        </li>
                        <li
                          className={
                            passwordValidations.number
                              ? "text-green-500"
                              : "text-red-500"
                          }
                        >
                          {passwordValidations.number ? (
                            <FaCheckCircle
                              className="text-green-500 inline mr-2 ml-[1px]"
                              size="15"
                            />
                          ) : (
                            <IoCloseCircleSharp
                              className="text-red-500 inline mr-2"
                              size="18"
                            />
                          )}
                          Numbers (ie. 0-9)
                        </li>
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="mb-4">
              <input type="checkbox" id="terms" className="mr-2" />
              <label htmlFor="terms" className="text-sm">
                I agree to VideoAsk's
                <span className="text-green-400 font-semibold">
                  {" "}
                  Terms of service
                </span>
              </label>
            </div>

            <div className="mb-4">
              <input type="checkbox" id="dataUse" className="mr-2" />
              <label htmlFor="dataUse" className="text-sm">
                I accept VideoAsk's use of my data for the service and
                everything else described in the{" "}
                <span className="text-green-400 font-semibold">
                  {" "}
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="text-green-400 font-semibold">
                  {" "}
                  Data Processing Agreement
                </span>
              </label>
            </div>

            <button
              className={`bg-violet-800 text-white rounded-md px-4 py-3 w-full mt-4 hover:py-[13px] ${
                name.length > 0 &&
                email.length > 0 &&
                password.length > 0 &&
                passwordValidations.length &&
                passwordValidations.upperCase &&
                passwordValidations.lowerCase &&
                passwordValidations.number
                  ? "cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              Create my account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
