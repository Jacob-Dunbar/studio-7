import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

const MobileMenu = (props) => {
  return (
    // Container
    <div className="absolute flex flex-col justify-start items-center bottom-0 left-0 w-full h-[90%] bg-slate-500">
      {/* Close icon */}
      <div
        onClick={() => props.close(false)}
        className="flex justify-end w-full px-4 py-4 bg-green-300 "
      >
        <AiOutlineClose className="w-8 h-8" />
      </div>
      {/* Menu */}
      <div className="flex flex-col items-center justify-center flex-grow w-full gap-6 bg-yellow-200">
        <Link href="/">
          <h1 onClick={() => props.close(false)} className="text-4xl ">
            Home
          </h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>
        <Link href="/">
          <h1 className="text-4xl ">About Us</h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>
        <Link href="/classes">
          <h1 onClick={() => props.close(false)} className="text-4xl ">
            Classes
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
