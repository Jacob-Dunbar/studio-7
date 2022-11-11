import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";

import { useStateContext } from "../context/StateContext";
import { AiOutlineOrderedList } from "react-icons/ai";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuant } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuant(0);
  }, []);

  return (
    <div>
      <p>
        <BsBagCheckFill />
      </p>
      <h2>We will see you then!</h2>
      <p>check your email inbox for you receipt.</p>
      <p>If you have any questions please email</p>
      <a href="mailto:order@example.com">order@example.com</a>
      <Link href="/">
        <button type="button">Continue Shopping</button>
      </Link>
    </div>
  );
};

export default Success;
