import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";
import Cart from "./Cart.jsx";
import { useStateContext } from "../context/StateContext";

const Navbar = () => {
  const { cartItems, showCart, setShowCart, totalQuant } = useStateContext();

  return (
    <div className="z-30 flex justify-between px-4">
      <p>
        <Link href="/">Studio 7</Link>
      </p>

      <button
        className="relative "
        type="button"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className="absolute top-0 w-4 h-4 text-xs text-white bg-red-600 rounded-lg ">
          {cartItems.length}
        </span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
