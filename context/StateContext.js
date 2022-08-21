import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

//customer hook
export const useStateContext = () => useContext(Context);

function StateContext(props) {
  const [showCart, setShowCart] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalPriice, setTotalPrice] = useState();
  const [totalQuantities, setTotalQuantities] = useState();
  const [qty, setQty] = useState(1);

  // to add product and quantity in the cart
  const onAdd = (product, quantity) => {
    // to check if the added item is alread in the cart or not
    const checkProductInCart = cartItem.find(
      (item) => item._id === product._id
    );

    setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + quantity);
    setTotalPrice(
      (prevTotalPrice) => prevTotalPrice + product.price * quantity
    );

    if (checkProductInCart) {
      //if the add item is already added to the cart
      // updated items in the cart
      const updateCartItem = cartItem.map((cartProduct) => {
        if (cartProduct._id === product._id)
          return {
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          };
      });

      setCartItem(updateCartItem);
    } else {
      //if the added item is new to the cart.
      product.quantity = quantity;

      setCartItem([...cartItem, { ...product }]);
    }

    toast.success(`${qty} ${product.name} added to the cart.`); //display popup message
  };

  // to increase the product quantity
  const incQty = () => {
    setQty((prevQty) => prevQty + 1);
  };

  // to decrease the product quantity
  const decQty = () => {
    setQty((prevQty) => {
      if (prevQty - 1 < 1) return 1;
      return prevQty - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        cartItem,
        totalPriice,
        totalQuantities,
        qty,
        incQty,
        decQty,
        onAdd,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default StateContext;
