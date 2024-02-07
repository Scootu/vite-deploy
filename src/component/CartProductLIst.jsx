import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { modifieItemNumber, removeProduct } from "../store/createSlice";

export const CartProductLIst = (item) => {
  const [counter, setCounter] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    setCounter(item.nbItems);
  }, []);
  useEffect(() => {
    if (counter == 0) {
      dispatch(removeProduct(item));
    }
    dispatch(modifieItemNumber({ id: item.id, nbItems: counter }));
  }, [counter]);
  
  return (
    <li className="flex p-[10px] mb-[0.25rem] border-b">
      <div className="p-[20px]">
        <img className="w-[100px]" src={item.images[0]} alt="" />
      </div>
      <div className="w-full">
        <div className="relative">
          <p className="absolute top-0 right-0 text-[#000] font-bold">
            ${(item.prices[0].price * item.nbItems).toFixed(2)}
          </p>
          <p className="max-w-[90%] font-light">{item.name}</p>
          <p className="text-[.875rem] text-[#74767c] leading-6 ">
            Size {item.prices[0].size}
          </p>
          <p className="text-[.875rem] text-[#74767c] leading-6">
            ${item.prices[0].price}
          </p>
          <div className="w-full mt-[.5rem] flex items-center justify-end">
            <span
              className="underline cursor-pointer mr-[1rem]"
              onClick={() => dispatch(removeProduct(item))}
            >
              Remove
            </span>
            <div className="w-[120px] text-[1rem] p-[0.25rem] bg-[#fff] text-[#000] flex justify-between items-center border rounded-full border-[#babbbe]">
              <FontAwesomeIcon
                icon={faMinus}
                className="w-[1rem] h-[1rem] font-light p-[0.25rem] hover:bg-[#74767c] hover:text-[#fff] rounded-full cursor-pointer"
                onClick={() => {
                  setCounter((prevState) => {
                    if (prevState > 0) {
                      return prevState - 1;
                    } else {
                      return 0;
                    }
                  });
                }}
              />

              <span className="text-[.875rem] font-bold flex items-center text-[#000] mx-auto select-none ">
                {counter}
              </span>

              <FontAwesomeIcon
                icon={faPlus}
                className="w-[1rem] h-[1rem] font-light p-[0.25rem] hover:bg-[#74767c] hover:text-[#fff] rounded-full cursor-pointer"
                onClick={() => {
                  setCounter((prevState) => {
                    return prevState + 1;
                  });
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
