import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuant, setTotalQuant] = useState();

  let foundProduct;
  let index;

  const onAdd = (product) => {
    const checkProductInCart = cartItems.find(
      (item) => item.product._id === product._id
    );

    if (checkProductInCart) {
      toast.success(`${product.name} is already in your basket.`);
      console.log(cartItems.length);
    } else {
      setCartItems([...cartItems, { product }]);
      setTotalPrice((prevTotal) => prevTotal + product.price);
      console.log(cartItems.length);
      toast.success(`${product.name} was added to your basket.`);
    }
  };

  const onRemove = (product) => {
    foundProduct = cartItems.find(
      (item) => item.product._id === product.product._id
    );

    const newCartItems = cartItems.filter(
      (item) => item.product._id !== product.product._id
    );

    setTotalPrice((prevPrice) => prevPrice - product.product.price);
    setTotalQuant((prevTotal) => prevTotal - 1);
    setCartItems(newCartItems);
    console.log(newCartItems);
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuant,
        onAdd,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
