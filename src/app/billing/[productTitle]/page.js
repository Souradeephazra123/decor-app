import React from "react";
import Data from "../../../../data/reserve-item.json";
import WoocommerceIntegration from "./WoocommerceIntegration";
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

  return <WoocommerceIntegration getProduct={getProduct} />;
};

export default page;
