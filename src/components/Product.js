"use client";

import Image from "next/image";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { useRouter } from "next/navigation";

const Modal = ({ price, onclick, productTitle }) => {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = React.useState(null);

  function sanitizeURL(url) {
    return url.replace(/ /g, "-").toLowerCase();
  }

  const { handleSubmit, setValue, watch, control, trigger } = useForm({
    mode: "onChange",
  });
  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  const onSubmit = (formData) => {
    console.log("contact form", formData);
    localStorage.setItem("offer", JSON.stringify(formData.offer));
    router.push(`/billing/${sanitizeURL(productTitle)}`);
  };

  const halfPrice = price / 2;

  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center z-50 bg-gray-100 bg-opacity-40">
      <div className=" relative  bg-gray-200 flex flex-col gap-2 p-6 z-50 rounded-md border-[0.6px] border-[#9E9E9E] shadow-md ">
        <IoClose
          size={20}
          className=" absolute top-2 right-2 cursor-pointer"
          onClick={onclick}
        />
        <div className=" flex flex-col gap-4">
          {" "}
          <div className=" flex flex-col gap-2">
            <p>Make an Offer</p>
            <p>Asking price: ${price}</p>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" flex flex-col gap-4"
          >
            <div className=" grid grid-cols-3 gap-4">
              <div
                onClick={() => {
                  setSelectedTab(1);
                  setValue("offer", (+price - (price * 15) / 100).toFixed(2), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  trigger("offer");
                }}
                className={`${
                  selectedTab === 1 ? " bg-blue-500" : ""
                }  text-center border border-black`}
              >
                <p>${+price - (price * 15) / 100}</p>
                <p>15% off</p>
              </div>
              <div
                onClick={() => {
                  setSelectedTab(2);
                  setValue("offer", (+price - (price * 10) / 100).toFixed(2), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  trigger("offer");
                }}
                className={`${
                  selectedTab === 2 ? " bg-blue-500" : ""
                }  text-center border border-black`}
              >
                <p>${+price - (price * 10) / 100}</p>
                <p>10% off</p>
              </div>
              <div
                onClick={() => {
                  setSelectedTab(3);
                  setValue("offer", (+price - (price * 5) / 100).toFixed(2), {
                    shouldValidate: true,
                    shouldDirty: true,
                  });
                  trigger("offer");
                }}
                className={`${
                  selectedTab === 3 ? " bg-blue-500" : ""
                }  text-center border border-black`}
              >
                <p>${+price - (price * 5) / 100}</p>
                <p>5% off</p>
              </div>
            </div>

            <p>Or create your own offer</p>
            <div className=" flex gap-0">
              <div className=" p-2 border-r">$</div>
              <Controller
                name={"offer"}
                control={control}
                defaultValue={""}
                rules={{
                  required: `Offer price must be greater than ${halfPrice}`,
                  validate: (value) =>
                    value >= halfPrice ||
                    `Offer price must be greater than ${halfPrice}`,
                }}
                render={({ field }) => (
                  <div className=" flex flex-col gap-2">
                    <input
                      {...field}
                      type="text"
                      onSelect={() => setSelectedTab(null)}
                      placeholder="Your offer"
                      className=" w-full bg-Black rounded-lg p-2 placeholder:text-Grey-7"
                    />
                    {errors.offer && (
                      <p className=" text-red-600">{errors.offer.message}</p>
                    )}
                  </div>
                )}
              />
              <div className=" p-2 border-l">% off</div>
            </div>
            <p>You'll only be charged of the seller accepts your offer</p>
            <button
              disabled={pending || !isDirty || !isValid}
              type="submit"
              className=" px-10 py-2.5 bg-gray-500"
            >
              Review Offer
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Product = ({ getProduct }) => {
  const [modal, SetModal] = React.useState(false);

  return (
    <div className=" w-full text-black flex gap-10 px-14">
      <div className=" w-1/2">
        <Image
          src={getProduct.img}
          width={700}
          height={500}
          alt="product"
          className=" w-full h-[500px]"
        />
      </div>
      <div className=" w-1/2 flex flex-col justify-around">
        <div>
          <p className=" text-3xl font-bold">{getProduct.title}</p>
          <p className=" text-lg  text-sky-300">{getProduct.city}</p>
        </div>
        <p>${getProduct.price}</p>
        <div className=" flex flex-col gap-4">
          <button className=" bg-blue-900 text-white font-bold py-1.5 rounded-md">
            ADD TO CART
          </button>
          <button
            onClick={() => {
              SetModal(true);
            }}
            className=" text-center bg-blue-900 text-white font-bold py-1.5 rounded-md"
          >
            MAKE AN OFFER
          </button>
        </div>
      </div>

      {modal && (
        <Modal
          onclick={() => SetModal(false)}
          price={getProduct?.price}
          productTitle={getProduct.title}
        />
      )}
    </div>
  );
};

export default Product;
