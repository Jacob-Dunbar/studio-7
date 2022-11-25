import { AiOutlineClose } from "react-icons/ai";

const Banner = (props) => {
  // Options object for toLocaleDateString method to format date
  const options = {
    month: "long",
  };

  const date = new Date();

  return (
    <div className="flex sm:h-10 h-12 sm:text-sm text-xs sm:uppercase   text-white justify-start sm:justify-center items-center w-full sm:opacity-80 bg-[#e4816b] ">
      <h1 className="w-[95%] px-4  sm:w-full sm:px-0">
        {`Claim your free limited edition water bottle after your first
        class - only in ${date.toLocaleDateString("en-GB", options)}`}
      </h1>
      <AiOutlineClose
        onClick={() => props.hideBanner(false)}
        className="absolute w-5 h-5 cursor-pointer right-3"
      />
    </div>
  );
};

export default Banner;
