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

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, cartItems, setShowCart, onRemove } = useStateContext();

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
            <h1 className="text-3xl font-medium">STUDIO 7</h1>
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
            cartItems.map((item) => (
              <div
                className="flex justify-start w-full gap-4 px-4 py-4 bg-slate-500"
                key={item._id}
              >
                {/* Thumbmnail */}
                <img
                  className="w-20 h-20 rounded-full "
                  src={urlFor(item.image[0])}
                  alt=""
                />
                {/* Item details */}
                <div className="flex flex-col flex-grow gap-2 bg-slate-600">
                  {/* Heading */}
                  <h5 className="text-2xl ">{item.name}</h5>
                  {/* Details */}
                  <div className="flex justify-between gap-4">
                    <div className="flex flex-grow gap-2">
                      <h4>4th May</h4>
                      <h4>1pm</h4>
                      <h4>£{item.price}</h4>
                    </div>
                    {/* delete */}
                    <button onClick={() => onRemove(item)} type="button">
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className="flex flex-col justify-end flex-grow gap-4 px-4 bg-blue-300">
            <h3 className="text-2xl ">Total : £{totalPrice}</h3>

            <button className="button" type="button" onClick={handleCheckout}>
              Pay with Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
