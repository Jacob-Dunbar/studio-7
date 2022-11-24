import { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = (props) => {
  return (
    <div>
      <div className="flex justify-center mb-5 sm:bg-transparent bg-slate-100">
        <div className="flex flex-col w-full rounded-md shadow-lg overflow-clip sm:flex-row sm:pr-5 sm:gap-5 sm:w-2/3 sm:bg-slate-100 ">
          <div className=" sm:w-1/2">
            <img
              className="object-cover w-screen mb-3 sm:object-cover sm:w-full sm:h-72 sm:mb-0 h-52"
              src={urlFor(props.product.image && props.product.image[0])}
              alt=""
            />
          </div>
          <div className=" flex flex-col gap-3 sm:h-full sm:justify-between  self-center w-[90%]">
            <h1 className="text-3xl font-semibold tracking-wider sm:text-2xl sm:mt-5 font-PlayfairDisplay">
              {props.product.name}
            </h1>
            <div className="flex gap-3 text-sm font-bold text-gray-500">
              <p>{props.product.length} hour</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>{props.product.intensity}</p>
              <div className="self-center w-[6px] h-[6px] bg-gray-500 rounded-full "></div>
              <p>£{props.product.price}</p>
            </div>
            <div className="flex gap-2 ">
              {props.activeFilters.map((filter) =>
                props.product.catagories.map((cat) => {
                  if (cat === filter) {
                    return <p className="chip-active">{filter}</p>;
                  } else {
                    return;
                  }
                })
              )}
              {props.inactiveFilters?.map((filter) =>
                props.product.catagories.map((cat) => {
                  if (cat === filter) {
                    return <p className="chip">{filter}</p>;
                  } else {
                    return;
                  }
                })
              )}
            </div>
            <p className="text-sm leading-5 line-clamp-3 sm:line-clamp-4 indent-5">
              {props.product.details}
            </p>
            {/* <p className="">£{price}</p> */}
            <Link href={`/product/${props.product.slug.current}`}>
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
