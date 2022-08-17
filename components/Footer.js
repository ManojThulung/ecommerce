import React from "react";
import { AiOutlineInstagram, AiFillTwitterSquare } from "react-icons/ai";

function Footer() {
  return (
    <div className="footer-container">
      <p className="icons">
        <AiOutlineInstagram />
        <AiFillTwitterSquare />
      </p>
      <p>2022 Musico All rights reserved</p>
    </div>
  );
}

export default Footer;
