import { useState } from "react";
import Link from "next/link";
import { AiOutlineShopping, AiOutlineMenu } from "react-icons/ai";
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
      {showCart && <Cart />}
      {/* mobile menu button */}
      {!showMenu && (
        <div
          onClick={() => setShowMenu(true)}
          className="fixed flex items-center justify-center w-16 h-16 bg-white rounded-full shadow-2xl bottom-8 right-8"
        >
          <AiOutlineMenu className="text-black w-7 h-7" />
        </div>
      )}
      {/* Mobile menu */}
      <MobileMenu
        className={
          showMenu ? " absolute opacity-70  ease-in duration-300" : "hidden"
        }
        close={setShowMenu}
      />
    </div>
  );
};

export default Navbar;
