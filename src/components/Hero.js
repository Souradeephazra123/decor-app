import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className=" w-full h-[500px]  flex justify-center items-center ">
      <div className="w-1/2 h-full ">
        <Image
          src={"/home/decoration-home.jpg"}
          width={900}
          height={500}
          alt="hero-img"
          className=" w-full h-[500px] object-cover "
        />
      </div>
      <div className="w-1/2 h-full flex flex-col gap-10 justify-around bg-sky-600 text-gray-200 p-12">
        <p className=" font-bold text-4xl">Designer Spotlight</p>
        <p className=" font-bold text-xl">Tyan Hogg</p>
        <p>
          Designer Ryann Swan Hackett is known for mixing antiques into her
          thoughtful, tailored and curated designs. Ryann’s work has been
          featured in various publications, including Architectural Digest, LUXE
          Interiors + Design, Southern Living, and House Beautiful. We sat down
          with Ryann to discuss how she adds unique auction and consignment
          finds into her projects.
        </p>
        <Link
          href="/the-reserve"
          className=" z-10  "
        >
          <button className="rounded-md px-10 py-1.5 bg-blue-700 w-fit ">
            Shop Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Hero;
