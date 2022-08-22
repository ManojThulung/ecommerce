import React, { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const Context = createContext();

//customer hook
export const useStateContext = () => useContext(Context);

function StateContext(props) {
  const [showCart, setShowCart] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantities, setTotalQuantities] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct;
  let index;

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

  // to remove the cart items
  const onRemove = (product) => {
    foundProduct = cartItem.find((item) => item._id === product._id);
    const newCartItem = cartItem.filter((item) => item._id !== product._id);

    setTotalPrice(
      (prevTotalPrice) =>
        prevTotalPrice - foundProduct.price * foundProduct.quantity
    );
    setTotalQuantities(
      (prevTotalQuantity) => prevTotalQuantity - foundProduct.quantity
    );
    setCartItem(newCartItem);
  };
  // to increase or decrease the products in the cart.
  const toggleCartItemQuantity = (id, value) => {
    foundProduct = cartItem.find((item) => item._id === id);
    index = cartItem.findIndex((item) => item._id === id);
    const newCartItem = cartItem.filter((item) => item._id !== id);

    if (value === "inc") {
      setCartItem([
        ...newCartItem,
        { ...foundProduct, quantity: foundProduct.quantity + 1 },
      ]);
      setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
      setTotalQuantities((prevTotalQuantity) => prevTotalQuantity + 1);
    } else if (value === "dec") {
      if (foundProduct.quantity > 1) {
        setCartItem([
          ...newCartItem,
          { ...foundProduct, quantity: foundProduct.quantity - 1 },
        ]);
        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
        setTotalQuantities((prevTotalQuantity) => prevTotalQuantity - 1);
      }
    }
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
        setShowCart,
        cartItem,
        totalPrice,
        totalQuantities,
        qty,
        toggleCartItemQuantity,
        incQty,
        decQty,
        onAdd,
        onRemove,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}

export default StateContext;
