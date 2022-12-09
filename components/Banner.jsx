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
      className={`flex px-6 shadow-xl w-[95%] ml-2 overflow-hidden  sm:mt-4 sm:w-fit  duration-300 absolute transition-all ease-in-out  py-2 sm:py-6 gap-4 sm:right-4 top-[4.5rem] rounded-xl bg-[#e4816b]  sm:text-sm text-xs  text-white justify-start sm:justify-center items-center   
        ${
          !props.showBanner
            ? "opacity-0 sm:right-0 pointer-events-none"
            : "opacity-100 sm:right-5"
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
