import { useState } from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";
import { AiOutlineArrowRight } from "react-icons/ai";

const Product = (props) => {
  return (
    <div>
      <div className="flex justify-center mb-8 sm:w-full sm:bg-transparent">
        <div className="flex flex-col shadow-md rounded-xl overflow-clip sm:flex-row sm:pr-5 sm:space-y-5 sm:bg-gray-100 sm:bg-opacity-50">
          <img
            className="object-cover mr-5 w-screen h-full sm:rounded-bl-xl rounded-bl-none rounded-tl-xl rounded-tr-xl sm:rounded-tr-none   mb-3 sm:aspect-square sm:object-cover  sm:w-[250px] sm:mb-0"
            src={urlFor(props.product.image && props.product.image[0])}
            alt=""
          />

          <div className="flex flex-col self-center px-4 space-y-2 sm:py-2 sm:px-0 sm:h-full sm:justify-between sm:flex-grow">
            <h1 className="text-3xl font-semibold tracking-wider sm:text-2xl font-PlayfairDisplay">
              {props.product.name}
            </h1>
            <div className="flex space-x-3 text-xs font-bold text-gray-500 ">
              <p>{props.product.length} hour</p>
              <div className="self-center w-[4px] h-[4px] bg-gray-500 rounded-full "></div>
              <p>{props.product.intensity}</p>
              <div className="self-center w-[4px] h-[4px] bg-gray-500 rounded-full "></div>
              <p>£{props.product.price}</p>
            </div>
            <div className="flex space-x-2 ">
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
            <p className="mb-3 text-xs leading-4 sm:mb-0 line-clamp-3 sm:line-clamp-3 indent-5">
              {props.product.details}
            </p>
            {/* <p className="">£{price}</p> */}
            <Link href={`/product/${props.product.slug.current}`}>
              <button
                className="relative flex justify-center w-full py-1 mb-5 transition-all duration-75 ease-in sm:text-sm button sm:opacity-80 sm:hover:opacity-100"
                type="button"
              >
                <p className="ml-auto ">More Details</p>

                <AiOutlineArrowRight className="w-5 h-5 ml-auto mr-2 " />
              </button>
            </Link>
            {/* 
            <button
              onClick={() => props.setActiveClassName(props.product.name)}
              className="relative hidden w-full mt-6 mb-5 transition-all duration-75 ease-in sm:block sm:text-sm button sm:opacity-80 sm:hover:opacity-100"
              type="button"
            >
              More Details
              <AiOutlineArrowRight className="absolute w-5 h-5 top-2 right-4" />
            </button> */}
          </div>
        </div>
      </div>
      {/* <div className="flex justify-center w-full mb-5">
        <div className="self-center w-1 h-1 bg-black rounded-full "></div>
      </div> */}
    </div>
  );
};

export default Product;
