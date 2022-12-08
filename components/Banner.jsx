import { AiOutlineClose } from "react-icons/ai";
import { TbBottle } from "react-icons/tb";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const Banner = (props) => {
  // Options object for toLocaleDateString method to format date
  const options = {
    month: "long",
  };

  const date = new Date();

  return (
    <div
      className={`flex px-6 shadow-xl sm:mt-4 sm:w-fit    transition-all ease-in-out absolute sm:py-6 sm:gap-4  sm:right-3 sm:top-16 sm:rounded-xl bg-[#e4816b]  sm:text-sm text-xs    text-white justify-start sm:justify-center items-center w-full  
        ${
          !props.showBanner
            ? "opacity-0  sm:right-0  pointer-events-none"
            : "opacity-100"
        }`}
    >
      <TbBottle className="rotate-45 w-14 h-14" />
      <div className="flex flex-col justify-between w-full mb-1 align-top sm:w-96">
        <h1 className="text-lg font-semibold">Free water bottle!</h1>
        <AiOutlineClose
          onClick={() => props.hideBanner(false)}
          className="absolute w-5 h-5 cursor-pointer top-2 right-2 "
        />
        <p className=" sm:w-full sm:text-xs sm:text-left">
          {`Stay hydrated in style - claim your free limited edition Studio 7 water bottle after your first
        class. While stocks last.`}
        </p>
      </div>
    </div>
  );
};

export default Banner;
