import React from "react";

import { HeroBanner, NavBar, Layout, FooterBanner } from "../components";

function Home() {
  return (
    <div>
      <HeroBanner />
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speakers of Many variations</p>
      </div>
      <div className="product-container">
        {["proudct1", "product2"].map((product) => product)}
      </div>
      <FooterBanner />
    </div>
  );
}

export default Home;
