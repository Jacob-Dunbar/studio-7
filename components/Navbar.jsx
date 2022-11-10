import React from "react";
import Link from "next/link";
import { AiOutlineShopping } from "react-icons/ai";

const Navbar = () => {
  return (
    <div className="flex px-4 justify-between">
      <p>
        <Link href="/">Studio 7</Link>
      </p>

      <button className=" relative" type="button" onClick>
        <AiOutlineShopping />
        <span className=" absolute top-0 bg-red-600 rounded-lg text-xs text-white w-4 h-4">
          1
        </span>
      </button>
    </div>
  );
};

export default Navbar;
