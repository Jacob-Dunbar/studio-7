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
    <div className="z-30 flex items-center justify-between px-4 py-3">
      {/* logo */}

      <Link href="/">
        <h1
          // onClick={showCart && setShowCart(false)}
          className="pt-2 text-4xl font-semibold tracking-wider font-PlayfairDisplay"
        >
          STUDIO 7
        </h1>
      </Link>

      {/* cart icon */}
      <button
        className="relative "
        type="button"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping className="w-10 h-12" />
        <span className="absolute w-4 h-4 text-xs font-bold text-black rounded-lg top-5 left-3 ">
          {cartItems.length > 0 ? cartItems.length : 0}
        </span>
      </button>
      {/* cart ui */}
      {showCart && <Cart />}
      {/* mobile menu button */}
      {!showMenu && (
        <div
          onClick={() => setShowMenu(true)}
          className="fixed flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-60 bottom-10 right-10"
        >
          <AiOutlineMenu className="w-6 h-6 " />
        </div>
      )}
      {/* Mobile menu */}
      {showMenu && <MobileMenu close={setShowMenu} />}
    </div>
  );
};

export default Navbar;
