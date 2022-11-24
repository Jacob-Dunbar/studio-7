import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineLeft,
  AiOutlineShopping,
  AiOutlineClose,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import Button from "../components/Button";
import { useUser } from "@auth0/nextjs-auth0";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, cartItems, setShowCart, onRemove, showCart } =
    useStateContext();
  const { user, error, isLoading } = useUser();

  // Sort cart into groups

  // Create empty group arrays

  const groupSessions = (cartItems) => {
    let bodybuilding = [];
    let ashtanga = [];
    let row = [];
    let stretch = [];
    let spin = [];
    let killer = [];
    let bJitsu = [];
    let sweat = [];
    let bThai = [];
    let take = [];
    let hatha = [];
    let spirit = [];
    let iThai = [];
    let iJitsu = [];
    let gymtastic = [];
    let burn = [];
    let bodyweight = [];

    // Push each cart item into correct array
    cartItems.map((item) => {
      if (item.class === "bodybuilding-foundations") {
        bodybuilding.push(item);
      } else if (item.class === "ashtanga-yoga") {
        ashtanga.push(item);
      } else if (item.class === "row-your-boat") {
        row.push(item);
      } else if (item.class === "stretch-armstrong") {
        stretch.push(item);
      } else if (item.class === "spin-that") {
        spin.push(item);
      } else if (item.class === "killer-circuits") {
        killer.push(item);
      } else if (item.class === "beginners-jiu-jitsu") {
        bJitsu.push(item);
      } else if (item.class === "sweat-rep-repeat") {
        sweat.push(item);
      } else if (item.class === "beginners-muay-thai") {
        bThai.push(item);
      } else if (item.class === "take-60") {
        take.push(item);
      } else if (item.class === "hatha-yoga") {
        hatha.push(item);
      } else if (item.class === "spirit-food") {
        spirit.push(item);
      } else if (item.class === "intermediate-muay-thai") {
        iThai.push(item);
      } else if (item.class === "intermediate-jiu-jitsu") {
        iJitsu.push(item);
      } else if (item.class === "gymtastic-gymnastics") {
        gymtastic.push(item);
      } else if (item.class === "burn") {
        burn.push(item);
      } else if (item.class === "bodyweight-blaster") {
        bodyweight.push(item);
      }
    });

    // Create array of group arrays
    const groupedSessionsArr = [
      bodybuilding,
      ashtanga,
      row,
      stretch,
      spin,
      killer,
      bJitsu,
      sweat,
      bThai,
      take,
      hatha,
      spirit,
      iThai,
      iJitsu,
      gymtastic,
      burn,
      bodyweight,
    ];

    const truthyGroupSessionsArr = [];

    // Push only the groups with cart items into a new array
    groupedSessionsArr.map(
      (group) => group.length > 0 && truthyGroupSessionsArr.push(group)
    );

    // Make sure sessions are in correct order

    truthyGroupSessionsArr.map((group) =>
      group.sort((a, b) => {
        return a.number - b.number;
      })
    );

    return truthyGroupSessionsArr;
  };

  const groupArr = cartItems ? groupSessions(cartItems) : undefined;

  // Options object for toLocaleDateString method to format date
  const options = {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  };

  // add days to date
  Date.prototype.addDays = function (days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
  };

  // current date
  const date = new Date();

  // console.log(date.addDays(5).toLocaleDateString("en-GB", options));

  // Handle checkout function
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    // Container
    <div
      className={
        showCart
          ? "fixed ease-in  duration-300 sm:w-1/4 top-0 right-0 z-10 flex flex-col w-screen h-full sm:overflow-hidden overflow-scroll bg-gray-100 min-h-none"
          : "fixed ease-in  duration-300 sm:w-1/4 top-[-100%] right-0 z-10 flex flex-col w-screen sm:overflow-hidden h-full overflow-scroll bg-gray-100 min-h-none"
      }
      ref={cartRef}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 sm:justify-end ">
        {/* Logo */}

        <Link href="/">
          <h1
            onClick={() => setShowCart(false)}
            className="pt-1 text-4xl font-semibold tracking-wider sm:hidden font-PlayfairDisplay"
          >
            STUDIO 7
          </h1>
        </Link>

        {/* Close */}
        <AiOutlineClose
          className="w-8 h-8 cursor-pointer sm:w-6 sm:h-6"
          onClick={() => setShowCart(false)}
        />
      </div>
      {/* Main cart */}
      <div className="flex flex-col justify-start flex-grow w-full h-full py-4 overflow-scroll sm:pb-4 sm:pt-0 sm:overflow-hidden">
        {/* Hello user and basket intro */}

        <div>
          <h2 className="px-4 text-xl sm:text-lg">
            {user ? user.given_name + "'s" : "Your"} Basket :
          </h2>
        </div>
        <div className="flex flex-col items-center h-full gap-4 my-4 ">
          {/* Card contents - empty */}
          {!cartItems ||
            (cartItems.length < 1 && (
              // Container
              <div className="flex flex-col items-center justify-between w-full h-full ">
                <div className="flex flex-col items-center w-full gap-4 py-5 justify-self-end ">
                  {/* Icon and tagline */}
                  <AiOutlineShopping className="w-16 h-16 sm:w-12 sm:h-12" />
                  <h3 className="text-lg sm:text-base ">
                    Your basket is empty
                  </h3>
                  {/* Continue shopping button  */}
                </div>
                <button
                  className="button w-[95%] sm:w-[60%] sm:text-sm sm:bg-transparent sm:hover:bg-[#e4816b] sm:text-[#e4816b] sm:hover:text-white  self-center"
                  onClick={() => setShowCart(false)}
                >
                  <Link href="/"> Continue shopping</Link>
                </button>
              </div>
            ))}
          {/* Card contents - full */}
          <div className="flex flex-col w-screen gap-5 sm:gap-3 sm:w-full ">
            {cartItems &&
              // Group
              groupArr.map((group, i) => (
                // Divider dot
                <div key={i} className="flex flex-col justify-center">
                  {i > 0 && (
                    <div className="self-center w-[8px] h-[8px] sm:w-[6px] sm:h-[6px] bg-gray-800 mb-5 sm:mb-3 rounded-full "></div>
                  )}

                  <div className="flex w-screen gap-4 px-4 py-4 sm:w-full bg-gray-50">
                    <Link href={`/product/${group[0].class}`}>
                      <img
                        className="object-cover w-20 h-20 rounded-full cursor-pointer aspect-square"
                        onClick={() => setShowCart(false)}
                        src={urlFor(group[0].image && group[0].image)}
                        alt="class thumbnail"
                      />
                    </Link>
                    <div className="flex-grow ">
                      <Link href={`/product/${group[0].class}`}>
                        <h1
                          className="mb-4 text-2xl font-semibold cursor-pointer sm:mb-2 sm:text-lg font-PlayfairDisplay"
                          onClick={() => setShowCart(false)}
                        >
                          {group[0].name}
                        </h1>
                      </Link>
                      {/* sessions */}
                      <div className="flex flex-col w-full gap-2 ">
                        {group.map((session, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between w-full "
                          >
                            <p className="text-md sm:text-sm ">
                              {date
                                .addDays(session.number)
                                .toLocaleDateString("en-GB", options)}
                            </p>
                            <div className="self-center w-[6px] h-[6px] sm:w-[4px] sm:h-[4px] bg-gray-500 rounded-full "></div>

                            <p className="text-md sm:text-sm">{session.time}</p>
                            <div className="self-center w-[6px] h-[6px] sm:w-[4px] sm:h-[4px] bg-gray-500 rounded-full "></div>
                            <p className="text-md sm:text-sm">
                              £{session.price}
                            </p>
                            <button
                              onClick={() => onRemove(session)}
                              type="button"
                            >
                              <TiDeleteOutline className="w-7 h-7 sm:w-5 sm:h-5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <div className="flex flex-col items-center justify-end flex-grow gap-3 ">
          {cartItems.length > 0 && (
            <div className="flex flex-col w-full gap-4 px-4 ">
              <h3 className="text-2xl sm:text-lg ">Total : £{totalPrice}</h3>

              {user ? (
                <button
                  className="button w-[95%] sm:text-sm sm:bg-transparent sm:hover:bg-[#e4816b] sm:text-[#e4816b] sm:hover:text-white  self-center"
                  type="button"
                  onClick={handleCheckout}
                >
                  Pay with Stripe
                </button>
              ) : (
                <Link href="/api/auth/login">
                  <button
                    className="button w-[95%] sm:text-sm sm:w-[95%] sm:bg-transparent sm:hover:bg-[#e4816b] sm:text-[#e4816b] sm:hover:text-white  self-center"
                    type="button"
                  >
                    Login to checkout
                  </button>
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
