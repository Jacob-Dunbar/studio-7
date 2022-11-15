import { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

import { useRouter } from "next/router";

const Product = (
  { product: { image, name, slug, price, catagories, details, length } },
  page
) => {
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
    } else if (router.pathname === "/catagories/all") {
      return "All";
    }
  }

  const currentPage = chooseCurrentPage();

  return (
    <div>
      <div className="flex justify-center mb-5 cursor-pointer bg-slate-100">
        <div className="flex flex-col w-full ">
          <img
            className="object-cover w-screen mb-3 h-52"
            src={urlFor(image && image[0])}
            alt=""
          />
          <div className=" flex flex-col gap-3  self-center w-[90%]">
            <p className="text-3xl font-semibold">{name}</p>
            <div className="flex gap-3 -my-1 text-sm font-bold text-gray-500">
              <p>{length} hour</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>Low intensity</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>£{price}</p>
            </div>
            <div className="flex gap-2 ">
              {catagories.map((catagory) => (
                <p
                  className={currentPage === catagory ? "chip-active" : "chip"}
                >
                  {catagory}
                </p>
              ))}
            </div>
            <p className="text-sm leading-5 line-clamp-3 indent-5">{details}</p>
            {/* <p className="">£{price}</p> */}
            <Link href={`/product/${slug.current}`}>
              <button className="w-full mb-5 button" type="button">
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
