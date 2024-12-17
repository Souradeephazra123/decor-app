import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = () => {
  const menu = ["THE RESERVE", "AUCTIONS", "BLOG", "ABOUT", "CONTACT"];

  function sanitizeURL(url) {
    return url.replace(/ /g, "-").toLowerCase();
  }
  return (
    <div className=" sticky top-0 z-50">
      {" "}
      <div
        className=" flex justify-between items-center  bg-white text-black px-20 py-10 shadow-md"
        role="navigation"
      >
        <Link href="/">
          {" "}
          <Image
            src={"/home/town-and-sea-logo@2x.svg"}
            width={300}
            height={30}
            alt="Logo"
          />
        </Link>

        <div>
          {menu.map((item, idx) => (
            <a key={idx} href={sanitizeURL(item)} className="px-4 py-2">
              {item}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
