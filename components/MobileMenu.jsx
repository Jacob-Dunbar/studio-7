import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { useUser } from "@auth0/nextjs-auth0";

const MobileMenu = (props) => {
  const { user, error, isLoading } = useUser();

  return (
    // Container
    <div className="fixed flex flex-col justify-start items-center bottom-0 left-0 w-full h-[90%] backdrop-blur-3xl   backdrop-brightness-150 ">
      {/* Close icon */}
      <div
        onClick={() => props.close(false)}
        className="flex justify-end w-full px-4 py-4 "
      >
        <AiOutlineClose className="w-8 h-8" />
      </div>

      {/* Menu */}

      <div className="flex flex-col items-center justify-center flex-grow w-full gap-6 ">
        {user && (
          <div className="flex flex-col items-center w-full gap-5 pl-1">
            <div className="flex items-center justify-center bg-gray-400 bg-opacity-50 rounded-full w-fit aspect-square ">
              <h1 className="p-5 text-4xl ">{user.given_name.charAt(0)}</h1>
            </div>
            <div className="flex gap-1 text-lg mb-9">
              <p>Hello, </p>
              <span className="font-bold ">{user.given_name}</span>
            </div>
          </div>
        )}
        <Link href="/">
          <h1
            onClick={() => props.close(false)}
            className="text-4xl font-medium tracking-wider font-PlayfairDisplay"
          >
            Home
          </h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>
        <Link href={"#about"}>
          <h1
            onClick={() => props.close(false)}
            className="text-4xl font-medium tracking-wider font-PlayfairDisplay "
          >
            About Us
          </h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>
        <Link href="/classes">
          <h1
            onClick={() => props.close(false)}
            className="mb-8 text-4xl font-medium tracking-wider font-PlayfairDisplay "
          >
            Classes
          </h1>
        </Link>
        {/* <div className="w-2 h-2 bg-black rounded-full "></div> */}

        {/* login / out */}
        {!user ? (
          <Link href="/api/auth/login">
            <h1
              onClick={() => props.close(false)}
              className="w-1/3 mt-6 button"
            >
              Log in
            </h1>
          </Link>
        ) : (
          <Link href="/api/auth/logout">
            <h1
              className="w-1/3 mt-6 button"
              onClick={() => props.close(false)}
            >
              Log out
            </h1>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
