"use client";
import Link from "next/link";
import React, { useContext, useState } from "react";
import Dojo from "./dojo-logo.png";
import Image from "next/image";
import { Modal } from "@mui/material";
import { Typography } from "@material-tailwind/react";
import Box from "@mui/material/Box";
import { UseSignUp, UseSignIn, logOut } from "../../hooks/useAuth";
import { AuthenticationContext } from "@/context/AuthContext";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AuthType = {
  login: "login",
  signIn: "signIn",
};
interface InputType {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

function NavBar() {
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [Auth, setAuth] = useState(AuthType.login);
  const [Inputs, setInputs] = useState<InputType>({
    firstName: "",
    lastName: "",
    password: "",
    email: "",
  });
  const { data, error, loading, setAuthState } = useContext(
    AuthenticationContext
  );
  const handleShowPopper = () => {
    setIsShow((prevstate) => !prevstate);
  };
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...Inputs,
      [e.target.name]: e.target.value,
    });
  };
  const handleSignupSignin = async () => {
    setAuthState({ data: null, error: null, loading: true });
    if (Auth === AuthType.login) {
      const res: any = await UseSignIn(Inputs);
      if (res.status === 200) {
        setAuthState({ data: res.data, error: null, loading: false });
        setIsShowModal(false);
      } else {
        setAuthState({
          data: null,
          error: res.data.error,
          loading: false,
        });
      }
    } else {
      const res: any = await UseSignUp(Inputs);
      if (res.status === 200) {
        setAuthState({ data: res.data, error: null, loading: false });
        setIsShowModal(false);
      } else {
        setAuthState({
          data: null,
          error: res.data.error,
          loading: false,
        });
      }
    }
  };
  const handleLogOut = () => {
    const res = logOut();
    if (res === "logOut successfully") {
      setAuthState({ loading: false, data: null, error: null });
    }
  };
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Open main menu</span>

              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>

              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                alt="Your Company"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link
                  href="/"
                  className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium"
                  aria-current="page"
                >
                  Home
                </Link>
                <Link
                  href="/restaurant"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Restaurant
                </Link>
                <Link
                  href="/restaurant/new/reserve"
                  className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                >
                  Serve
                </Link>
                {loading ? null : (
                  <>
                    {data ? (
                      <button
                        className=" bg-red-500 text-white hover:bg-red-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                        onClick={handleLogOut}
                      >
                        Logout
                      </button>
                    ) : (
                      <>
                        <button
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          onClick={() => {
                            setAuth(AuthType.login);
                            setIsShowModal(true);
                          }}
                        >
                          Login
                        </button>
                        <button
                          className="text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"
                          onClick={() => {
                            setAuth(AuthType.signIn);
                            setIsShowModal(true);
                          }}
                        >
                          Sign In
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button
              onClick={handleShowPopper}
              type="button"
              className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span className="absolute -inset-1.5"></span>
              <span className="sr-only">View notifications</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                />
              </svg>
            </button>
            {isShow ? (
              <div className="relative ml-3">
                <div
                  className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            ) : null}
          </div>
          <p className="text-xl text-orange-600 ml-8">{data?.email}</p>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="space-y-1 px-2 pb-3 pt-2">
          <a
            href="#"
            className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Team
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Projects
          </a>
          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
      <Modal
        open={isShowModal}
        onClose={() => setIsShowModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2">
            {error && error !== "token not found" ? (
              <div role="alert">
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Error
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>{error}</p>
                </div>
              </div>
            ) : null}
            {Auth === AuthType.signIn ? (
              <>
                {loading ? (
                  <div
                    aria-label="Loading..."
                    role="status"
                    className="flex items-center space-x-2"
                  >
                    <svg
                      className="h-20 w-20 animate-spin stroke-gray-500"
                      viewBox="0 0 256 256"
                    >
                      <line
                        x1="128"
                        y1="32"
                        x2="128"
                        y2="64"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="195.9"
                        y1="60.1"
                        x2="173.3"
                        y2="82.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="224"
                        y1="128"
                        x2="192"
                        y2="128"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="195.9"
                        y1="195.9"
                        x2="173.3"
                        y2="173.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="128"
                        y1="224"
                        x2="128"
                        y2="192"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="60.1"
                        y1="195.9"
                        x2="82.7"
                        y2="173.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="32"
                        y1="128"
                        x2="64"
                        y2="128"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="60.1"
                        y1="60.1"
                        x2="82.7"
                        y2="82.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <div className="uppercase font-bold text-center pb-2 border-b mb-3 ">
                    <div className="text-sm">Sign In</div>
                    <form className="w-full max-w-lg">
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            First Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="grid-first-name"
                            type="text"
                            placeholder="Jane"
                            name="firstName"
                            value={Inputs.firstName}
                            onChange={handleChangeInput}
                          />
                          <p className="text-red-500 text-xs italic">
                            Please fill out this field.
                          </p>
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Last Name
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-last-name"
                            type="text"
                            placeholder="Doe"
                            name="lastName"
                            value={Inputs.lastName}
                            onChange={handleChangeInput}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            email
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            type="email"
                            placeholder="mail@email.com"
                            name="email"
                            value={Inputs.email}
                            onChange={handleChangeInput}
                          />
                        </div>
                      </div>
                      <div className="flex flex-wrap -mx-3 mb-6">
                        <div className="w-full px-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Password
                          </label>
                          <input
                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="grid-password"
                            type="password"
                            placeholder="******************"
                            name="password"
                            value={Inputs.password}
                            onChange={handleChangeInput}
                          />
                        </div>
                      </div>
                      <div>
                        <button
                          type="submit"
                          onClick={handleSignupSignin}
                          className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Sign up
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </>
            ) : (
              <>
                {loading ? (
                  <div
                    aria-label="Loading..."
                    role="status"
                    className="flex items-center space-x-2"
                  >
                    <svg
                      className="h-20 w-20 animate-spin stroke-gray-500"
                      viewBox="0 0 256 256"
                    >
                      <line
                        x1="128"
                        y1="32"
                        x2="128"
                        y2="64"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="195.9"
                        y1="60.1"
                        x2="173.3"
                        y2="82.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="224"
                        y1="128"
                        x2="192"
                        y2="128"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="195.9"
                        y1="195.9"
                        x2="173.3"
                        y2="173.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="128"
                        y1="224"
                        x2="128"
                        y2="192"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="60.1"
                        y1="195.9"
                        x2="82.7"
                        y2="173.3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="32"
                        y1="128"
                        x2="64"
                        y2="128"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                      <line
                        x1="60.1"
                        y1="60.1"
                        x2="82.7"
                        y2="82.7"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="24"
                      ></line>
                    </svg>
                    <span className="text-4xl font-medium text-gray-500">
                      Loading...
                    </span>
                  </div>
                ) : (
                  <div className="uppercase font-bold text-center pb-2 border-b mb-3 ">
                    <div className="text-sm">Login</div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          email
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          type="email"
                          placeholder="mail@email.com"
                          name="email"
                          value={Inputs.email}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                          Password
                        </label>
                        <input
                          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-password"
                          type="password"
                          placeholder="******************"
                          name="password"
                          value={Inputs.password}
                          onChange={handleChangeInput}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-6">
                      <button
                        type="submit"
                        onClick={handleSignupSignin}
                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </Box>
      </Modal>
    </nav>
  );
}

export default NavBar;
