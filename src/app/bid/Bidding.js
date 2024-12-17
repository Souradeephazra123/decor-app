"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { CiHeart } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Bidding = ({ type, product, price }) => {
  const router = useRouter();
  const typeArr = ["buyer", "seller"];

  const [selectedTab, setSelectedTab] = React.useState(null);
  const getOppositeType = (type) => {
    return typeArr.filter((item) => item !== type)[0];
  };
  const { handleSubmit, setValue, watch, control, trigger } = useForm({
    mode: "onChange",
  });
  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  function sanitizeURL(url) {
    return url.replace(/ /g, "-").toLowerCase();
  }

  const onSubmit = async (formData) => {
    await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sendEmail`, {
      method: "POST",
      body: JSON.stringify({
        email: "buyer@yopmail.com",
        link: `${process.env.NEXT_PUBLIC_APP_URL}/bid?type=${getOppositeType(
          type
        )}&product=${sanitizeURL(product.title)}&price=${formData.offer}`,
      }),
    });
    toast.success("Offer sent to buyer successfully");
  };

  const halfPrice = product.price / 2;

  return (
    <div className=" w-full flex gap-3">
      <div className=" w-1/2">
        <div className=" bg-gray-300 p-4 rounded-md flex flex-col gap-1 ">
          <p>{product.city}</p>
          <div className=" relative w-full h-[300px] ">
            <Image
              src={product.img}
              width={200}
              height={400}
              className=" w-full h-[300px]"
              alt={product.title}
            />
            <CiHeart size={20} className=" absolute top-2 right-2" />
          </div>
          <p className=" text-blue-800">{product.description}</p>
          <p className=" text-green-700 ">${product.price}</p>
        </div>
      </div>
      <div className=" w-1/2 flex justify-center items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" flex flex-col gap-4"
        >
          <p>
            Price of {getOppositeType(type)}: {price}
          </p>
          <p>Please Bid your offer price</p>
          <div className=" grid grid-cols-3 gap-4">
            <div
              onClick={() => {
                setSelectedTab(1);
                setValue(
                  "offer",
                  (+product.price - (product.price * 15) / 100).toFixed(2),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
                trigger("offer");
              }}
              className={`${
                selectedTab === 1 ? " bg-blue-500" : ""
              }  text-center border border-black`}
            >
              <p>${+product.price - (product.price * 15) / 100}</p>
              <p>15% off</p>
            </div>
            <div
              onClick={() => {
                setSelectedTab(2);
                setValue(
                  "offer",
                  (+product.price - (product.price * 10) / 100).toFixed(2),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
                trigger("offer");
              }}
              className={`${
                selectedTab === 2 ? " bg-blue-500" : ""
              }  text-center border border-black`}
            >
              <p>${+product.price - (product.price * 10) / 100}</p>
              <p>10% off</p>
            </div>
            <div
              onClick={() => {
                setSelectedTab(3);
                setValue(
                  "offer",
                  (+product.price - (product.price * 5) / 100).toFixed(2),
                  {
                    shouldValidate: true,
                    shouldDirty: true,
                  }
                );
                trigger("offer");
              }}
              className={`${
                selectedTab === 3 ? " bg-blue-500" : ""
              }  text-center border border-black`}
            >
              <p>${+product.price - (product.price * 5) / 100}</p>
              <p>5% off</p>
            </div>
          </div>

          <p>Or create your own offer</p>
          <div className=" flex gap-0">
            <div className=" p-2 border border-black">$</div>
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
                    className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                  />
                  {errors.offer && (
                    <p className=" text-red-600">{errors.offer.message}</p>
                  )}
                </div>
              )}
            />
            <div className=" p-2 border border-black">% off</div>
          </div>
          <p>You'll only be charged of the seller accepts your offer</p>
          <button
            disabled={pending || !isDirty || !isValid}
            type="submit"
            className=" px-10 py-2.5 bg-gray-500"
          >
            Send Offer to Buyer
          </button>
          {type === "buyer" && (
            <button
              onClick={() => {
                router.push(
                  `/checkout?product=${sanitizeURL(
                    product.title
                  )}&price=${price}`
                );
              }}
              className=" px-10 py-2.5 bg-gray-500"
            >
              Checkout
            </button>
          )}
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Bidding;
