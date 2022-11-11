import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
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

  let foundProduct;
  let index;

  const onAdd = (product) => {
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    if (checkProductInCart) {
      toast.success(`${product.name} is already in your basket.`);
      console.log(cartItems.length);
    } else {
      setCartItems([...cartItems, { ...product }]);
      setTotalPrice((prevTotal) => prevTotal + product.price);
      console.log(cartItems.length);
      toast.success(`${product.name} was added to your basket.`);
    }
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find((item) => item._id === product._id);

    const newCartItems = cartItems.filter((item) => item._id !== product._id);

    setTotalPrice((prevPrice) => prevPrice - product.price);

    setCartItems(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
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
