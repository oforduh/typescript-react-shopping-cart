import { createContext, ReactNode, useContext, useState } from "react";
import ShoppingCart from "../components/shoppingCart/ShoppingCart";
import { useLocalStorage } from "../hook/UseLocalStorage";


type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  getItemQuantity: (id: number) => number;
  increaseCardQuantity: (id: number) => void;
  decreaseCardQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  openCart: () => void;
  closeCart: () => void;
  cartQuantity: number;
  cartItems: CartItem[];
};
type CartItem = {
  id: number;
  quantity: number;
};

// create a context and export it
export const shoppingCartContext = createContext({} as ShoppingCartContext);

export const ShoppingCartObject = () => {
  const {
    getItemQuantity,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromCart,
    cartQuantity,
    cartItems,
    openCart,
    closeCart,
  } = useContext(shoppingCartContext);
  return {
    getItemQuantity,
    increaseCardQuantity,
    decreaseCardQuantity,
    removeFromCart,
    cartQuantity,
    cartItems,
    openCart,
    closeCart,
  };
};

// export a loader provider
export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    "shopping-cart",
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const getItemQuantity = (id: number) => {
    // The find() method returns the first element in the provided array that satisfies the provided testing function.
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  };

  const increaseCardQuantity = (id: number) => {
    setCartItems((currItems) => {
      // check if the item is not included in the cartItems array, then it add it to the array and increase the quantity
      if (currItems.find((item) => item.id === id) == null) {
        return [...currItems, { id, quantity: 1 }];
      } else {
        return currItems.map((item) => {
          // check if the item is included in the cartItems array, then  add it to the array and increase the quantity
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const decreaseCardQuantity = (id: number) => {
    setCartItems((currItems) => {
      // check if the item is included in the cartItems array, then filter it from the array and decrease the quantity
      if (currItems.find((item) => item.id === id)?.quantity == 1) {
        return currItems.filter((item) => item.id !== id);
      } else {
        return currItems.map((item) => {
          // check if the item is included in the cartItems array, then  add it to the array and increase the quantity
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((currItems) => {
      return currItems.filter((item) => item.id !== id);
    });
  };

  const cartQuantity = cartItems.reduce(
    (total, item) => item.quantity + total,
    0
  );

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };
  return (
    <shoppingCartContext.Provider
      value={{
        getItemQuantity,
        increaseCardQuantity,
        decreaseCardQuantity,
        removeFromCart,
        cartQuantity,
        cartItems,
        openCart,
        closeCart,
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen} />
    </shoppingCartContext.Provider>
  );
};
