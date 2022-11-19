import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  // Set show cart here not in navbar because we open from outside navbar
  const [showCart, setShowCart] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Local storage

  // Cart items

  useEffect(() => {
    const data = window.localStorage.getItem("STUDIO_7_CART_ITEMS");
    setCartItems(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "STUDIO_7_CART_ITEMS",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  // Total price

  useEffect(() => {
    const data = window.localStorage.getItem("STUDIO_7_TOTAL_PRICE");
    setTotalPrice(JSON.parse(data));
  }, []);

  useEffect(() => {
    window.localStorage.setItem(
      "STUDIO_7_TOTAL_PRICE",
      JSON.stringify(totalPrice)
    );
  }, [totalPrice]);

  // Add to cart function
  // Check if the class is already in the cart
  const onAdd = (product) => {
    const checkProductInCart = cartItems
      ? cartItems.find((item) => item._id === product._id)
      : "";

    // If it is say already in, if not add it, update totalItems and totalPrice and confirm
    if (checkProductInCart) {
      toast.success(`${product.name} is already in your basket.`);
    } else {
      setCartItems([...cartItems, { ...product }]);
      setTotalPrice((prevTotal) => prevTotal + product.price);
      toast.success(`${product.name} was added to your basket.`);
    }
  };

  // Remove from cart function

  const onRemove = (product) => {
    // Create new array from old array with current class filterd out
    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    // Take away price of current product from total
    setTotalPrice((prevPrice) => prevPrice - product.price);

    // Set cartItems to newCartItems array
    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        showMenu,
        setShowMenu,
        cartItems,
        totalPrice,

        onAdd,
        onRemove,
        setCartItems,
        setTotalPrice,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
