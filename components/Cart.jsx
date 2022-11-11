import { useRef } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import toast from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";

const Cart = () => {
  const cartRef = useRef();
  const { totalPrice, cartItems, setShowCart, onRemove } = useStateContext();

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
    <div className="fixed right-0 z-10 h-screen bg-red-500 " ref={cartRef}>
      <div>
        <button type="button" onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span>Your Cart</span>
          <span>{cartItems.length} items</span>
        </button>

        {cartItems.length < 1 && (
          <div>
            <AiOutlineShopping />
            <h3>Your basket is empty</h3>
            <Link href="/">
              <button type="button" onClick={() => setShowCart(false)}>
                Continue shopping
              </button>
            </Link>
          </div>
        )}

        <div>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div key={item._id}>
                <img className=" w-28" src={urlFor(item.image[0])} alt="" />
                <h5>{item.name}</h5>
                <h4>£{item.price}</h4>
                <div>
                  <button onClick={() => onRemove(item)} type="button">
                    <TiDeleteOutline />
                  </button>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div>
            <h3>Sub total</h3>
            <h3>£{totalPrice}</h3>{" "}
            <button type="button" onClick={handleCheckout}>
              Pay with Stripe
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
