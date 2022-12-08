import { useState, useEffect } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import Cart from "./Cart.jsx";
import { useStateContext } from "../context/StateContext";
import Banner from "./Banner";

import { useUser } from "@auth0/nextjs-auth0";

const Navbar = () => {
  const { cartItems, showCart, setShowCart, showMenu, setShowMenu } =
    useStateContext();
  const [showBanner, setShowBanner] = useState(false);
  const { user } = useUser();

  function handleShowMenu() {
    setShowMenu((prevVal) => !prevVal);
  }

  useEffect(() => {
    setTimeout(() => {
      setShowBanner(true);
    }, 1000);
  }, []);

  return (
    <div className="w-full ">
      <div className="z-30 flex items-center justify-between w-full px-4 pt-2 pb-2 shadow-md bg-gray-100 bg-opacity-50 sm:px-8 sm:mb-[1vh] sm:h-[9vh]">
        {/* logo */}
        <Link href="/">
          <h1
            // onClick={showCart && setShowCart(false)}
            className="text-4xl font-bold tracking-wider cursor-pointer sm:w-64 sm:text-2xl font-PlayfairDisplay"
          >
            STUDIO 7
          </h1>
        </Link>
        {/* Desktop Menu */}
        <div className="items-center hidden gap-2 sm:flex">
          <div className="flex items-center h-full gap-5 ">
            <Link href="/">
              <h1
                onClick={() => setShowMenu(false)}
                className="font-semibold hover:text-[#bd6450] tracking-wider cursor-pointer text-xs  uppercase"
              >
                Home
              </h1>
            </Link>
            <div className="w-1 h-1 bg-black rounded-full "></div>
            <Link href={"/#about"}>
              <h1
                onClick={() => setShowMenu(false)}
                className="font-semibold text-center hover:text-[#bd6450] tracking-wider cursor-pointer text-xs  uppercase "
              >
                About Us
              </h1>
            </Link>
            <div className="w-1 h-1 bg-black rounded-full "></div>
            <Link href="/classes">
              <h1
                onClick={() => setShowMenu(false)}
                className="font-semibold hover:text-[#bd6450] tracking-wider cursor-pointer text-xs  uppercase"
              >
                Classes
              </h1>
            </Link>
          </div>
        </div>
        {/* Desktop login and cart button*/}
        <div className="items-center justify-end hidden w-64 gap-5 sm:flex">
          {/* Login or logout button */}
          {!user ? (
            <Link href="/api/auth/login">
              <button
                onClick={() => setShowMenu(false)}
                className="px-5 py-1 hover:text-[#bd6450] cursor-pointer hover:border-[#bd6450] text-xs text-black border-black  border-[1px] button-sec"
              >
                Log in
              </button>
            </Link>
          ) : (
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center bg-[#E4816B] text-white rounded-full w-8 aspect-square ">
                <h1 className="text-lg ">{user.given_name.charAt(0)}</h1>
              </div>
              <Link href="/api/auth/logout">
                <h1
                  className="px-5 py-1 hover:text-[#bd6450] cursor-pointer hover:border-[#bd6450] text-xs text-black border-black  border-[2px] button-sec"
                  onClick={() => setShowMenu(false)}
                >
                  Log out
                </h1>
              </Link>
            </div>
          )}
          {/* Cart button */}
          <button
            className="relative flex items-center "
            type="button"
            onClick={() => setShowCart(true)}
          >
            <AiOutlineShopping className="w-5 h-6 pb-1 mr-1" />
            <h3 className="text-xs font-medium text-black ">
              Cart ({cartItems && cartItems.length > 0 ? cartItems.length : 0})
            </h3>{" "}
          </button>
        </div>
        {/*Mobile Cart icon */}
        <button
          className="relative sm:hidden "
          type="button"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping className="w-10 h-12 sm:w-8 sm:h-10" />
          <span className="absolute w-4 h-4 text-xs font-bold text-black rounded-lg sm:top-4 sm:left-2 top-5 left-3 ">
            {cartItems && cartItems.length > 0 ? cartItems.length : 0}
          </span>
        </button>
        {/* Cart ui */}
        <Cart />
        {/* Mobile menu button */}
        <div
          onClick={handleShowMenu}
          className="fixed flex items-center justify-center w-16 h-16 bg-black rounded-full shadow-2xl sm:hidden bottom-6 right-6"
        >
          <AiOutlineMenu className="text-white w-7 h-7" />
        </div>
        {/* Mobile menu */}
        <div
          className={
            showMenu
              ? "fixed sm:hidden ease-in duration-300 flex flex-col justify-start items-center bottom-0 left-0 w-full h-[100%] backdrop-blur-3xl   backdrop-brightness-150"
              : "fixed sm:hidden ease-in duration-300 flex flex-col justify-start items-center bottom-[-100%] left-0 w-full h-[100%] backdrop-blur-3xl   backdrop-brightness-150"
          }
        >
          {/* Close icon */}
          <div
            onClick={() => setShowMenu(false)}
            className="flex justify-end w-full px-4 py-4 "
          >
            <AiOutlineClose className="w-8 h-8" />
          </div>

          {/* Menu */}

          <div className="flex flex-col items-center justify-center flex-grow w-full gap-6 ">
            {user && (
              <div className="flex flex-col items-center w-full gap-5 pl-1">
                <div className="flex items-center justify-center bg-[#E4816B] text-white rounded-full w-fit aspect-square ">
                  <h1 className="p-5 text-4xl ">{user.given_name.charAt(0)}</h1>
                </div>
                <div className="flex gap-1 text-lg mb-9">
                  <p>Hello, </p>
                  <span className="font-bold ">{user.given_name}</span>
                </div>
              </div>
            )}
            <Link href="/">
              <h1
                onClick={() => setShowMenu(false)}
                className="text-4xl font-medium tracking-wider font-PlayfairDisplay"
              >
                Home
              </h1>
            </Link>
            <div className="w-2 h-2 bg-black rounded-full "></div>
            <Link href={"/#about"}>
              <h1
                onClick={() => setShowMenu(false)}
                className="text-4xl font-medium tracking-wider font-PlayfairDisplay "
              >
                About Us
              </h1>
            </Link>
            <div className="w-2 h-2 bg-black rounded-full "></div>
            <Link href="/classes">
              <h1
                onClick={() => setShowMenu(false)}
                className="mb-8 text-4xl font-medium tracking-wider font-PlayfairDisplay "
              >
                Classes
              </h1>
            </Link>
            {/* <div className="w-2 h-2 bg-black rounded-full "></div> */}

            {/* login / out */}
            {!user ? (
              <Link href="/api/auth/login">
                <h1
                  onClick={() => setShowMenu(false)}
                  className="px-12 mt-6 button"
                >
                  Log in
                </h1>
              </Link>
            ) : (
              <Link href="/api/auth/logout">
                <h1
                  className="px-12 mt-6 button-sec"
                  onClick={() => setShowMenu(false)}
                >
                  Log out
                </h1>
              </Link>
            )}
          </div>
        </div>
      </div>
      <Banner showBanner={showBanner} hideBanner={setShowBanner} />
    </div>
  );
};

export default Navbar;
