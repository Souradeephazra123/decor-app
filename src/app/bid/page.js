import React from "react";
import Bidding from "./Bidding";
import Data from "../../../data/reserve-item.json";
const page = async ({ searchParams, params }) => {

  const { type, product, price } = await searchParams;

  function ResanitizeURL(url) {
    const simple = url.replace(/-/g, " ");
    const spacedSentence = simple.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    return spacedSentence;
  }

  const getProduct = Data.find(
    (item) => item.title === ResanitizeURL(product)
  );


  return (
    <div>
      <Bidding type={type} product={getProduct} price={price} />
    </div>
  );
};

export default page;
