import Link from "next/link";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col items-center justify-between w-full gap-2 text-black border-t shadow-md sm:mt-9 sm:gap-3 sm:pt-8 sm:pb-0 sm:h-48 sm:text-sm tems-center ">
      <div className="flex justify-between gap-5 px-6 mt-3 mb-2 text-xs font-semibold text-center uppercase sm:mt-0 sm:gap-20 sm:text-sm">
        <Link className="w-min" href="/">
          House rules
        </Link>
        <Link href="/">Terms and conditions</Link>
        <Link href="/">Contact us</Link>
        <Link href="/">Careers</Link>
      </div>
      <div className="flex gap-5 ">
        <AiOutlineFacebook className="w-6 h-6 cursor-pointer" />
        <AiFillInstagram className="w-6 h-6 cursor-pointer" />
        <AiOutlineTwitter className="w-6 h-6 cursor-pointer" />
      </div>
      {/* <div className="flex gap-10"> */}

      <div className="flex flex-col sm:text-xs  justify-center items-center w-full gap-2 py-2 bg-[#e4816b] sm:flex-row">
        <p>Designed and developed by Jacob Dunbar -</p>
        <Link href="https://jacobdunbar.com" className="font-semibold ">
          www.jacobdunbar.com
        </Link>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Footer;
