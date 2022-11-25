import { AiOutlineClose } from "react-icons/ai";

const Banner = (props) => {
  // Options object for toLocaleDateString method to format date
  const options = {
    month: "long",
  };

  const date = new Date();

  return (
    <div className="flex h-10 text-sm uppercase text-white justify-center items-center w-full opacity-80 bg-[#e4816b] ">
      <h1>
        {`Claim your free limited edition water bottle after your first
        class for the month of ${date.toLocaleDateString("en-GB", options)}`}
      </h1>
      <AiOutlineClose
        onClick={() => props.hideBanner(false)}
        className="absolute w-5 h-5 cursor-pointer right-3"
      />
    </div>
  );
};

export default Banner;
