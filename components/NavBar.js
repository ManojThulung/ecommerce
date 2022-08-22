import React from "react";
import Link from "next/link";
import Cart from "./Cart";

import { AiOutlineShoppingCart } from "react-icons/ai";
import { useStateContext } from "../context/StateContext";

function NavBar() {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Musico</Link>
      </p>
      <button
        type="button"
        className="cart-icon"
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
}

export default NavBar;
