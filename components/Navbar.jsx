import { useState } from "react";
import Link from "next/link";
import {
  AiOutlineShopping,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai";
import Cart from "./Cart.jsx";
import { useStateContext } from "../context/StateContext";
import MobileMenu from "../components/MobileMenu";
import { useUser } from "@auth0/nextjs-auth0";

const Navbar = () => {
  const { cartItems, showCart, setShowCart, showMenu, setShowMenu } =
    useStateContext();
  // const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { user, error, isLoading } = useUser();

  function handleClose() {
    setShowMenu(false);
  }

  // function handleLogoClick() {
  //   if (showCart === true) {

  //   }
  // }
  console.log(showMenu);
  return (
    <div className="absolute z-30 flex items-center justify-between w-screen px-4 py-3">
      {/* logo */}
      <Link href="/">
        <h1
          // onClick={showCart && setShowCart(false)}
          className="text-4xl font-semibold tracking-wider font-PlayfairDisplay"
        >
          STUDIO 7
        </h1>
      </Link>
      <div className="flex items-center gap-2 ">
        {user && (
          <div className="flex mt-1 w-8 h-8 items-center justify-center bg-[#E4816B] text-white rounded-full  aspect-square ">
            <h1 className=" text-md">{user.given_name.charAt(0)}</h1>
          </div>
        )}
        {/* cart icon */}
        <button
          className="relative "
          type="button"
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping className="w-10 h-12" />
          <span className="absolute w-4 h-4 text-xs font-bold text-black rounded-lg top-5 left-3 ">
            {cartItems && cartItems.length > 0 ? cartItems.length : 0}
          </span>
        </button>
      </div>
      {/* cart ui */}
      <Cart />
      {/* mobile menu button */}
      {!showMenu && (
        <div
          onClick={() => setShowMenu(true)}
          className="fixed flex items-center justify-center w-16 h-16 bg-black rounded-full shadow-2xl bottom-6 right-6"
        >
          <AiOutlineMenu className="text-white w-7 h-7" />
        </div>
      )}
      {/* Mobile menu */}

      <div
        className={
          showMenu
            ? "fixed ease-in duration-300 flex flex-col justify-start items-center bottom-0 left-0 w-full h-[100%] backdrop-blur-3xl   backdrop-brightness-150"
            : "fixed ease-in duration-300 flex flex-col justify-start items-center bottom-[-100%] left-0 w-full h-[100%] backdrop-blur-3xl   backdrop-brightness-150"
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
                className="w-1/3 mt-6 button"
              >
                Log in
              </h1>
            </Link>
          ) : (
            <Link href="/api/auth/logout">
              <h1
                className="w-1/3 mt-6 button-sec"
                onClick={() => setShowMenu(false)}
              >
                Log out
              </h1>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
