import React, { Fragment } from "react";
import { CartContent } from "../component/content/CartContent";
import { FeaturedProducts } from "./FeaturedProducts";
export const HeroSection = () => {
  const styles = {
    backgroundImage: "url(https://i.ibb.co/rpY21Zk/hero-sectino-2024-800.png)",
  };
  return (
    <Fragment>
      <div className="min-h-128 w-full relative ">
        <div
          className="w-full bg-no-repeat absolute bg-cover top-0 right-0 bottom-0 left-0 shadow-inner"
          style={styles}
        >
          <div className="max-w-7xl px-12 m-auto h-5/6">
            <div className="h-full w-full flex justify-center items-center flex-col gap-4">
              <span className="text-5xl font-bold ">
                Transform Your Space{" "}
                <span className=" text-5xl font-bold  text-lime-500">with</span>{" "}
              </span>
              <span className="text-5xl font-bold ">Elegance and Greenery</span>
              <p className="font-medium text-2xl">
                Discover a World of Stylish Planters
              </p>
              <p className="text-xl">Explore our Collection Today!</p>
              <button className="btn flex items-center justify-center bg-black text-white">
                <a href={"#service"}>Expand more</a>
                <span className="material-symbols-outlined">expand_more</span>
              </button>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      <CartContent />
      <FeaturedProducts />
    </Fragment>
  );
};
