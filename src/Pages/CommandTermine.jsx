import React from "react";
import { useSelector } from "react-redux";
import { Segments } from "../component/segments/Segments";

const ProductDetails = ({ product }) => {
  const { id, name, category, images, initialS, nbItems, prices, reviews } =
    product;

  return (
    <div className="product-details">
      <h2>{name}</h2>
      <p>{category}</p>
      <div className="product-images grid grid-cols-4">
        {images.map((image, index) => (
          <img
            key={index}
            width={"200px"}
            src={image}
            alt={`Product ${index + 1}`}
          />
        ))}
      </div>
      <p>Price: ${initialS.price.toFixed(2)}</p>
      <p>Size: {initialS.size}</p>
      <p>Number of Items: {nbItems}</p>
      <p>Reviews: {reviews}</p>
    </div>
  );
};
export const CommandTermine = () => {
  const productsData = useSelector((state) => state.productsData.data);

  console.log(productsData);
  return (
    <section className="max-w-7xl px-12 m-auto">
      <Segments />

      <h1 className="mx-auto w-full text-center text-[2.2rem] m-[15px]">Commande terminate</h1>
      {productsData.length != 0 &&
        productsData.map((product) => (
          <ProductDetails key={product.id} product={product} />
        ))}
    </section>
  );
};
