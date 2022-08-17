import React from "react";
import Link from "next/link";

import { AiOutlineShoppingCart } from "react-icons/ai";

function NavBar() {
  return (
    <div className="navbar-container">
      <p className="logo">
        <Link href="/">Musico</Link>
      </p>
      <button type="button" className="cart-icon">
        <AiOutlineShoppingCart />
        <span className="cart-item-qty">1</span>
      </button>
    </div>
  );
}

export default NavBar;
