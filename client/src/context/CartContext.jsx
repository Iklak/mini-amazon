import { createContext, useEffect, useState } from "react";
import { getCart } from "../services/cart";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartCount, setCartCount] = useState(0);
  const fetchCart = async () => {
    try {
      const data = await getCart();
      setCartCount(data.totalItem);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCart();
  }, [cartCount]);
  return (
    <CartContext.Provider
      value={{
        cartCount,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
