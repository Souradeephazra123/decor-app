"use client";
import Image from "next/image";
import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { Controller, useForm, useFormState } from "react-hook-form";
import { CiHeart } from "react-icons/ci";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = ({ product, price }) => {
  const { handleSubmit, setValue, watch, control, trigger } = useForm({
    mode: "onChange",
  });
  const { pending } = useFormStatus();
  const { isDirty, isValid, errors } = useFormState({ control });

  function sanitizeURL(url) {
    return url.replace(/ /g, "-").toLowerCase();
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePayment = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const orderData = {
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        billing: {
          first_name: formData.first_name,
          last_name: formData.last_name,
          address_1: formData.address,
          city: formData.city,
          state: formData.state,
          postcode: formData.postcode,
          country: formData.country,
          email: formData.email,
          price: price,
        },
        line_items: [
          {
            product_id: product.id,
            quantity: 1,
          },
        ],
      };

      alert(
        "Order created successfully \n you have to set woocommerce creadential to really do payment"
      );
      toast.success("Order sent to buyer successfully");
      const response = await api.post("orders", orderData);
      console.log("Order created successfully:", response);
      console.log("Order created successfully:", response.data);
    } catch (error) {
      console.error("Error creating order:", error.response.data);
      setError("Failed to create order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

//   const onSubmit = async (formData) => {
//     await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/sendEmail`, {
//       method: "POST",
//       body: JSON.stringify({
//         email: "buyer@yopmail.com",
//         link: `${process.env.NEXT_PUBLIC_APP_URL}/bid?type=${getOppositeType(
//           type
//         )}&product=${sanitizeURL(product.title)}&price=${formData.offer}`,
//       }),
//     });
//     toast.success("Offer sent to buyer successfully");
//   };

  return (
    <div className="w-full flex gap-3">
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
      <div className="w-1/2">
        <form
          onSubmit={handleSubmit(handlePayment)}
          className=" flex flex-col gap-4"
        >
        <p>Please FIll out your billing details</p>
          <Controller
            name={"first_name"}
            control={control}
            defaultValue={""}
            rules={{
              required: "First Name is required",
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  required
                  placeholder="First Name"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.first_name && (
                  <p className=" text-red-600">{errors.first_name.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name={"last_name"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Last Name is required",
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  required
                  placeholder="Last Name"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.last_name && (
                  <p className=" text-red-600">{errors.last_name.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name={"address"}
            control={control}
            defaultValue={""}
            rules={{
              required: "Address is required",
            }}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  required
                  placeholder="Address 1"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.address && (
                  <p className=" text-red-600">{errors.address.message}</p>
                )}
              </div>
            )}
          />
          <Controller
            name={"City"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  placeholder="City"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.city && (
                  <p className=" text-red-600">{errors.city.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name={"state"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  placeholder="State"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.state && (
                  <p className=" text-red-600">{errors.state.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name={"postcode"}
            control={control}
            defaultValue={""}
            rules={
              {
                required: "Postal Code is required",
                pattern: {
                  value: /^\d{6}$/,
                  message: "Invalid Postal Code",
                },
              }
            }
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="number"
                  placeholder="Postal Code"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.postcode && (
                  <p className=" text-red-600">{errors.postcode.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name={"country"}
            control={control}
            defaultValue={""}
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  placeholder="Country"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.country && (
                  <p className=" text-red-600">{errors.country.message}</p>
                )}
              </div>
            )}
          />

          <Controller
            name={"email"}
            control={control}
            defaultValue={""}
            rules={
              {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Invalid email address",
                },
              }
            }
            render={({ field }) => (
              <div className=" flex flex-col gap-2">
                <input
                  {...field}
                  type="text"
                  placeholder="Email"
                  className=" w-full bg-Black  p-2 placeholder:text-Grey-7 border border-black"
                />
                {errors.email && (
                  <p className=" text-red-600">{errors.email.message}</p>
                )}
              </div>
            )}
          />

          <button disabled={pending} type="submit" className=" px-10 py-2.5 bg-gray-500">
            Checkout
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Form;
