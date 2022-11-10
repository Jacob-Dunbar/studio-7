import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState();
  const [totalQuant, setTotalQuant] = useState();

  const onAdd = (product) => {
    //fix this next, why doesnt it detect that there is the product already in cart, look up .find
    const checkProductInCart = cartItems.find(
      (item) => item._id === product._id
    );

    setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price);

    if (checkProductInCart === true) {
      toast.success(`${product.name} is already in your basket.`);
      console.log();
    } else {
      setCartItems([...cartItems, { product }]);
      toast.success(`${product.name} was added to your basket.`);
      console.log(cartItems);
    }
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuant,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
