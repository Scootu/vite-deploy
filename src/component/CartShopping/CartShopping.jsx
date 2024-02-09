import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { removeProduct } from "../../store/createSlice";

export const CartShopping = () => {
  const data = useSelector((state) => state.productsData.data);
  const [showPanier, setShowPanier] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation().pathname.split("/").join("");

  let styleb =
    "w-0 h-0 border-b-[11px] border-b-[#ddd] border-l-[10px] border-r-[10px] border-transparent ";
  function checkCondition() {
    if (data.length > 0) {
      setShowPanier(true);
    } else {
      setShowPanier(false);
    }
  }
  // useEffect(() => {
  //   checkCondition();
  // }, [data]);
  return (
    <li
      onMouseOver={() => {
        if (location !== "cart" && location !== "checkout") {
          setShowPanier(true);
        }
      }}
      onMouseLeave={() => {
        setShowPanier(false);
      }}
      className="relative"
    >
      <Link to={"/vite-deploy/cart"}>
        <div className="relative cursor-pointer ">
          <div className="absolute top-[-10px] right-[-12px] px-[2px] bg-[#f8d7a4] rounded-md">
            {data.length}
          </div>
          <FontAwesomeIcon icon={faCartShopping} />
        </div>
      </Link>
      <div className={showPanier ? styleb : styleb + " opacity-0"}></div>
      {showPanier && (
        <>
          <div className="absolute smouthTran right-0 min-w-[320px]  z-10 border shadow bg-white p-5 text-[#777] table text-center ">
            {data.length == 0 ? (
              <ul>
                <li className="text-[18px] ">Your cart is empty.</li>
              </ul>
            ) : (
              <>
                <ul className="overflow-y-scroll max-h-[320px]">
                  {data.map((item, index) => {
                    return (
                      <li
                        key={index}
                        className="border-b-2 overflow-hidden min-h-[80px] leading-[1.33em] relative pt-[10px] pr-[20px] pb-[5px] pl-[75px] align-top "
                      >
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="absolute right-0 border-2 border-solid rounded-full text-gray-400 block font-bold text-center h-6 w-6 text-base leading-4 cursor-pointer"
                          onClick={() => {
                            dispatch(removeProduct({ ...item, nbItems: 0 }));
                          }}
                        />

                        <Link to={`/vite-deploy/products/${item.id}`}>
                          <img
                            className="absolute left-0 top-3 h-[60px] w-[60px] object-cover object-center"
                            src={item.images[0]}
                            alt={item.name}
                          />
                        </Link>
                        <Link to={`/vite-deploy/products/${item.id}`}>
                          <div className="w-full">
                            <p className=" text-left text-[#334862] h-[60px] overflow-hidden leading-[1.33em]">
                              {item.name}
                            </p>
                            <p className="text-black font-bold text-left text-xl">
                              <span>{item.nbItems || 1} x </span>{" "}
                              {"$" + item.prices[0].price}
                            </p>
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-b-4 pt-2 pb-2">
                  <span className="text-xl font-bold">Total :</span>
                  <span className="text-black font-bold">
                    {"$" +
                      data
                        .reduce(
                          (accumulator, currentValue) =>
                            accumulator +
                            parseFloat(currentValue.prices[0].price) *
                              currentValue.nbItems,
                          0
                        )
                        .toFixed(2)}
                  </span>
                </div>
                <div className="py-0">
                  <button className="block p-2 bg-slate-800 w-full text-white mb-2">
                    <Link to={"/vite-deploy/cart"}>See Cart</Link>
                  </button>
                  <button className="block p-2 bg-red-700 w-full text-white">
                    <Link to={"/vite-deploy/checkout"}>Order now!</Link>
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </li>
  );
};
