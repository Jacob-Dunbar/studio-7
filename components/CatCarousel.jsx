import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

export const CatCarousel = (props) => {
  return (
    <div className="flex w-screen gap-2 px-5 my-4 overflow-scroll scrollbar-hide sm:px-0 sm:mb-10 sm:w-2/3 sm:overflow-hidden ">
      {props.activeFilters &&
        props.activeFilters.map((catagory, i) => {
          return (
            <div
              key={i}
              onClick={() => props.removeFilter(catagory)}
              className="flex items-center gap-1 cursor-pointer chip-active"
            >
              <p className="">{catagory}</p>
              {catagory !== "All" && <AiOutlineClose />}
            </div>
          );
        })}
      {props.inactiveFilters &&
        props.inactiveFilters.map((catagory, i) => {
          return (
            <div
              key={i}
              onClick={() => props.addFilter(catagory)}
              className="flex items-center gap-1 cursor-pointer chip"
            >
              <p className="">{catagory}</p>
            </div>
          );
        })}
    </div>
  );
};
