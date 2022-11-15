import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { useUser } from "@auth0/nextjs-auth0";

const MobileMenu = (props) => {
  const { user, error, isLoading } = useUser();
  console.log(user);
  return (
    // Container
    <div className="absolute flex flex-col justify-start items-center bottom-0 left-0 w-full h-[90%] bg-opacity-50  bg-white">
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
          <div className="pl-1 ">
            <img
              className="pl-1 mb-5 rounded-full"
              src={user.picture}
              alt="user profile picture"
            />
            <div className="flex gap-1 text-lg mb-9">
              <p>Hello, </p>
              <span className="font-bold ">{user.given_name}</span>
            </div>
          </div>
        )}
        <Link href="/">
          <h1 onClick={() => props.close(false)} className="text-4xl ">
            Home
          </h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>
        <Link href={"#about"}>
          <h1 onClick={() => props.close(false)} className="text-4xl ">
            About Us
          </h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>
        <Link href="/classes">
          <h1 onClick={() => props.close(false)} className="text-4xl ">
            Classes
          </h1>
        </Link>
        <div className="w-2 h-2 bg-black rounded-full "></div>

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
