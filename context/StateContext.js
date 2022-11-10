import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuant, setTotalQuant] = useState();

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuant,
      }}
    >
      {children}
    </Context.Provider>
  );
};
