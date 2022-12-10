import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import Head from "next/head";

import { useStateContext } from "../context/StateContext";
import { AiOutlineOrderedList } from "react-icons/ai";

const Success = () => {
  const { setCartItems, setTotalPrice } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
  }, []);

  return (
    <div className="flex justify-center h-screen mt-20 ">
      <Head>
        <title>Studio 7 | Success</title>
        <meta
          name="Studio 7"
          content="pay as you go London fitness club with classes"
        />
        <link rel="icon" href="/s7icon.svg" />
      </Head>
      <div className="flex flex-col items-center justify-start mt-10 space-y-5 ">
        <p>
          <BsBagCheckFill className="w-20 h-20 mb-5" />
        </p>
        <h2 className="text-xl">We will see you then!</h2>

        <p>Check your email inbox for you receipt.</p>

        <Link href="/">
          <button className="button mt-10  w-[50%]" type="button">
            Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
