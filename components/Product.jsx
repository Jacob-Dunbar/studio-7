import { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

import { useRouter } from "next/router";

const Product = ({
  product: { image, name, slug, price, catagories, details, length, intensity },
}) => {
  // Get current page

  const router = useRouter();

  function chooseCurrentPage() {
    if (router.pathname === "/catagories/cardio") {
      return "Cardio";
    } else if (router.pathname === "/catagories/combat") {
      return "Combat";
    } else if (router.pathname === "/catagories/mindfulness") {
      return "Mindfulness";
    } else if (router.pathname === "/catagories/mobility") {
      return "Mobility";
    } else if (router.pathname === "/catagories/strength") {
      return "Strength";
    } else if (
      router.pathname === "/catagories/all" ||
      router.pathname === "/classes"
    ) {
      return "All";
    }
  }

  const currentPage = chooseCurrentPage();

  // Put searched for category at the first position in array

  // Find index of current cat
  const indexOfCurrentCat = catagories.findIndex((cat) => cat === currentPage);

  // Remove that cat from array (if not on trainer page)
  if (
    currentPage === "Cardio" ||
    currentPage === "Combat" ||
    currentPage === "Mindfulness" ||
    currentPage === "Mobility" ||
    currentPage === "Strength"
  ) {
    catagories.splice(indexOfCurrentCat, 1);

    // Add item back at beginning of array
    catagories.unshift(currentPage);
  }

  return (
    <div>
      <div className="flex justify-center mb-5 sm:bg-transparent bg-slate-100">
        <div className="flex flex-col w-full rounded-md shadow-lg overflow-clip sm:flex-row sm:pr-5 sm:gap-5 sm:w-2/3 sm:bg-slate-100 ">
          <div className=" sm:w-1/2">
            <img
              className="object-cover w-screen mb-3 sm:object-cover sm:w-full sm:h-72 sm:mb-0 h-52"
              src={urlFor(image && image[0])}
              alt=""
            />
          </div>
          <div className=" flex flex-col gap-3 sm:h-full sm:justify-between  self-center w-[90%]">
            <h1 className="text-3xl font-semibold tracking-wider sm:text-2xl sm:mt-5 font-PlayfairDisplay">
              {name}
            </h1>
            <div className="flex gap-3 text-sm font-bold text-gray-500">
              <p>{length} hour</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>{intensity}</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>£{price}</p>
            </div>
            <div className="flex gap-2 ">
              {catagories.map((catagory, i) => (
                <p
                  className={currentPage === catagory ? "chip-active" : "chip"}
                  key={i}
                >
                  {catagory}
                </p>
              ))}
            </div>
            <p className="text-sm leading-5 line-clamp-3 sm:line-clamp-4 indent-5">
              {details}
            </p>
            {/* <p className="">£{price}</p> */}
            <Link href={`/product/${slug.current}`}>
              <button
                className="w-full mb-5 transition-all duration-75 ease-in button sm:opacity-80 sm:hover:opacity-100"
                type="button"
              >
                More Details
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full mb-5">
        <div className="self-center w-2 h-2 bg-black rounded-full "></div>
      </div>
    </div>
  );
};

export default Product;
