import React from "react";
import { Link, useLocation } from "react-router-dom";

export const Segments = () => {
  let location = useLocation().pathname.split("/").join("");
  const cLinkClass =
    "inline-flex text-[1.6em] text-center  font-normal cursor-pointer tracking-normal uppercase hover:text-[#000] ";
  return (
    <div className="min-h-[60px] pt-[20px] relative flex items-center justify-between w-full">
      <div className="m-auto py-[15px] w-full flex justify-center items-center">
        <Link
          to={"/cart"}
          className={
            location == "cart"
              ? cLinkClass + "text-[#000]"
              : cLinkClass + "text-[#555555]"
          }
        >
          Cart
        </Link>
        <span className="mx-[0.5em] text-[#555555] text-[24px] grid justify-center">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </span>
        <Link
          to={"/checkout"}
          className={
            location == "checkout"
              ? cLinkClass + "text-[#000]"
              : cLinkClass + "text-[#555555]"
          }
        >
          Checkout
        </Link>
        <span className="mx-[0.5em] text-[#555555] text-[24px] grid justify-center ">
          <ion-icon name="chevron-forward-outline"></ion-icon>
        </span>
        <Link
          to={"/commandTermine"}
          className={
            location == "commandTermine"
              ? cLinkClass + "text-[#000]"
              : cLinkClass + "text-[#555555]"
          }
        >
          order is complete
        </Link>
      </div>
    </div>
  );
};
