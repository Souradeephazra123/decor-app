"use client";
import React, { useState } from "react";
import Overview from "./Overview";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WoocommerceIntegration = ({ getProduct }) => {
  const price = JSON.parse(localStorage?.getItem("offer"));

  //   const [loading, setLoading] = useState(false);
  //   const [error, setError] = useState(null);

  //   const handlePayment = async () => {
  //     setLoading(true);
  //     setError(null);

  //     try {
  //       const orderData = {
  //         payment_method: "bacs",
  //         payment_method_title: "Direct Bank Transfer",
  //         set_paid: true,
  //         billing: {
  //           Title: getProduct.title,
  //           description: getProduct.description,
  //           address_1: "969 Market",
  //           city: "San Francisco",
  //           state: "CA",
  //           postcode: "94103",
  //           country: "US",
  //           email: "buyer@yopmail.com",
  //           phone: "(555) 555-5555",
  //           price: getProduct.price,
  //         },
  //         line_items: [
  //           {
  //             product_id: getProduct.id,
  //             quantity: 1,
  //           },
  //         ],
  //       };

  //       alert("Order created successfully \n you have to set woocommerce creadential to really do payment" );
  //       const response = await api.post("orders", orderData);
  //       console.log("Order created successfully:", response);
  //       console.log("Order created successfully:", response.data);
  //     } catch (error) {
  //       console.error("Error creating order:", error.response.data);
  //       setError("Failed to create order. Please try again.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  function sanitizeURL(url) {
    return url.replace(/ /g, "-").toLowerCase();
  }

  const onSubmit = async () => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sendEmail`, {
        method: "POST",
        body: JSON.stringify({
          email: "seller@yopmail.com",
          link: `${
            process.env.NEXT_PUBLIC_APP_URL
          }/bid?type=seller&product=${sanitizeURL(
            getProduct.title
          )}&price=${price}`,
        }),
      });
      toast.success("Offer sent to seller successfully");
    } catch (error) {
      console.error("Error creating order:", error.response.data);
    }
  };

  return (
    <div className=" flex flex-col gap-6 px-14">
      <div className=" bg-sky-800 bg-opacity-60 py-10 text-center text-4xl text-white">
        Make an Offer
      </div>
      <p className="text-center">Integrates into Woocommerce </p>
      <p className="text-center">Stripe Checkout</p>
      <div className=" flex gap-7">
        <div className=" w-1/2 h-auto border border-black p-5">
          <p className=" text-3xl font-bold">Billing Details</p>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
        </div>
        <div className=" w-1/2 h-auto flex flex-col gap-10">
          <div className=" border border-black p-5">
            <p className=" text-3xl font-bold">Offer Summary</p>
            <p>Product Name:${getProduct.title}</p>
            <Overview price={price} />
          </div>
          <p>
            Contrary to popular belief, Lorem Ipsum is not simply random text.
            It has roots in a piece of classical Latin literature from 45 BC,
            making it over 2000 years old. Richard McClintock, a Latin professor
            at Hampden-Sydney College in Virginia, looked up one of the more
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and
            going through the cites of the word in classical literature,
            discovered the undoubtable source. Lorem Ipsum comes from sections
            1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes
            of Good and Evil) by Cicero, written in 45 BC. This book is a
            treatise on the theory of ethics, very popular during the
            Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit
            amet..", comes from a line in section 1.10.32.
          </p>
        </div>
      </div>
      {/* <div className=" flex justify-center items-center">
        <button
          className=" bg-blue-800 rounded-md px-6 py-1.5 text-white"
          onClick={handlePayment}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
        {error && <p>{error}</p>}
      </div> */}

      <div className=" flex justify-center items-center">
        <button
          onClick={onSubmit}
          className=" bg-blue-800 rounded-md px-6 py-1.5 text-white w-fit text-center"
        >
          Checkout
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default WoocommerceIntegration;
