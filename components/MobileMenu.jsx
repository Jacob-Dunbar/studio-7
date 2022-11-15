import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { useUser } from "@auth0/nextjs-auth0";

const MobileMenu = (props) => {
  const { user, error, isLoading } = useUser();
  console.log(user);
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
        {!user ? (
          <Link href="/api/auth/login">
            <h1 onClick={() => props.close(false)} className="text-4xl ">
              login
            </h1>
          </Link>
        ) : (
          <div>
            <img src={user.picture} alt="user profile picture" />
            <h1>{user.given_name}</h1>
            <Link href="/api/auth/logout">
              <h1 onClick={() => props.close(false)} className="text-4xl ">
                log out
              </h1>
            </Link>
          </div>
        )}
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
        <Link href={"#about"}>
          <h1 onClick={() => props.close(false)} className="text-4xl ">
            about
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default MobileMenu;
