import Link from "next/link";
import {
  AiFillInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="flex flex-col bg-[#e4816b] items-center justify-center sm:gap-3 gap-2 sm:h-40 sm:text-sm tems-center ">
      <div className="flex gap-2 mt-3 text-sm sm:mt-0 sm:gap-5 sm:text-lg">
        <Link href="/">House rules</Link>
        <Link href="/">Terms and conditions</Link>
        <Link href="/">Contact us</Link>
        <Link href="/">Careers</Link>
      </div>
      <div className="flex gap-5 ">
        <AiOutlineFacebook className="w-8 h-8 cursor-pointer" />
        <AiFillInstagram className="w-8 h-8 cursor-pointer" />
        <AiOutlineTwitter className="w-8 h-8 cursor-pointer" />
      </div>
      {/* <div className="flex gap-10"> */}
      <p className="-m-2 ">2022 Studio 7 All rights reserved</p>
      <div className="flex flex-col items-center gap-2 sm:flex-row">
        <p>Designed and developed by Jacob Dunbar</p>
        <Link href="https://jacobdunbar.com">www.jacobdunbar.com</Link>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Footer;
