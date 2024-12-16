import React from "react";
import Data from "../../../../data/reserve-item.json";
import Image from "next/image";
import Product from "@/components/Product";
const page = async ({ params }) => {
  const { productTitle } = await params;

  function ResanitizeURL(url) {
    const simple = url.replace(/-/g, " ");
    const spacedSentence = simple.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
    return spacedSentence;
  }

  const getProduct = Data.find(
    (item) => item.title === ResanitizeURL(productTitle)
  );

  return (
   <Product getProduct={getProduct} />
  );
};

export default page;
