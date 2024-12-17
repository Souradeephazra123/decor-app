import React from "react";
import Data from "../../../data/reserve-item.json";
import Image from "next/image";
import { CiHeart } from "react-icons/ci";
import Link from "next/link";
const page = () => {
  function sanitizeURL(url) {
    return url.replace(/ /g, "-").toLowerCase();
  }

  return (
    <div className=" flex flex-col gap-10 px-14">
      <div className=" bg-sky-800 bg-opacity-60 py-10 text-center text-4xl text-white">
        The Reserve
      </div>
      <div className=" flex flex-col gap-8 text-center px-20">
        <p className=" text-[#424B7B] text-4xl font-bold    ">
          Welcome to the Town & Sea Reserve
        </p>
        <p className=" text-lg">
          We are excited to share our curated collection of consignment items
          here on Town & Sea’s Reserve. All of these exceptional pieces are
          immediately available at the listed price.
        </p>
        <p className=" text-lg">
          Please contact us with any questions, offers, or shipping inquiries.
        </p>
      </div>
      <div className=" grid grid-cols-3 gap-4">
        {Data?.map((item, idx) => (
          <div
            key={idx}
            className=" bg-gray-300 p-4 rounded-md flex flex-col gap-1 "
          >
            <p>{item.city}</p>
            <div className=" relative w-full h-[300px] ">
              <Image
                src={item.img}
                width={200}
                height={400}
                className=" w-full h-[300px]"
                alt={item.title}
              />
              <CiHeart size={20} className=" absolute top-2 right-2" />
            </div>
            <p className=" text-blue-800">{item.description}</p>
            <p className=" text-green-700 ">${item.price}</p>
            <button className=" bg-blue-900 text-white font-bold py-1.5 rounded-md">
              ADD TO CART
            </button>
            <Link
              href={`/shop/${sanitizeURL(item.title)}`}
              className=" text-center bg-blue-900 text-white font-bold py-1.5 rounded-md relative z-10"
            >
              MAKE AN OFFER
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
