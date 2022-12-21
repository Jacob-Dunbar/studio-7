import Link from "next/link";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full space-y-2 text-black border-t shadow-md sm:mt-9 sm:space-y-3 sm:pt-8 sm:pb-0 sm:h-48 sm:text-sm tems-center ">
      <div className="flex justify-between px-6 mt-3 mb-2 space-x-5 text-xs font-semibold text-center uppercase sm:mt-0 sm:space-x-20 sm:text-sm">
        <Link className="w-min sm:w-max" href="/">
          House rules
        </Link>
        <Link href="/">Terms and conditions</Link>
        <Link href="/">Contact us</Link>
        <Link href="/">Careers</Link>
      </div>
      <div className="flex space-x-5 ">
        <AiOutlineFacebook className="w-6 h-6 cursor-pointer" />
        <AiFillInstagram className="w-6 h-6 cursor-pointer" />
        <AiOutlineTwitter className="w-6 h-6 cursor-pointer" />
      </div>
      {/* <div className="flex space-x-10"> */}

      <div className="flex flex-col sm:text-xs  justify-center items-center w-full space-y-2 py-2 bg-[#e4816b] sm:flex-row">
        <p>Designed and developed by Jacob Dunbar -</p>
        <Link
          href="https://jacobdunbar.com"
          className="pb-2 pl-1 font-semibold"
        >
          www.jacobdunbar.com
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Footer;
