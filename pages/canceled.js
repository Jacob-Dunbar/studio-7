import { useState, useEffect } from "react";
import Link from "next/link";
import { BsBagXFill } from "react-icons/bs";
import Head from "next/head";

import { useStateContext } from "../context/StateContext";
import { AiOutlineOrderedList } from "react-icons/ai";

const Cancel = () => {
  const { setShowCart } = useStateContext();
  return (
    <div className="flex justify-center w-full h-screen mt-20 ">
      <Head>
        <title>Studio 7 | Cancel</title>
        <meta
          name="Studio 7"
          content="pay as you go London fitness club with classes"
        />
        <link rel="icon" href="/s7icon.svg" />
      </Head>
      <div className="flex flex-col items-center justify-start w-full gap-5 mt-10 ">
        <p>
          <BsBagXFill className="w-20 h-20 mb-5" />
        </p>
        <h2 className="text-xl">Order canceled</h2>

        <p>Please try again</p>
        <div className="flex flex-col items-center w-full">
          <button
            onClick={() => setShowCart(true)}
            className="button mt-10  w-[50%]"
            type="button"
          >
            Try again
          </button>

          <Link href="/">
            <button className="button-sec mt-5  w-[50%]" type="button">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cancel;
