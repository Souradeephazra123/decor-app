import React from "react";
import Form from "./Form";
import Data from "../../../data/reserve-item.json";

const page = async ({searchParams}) => {
  const {  product, price } = await searchParams;

  function ResanitizeURL(url) {
    const simple = url.replace(/-/g, " ");
    const spacedSentence = simple.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    return spacedSentence;
  }

  const getProduct = Data.find((item) => item.title === ResanitizeURL(product));

  return (
    <div>
      <p className=" text-3xl font-bold">Checkout Page</p>
      <Form product={getProduct} price={price} />
    </div>
  );
};

export default page;
