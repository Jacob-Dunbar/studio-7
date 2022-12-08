import { useState } from "react";
import { client, urlFor } from "../lib/client";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
  AiOutlineArrowRight,
} from "react-icons/ai";

import { useStateContext } from "../context/StateContext";
import Link from "next/link";
import Head from "next/head";

// Options object for toLocaleDateString method to format date
const options = {
  weekday: "short",
  month: "short",
  day: "numeric",
};

// add days to date
Date.prototype.addDays = function (days) {
  const date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
};

// Current date
const date = new Date();

const ProductDetails = (props) => {
  const { image, name, details, price, catagories, length, intensity } =
    props.product;
  const { onAdd } = useStateContext();
  const [index, setIndex] = useState(0);

  // Make sure sessions are in correct order
  //   props.sessions.sort((a, b) => {
  //     return a.number - b.number;
  //   });

  // Selection right trainer for this class from trainers array

  //   const classTrainer = trainers.find(
  //     (trainer) => trainer.name === product.trainer
  //   );

  return (
    <div>
      {/* Page container */}
      <div className="flex flex-col items-center h-full">
        {/* Class details */}
        <section className="flex flex-row items-center justify-center mt-20 sm:w-full sm:mt-2 mt sm:gap-5 sm:mb-5 sm:items-start ">
          {/* Desktop image */}
          <div className="hidden w-full h-60 sm:block aspect-square">
            <img
              className="object-cover w-full h-full rounded-md"
              src={urlFor(image[index])}
            />
          </div>
          {/* Copy */}
          <div className="flex flex-col sm:h-full sm:justify-between">
            {/* Details container */}
            <div className="flex flex-col self-center w-full gap-3 px-5 sm:px-0">
              {/* Heading */}
              <h1 className="text-3xl font-semibold tracking-wider font-PlayfairDisplay">
                {name}
              </h1>
              {/* time - intensity - price */}
              <div className="flex gap-3 text-sm font-bold text-gray-500">
                <p>{length} hour</p>
                <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
                <p>{intensity}</p>
                <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
                <p>£{price}</p>
              </div>
              {/*  Categories */}
              <div className="flex gap-2 ">
                {catagories.map((catagory, i) => (
                  <p key={i} className="chip">
                    {catagory}
                  </p>
                ))}
              </div>
              {/* Desciption */}
              <p className="mb-5 text-sm leading-4 indent-5">{details}</p>
            </div>
          </div>
        </section>
        {/* Sessions */}
        <section className="flex flex-col justify-center w-full py-4 bg-gray-100 rounded-xl px-7 ">
          <div className="flex flex-col gap-3 sm:gap-1 sm:w-full">
            {props.sessions.map((session, i) => (
              <div className="flex flex-col">
                {i !== 0 && (
                  <div className="w-full h-[2px] mb-2 mt-1 bg-gray-300 "></div>
                )}
                <div key={i} className="flex justify-between gap-5 py-2 ">
                  <div className="flex justify-between w-2/5">
                    <p className="flex-grow text-lg sm:text-base sm:w-24 sm:flex-grow-0 ">
                      {date
                        .addDays(session.number)
                        .toLocaleDateString("en-GB", options)}
                    </p>
                    {/* <div className="self-center w-[6px]  h-[6px] bg-gray-500 rounded-full "></div> */}

                    <p>{session.time}</p>
                    {/* <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div> */}
                  </div>
                  <button
                    className="flex items-center gap-2 px-2 text-xs sm:px-3 sm:py-0 sm:scale-95 sm:hover:scale-100"
                    type="button"
                    onClick={() => onAdd(session)}
                  >
                    Add To Cart
                    <AiOutlinePlus className="w-4 h-4 " />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProductDetails;
