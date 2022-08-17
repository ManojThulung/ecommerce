import React from "react";

import { client } from "../lib/client";
import {
  HeroBanner,
  NavBar,
  Layout,
  FooterBanner,
  Product,
} from "../components";

function Home({ products, bannerData }) {
  return (
    <div>
      <HeroBanner bannerData={bannerData.length && bannerData[0]} />
      <div className="products-heading">
        <h2>Best Selling Product</h2>
        <p>Speakers of Many variations</p>
      </div>
      <div className="product-container">
        {/*the question marks is given to make sure the proudcts has value. */}
        {products?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);
  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
