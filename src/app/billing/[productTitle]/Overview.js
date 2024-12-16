"use client";
import React from "react";

const Overview = ({ price }) => {
  return (
    <div>
      <p className=" flex justify-between">
        <span>Your Offers(-10% offers) </span> <span>$ {price}</span>
      </p>
      <p className=" flex justify-between">
        <span>SubTotal</span> <span>$ {price}</span>
      </p>
      <p className=" flex justify-between">
        <span>Sales Tax</span> <span>$ 0.00</span>
      </p>
      <p className=" flex justify-between">
        <span>Processing fee</span> <span>TBD</span>
      </p>
      <p className=" flex justify-between">
        <span>Total</span> <span>$ {price}</span>
      </p>
    </div>
  );
};

export default Overview;
