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
  const { totalPrice, cartItems, setShowCart, onRemove } = useStateContext();
  const { user, error, isLoading } = useUser();

  // Sort cart into groups
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

    groupedSessionsArr.map(
      (group) => group.length > 0 && truthyGroupSessionsArr.push(group)
    );

    return truthyGroupSessionsArr;
  };

  const groupArr = groupSessions(cartItems);

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
    <div
      className="fixed top-0 right-0 z-10 flex flex-col w-full h-full bg-red-500 "
      ref={cartRef}
    >
      <div className="flex items-center justify-between px-4 py-4 bg-red-400">
        {/* Logo */}
        <p>
          <Link href="/">
            <h1
              onClick={() => setShowCart(false)}
              className="text-3xl font-medium"
            >
              STUDIO 7
            </h1>
          </Link>
        </p>
        {/* Close */}
        <AiOutlineClose
          className="w-8 h-8"
          onClick={() => setShowCart(false)}
        />
      </div>

      <div className="flex flex-col justify-start flex-grow py-4 bg-yellow-100">
        <div>
          {user && <h1>Hello {user.given_name}</h1>}
          <h2 className="px-4 text-xl">Your Basket :</h2>
        </div>
        <div className="flex flex-col items-center gap-4 my-4">
          {/* Card contents - empty */}
          {cartItems.length < 1 && (
            // Container
            <div className="flex flex-col items-center gap-4 ">
              {/* Icon and tagline */}
              <AiOutlineShopping className="w-12 h-12 " />
              <h3 className="text-lg ">Your basket is empty</h3>
              {/* Continue shopping button  */}
              <button className="button" onClick={() => setShowCart(false)}>
                <Link href="/"> Continue shopping</Link>
              </button>
            </div>
          )}
          {/* Card contents - full */}
          {cartItems.length >= 1 &&
            groupArr.map((group) => (
              <div>
                <Link href={`/product/${group[0].class}`}>
                  <h1 onClick={() => setShowCart(false)}>{group[0].name}</h1>
                </Link>
                <Link href={`/product/${group[0].class}`}>
                  <img
                    onClick={() => setShowCart(false)}
                    src={urlFor(group[0].image && group[0].image)}
                    alt="class thumbnail"
                  />
                </Link>

                {group.map((session) => (
                  <div>
                    <p>
                      {date
                        .addDays(session.number)
                        .toLocaleDateString("en-GB", options)}
                    </p>
                    <p>{session.time}</p>
                    <p>£{session.price}</p>
                    <button onClick={() => onRemove(session)} type="button">
                      <TiDeleteOutline />
                    </button>
                  </div>
                ))}
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="flex flex-col justify-end flex-grow gap-4 px-4 bg-blue-300">
            <h3 className="text-2xl ">Total : £{totalPrice}</h3>
            {!user && <h4>Please login to checkout with Stripe</h4>}
            {user ? (
              <button className="button" type="button" onClick={handleCheckout}>
                Pay with Stripe
              </button>
            ) : (
              <Link href="/api/auth/login">
                <button className="button" type="button">
                  Login
                </button>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
