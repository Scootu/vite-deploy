import { faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";
import {
  changeItemPosition,
  getProductData,
  modifieItemNumber,
  removeProduct,
} from "../store/createSlice";

export const Products = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const loaderData = useLoaderData();
  const data = useSelector((state) => state.productsData.data);
  const [activeLinkCart, setActiveLinkCart] = useState(false);
  const [content, setContent] = useState("Add to cart");
  let flag = false;
  let val = 1;
  if (
    data.some((item) => {
      return item.id === loaderData.id;
    }) &&
    flag == false
  ) {
    const index = data.findIndex((item) => item.id === loaderData.id);
    flag = true;
    if (data[index].nbItems > 1) {
      val = data[index].nbItems;
    }
  }

  const [counter, setCounter] = useState(val);
  const [sCaracter, setScaracter] = useState(loaderData.prices[0]);
  console.log("loader : ", data);
  const dispatch = useDispatch();
  const caracterSymbolStyle =
    "m-[.25rem] p-[0.5rem] rounded-[0.5rem]  items-center cursor-pointer inline-flex text-[0.875rem] bg-[#fff] flex-col ";

  useEffect(() => {
    // this solve the bugs and handle the ui as expected or (want) الحمد لله (it's mean thank god)
    if (
      data.some((item) => {
        return item.id === loaderData.id;
      })
    ) {
      // const index = data.findIndex((item) => item.id === loaderData.id);
      setActiveLinkCart(true);
      const index = data.findIndex((item) => item.id === loaderData.id);

      setCounter(data[index].nbItems);
    } else {
      setCounter(0);
    }
  }, [data]);
  // for counter value

  useEffect(() => {
    if (counter == 0) {
      setActiveLinkCart(false);
      setContent("Add to cart");
      dispatch(removeProduct(loaderData));
      setCounter(1);
    }
    dispatch(modifieItemNumber({ id: loaderData.id, nbItems: counter }));
  }, [counter]);
  useEffect(() => {
    dispatch(changeItemPosition({ id: loaderData.id, item: sCaracter }));
  }, [sCaracter]);
  function checkFunction() {
    // a big shi*
    let flag = false;
    const index = data.findIndex((item) => item.id === loaderData.id);
    if (activeLinkCart == true && counter > 0 && index == -1 && flag == false) {
      setContent("Add to cart");
      flag = true;
    }
    if (index !== -1) {
      console.log("data is ", data);
      console.log("remove :", counter, data[index].nbItems);

      if (Object.hasOwn(data[index], "nbItems")) {
        return data[index].nbItems == 0;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <section className="max-w-7xl px-12 m-auto pt-12">
      <div className="flex">
        <div className="w-[140px] overflow-y-scroll max-h-[420px]">
          {loaderData.images.map((item, index) => (
            <div
              key={index}
              className="border overflow-hidden mb-[8px]"
              onMouseOver={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <img
                className={`w-[100px] h-[100px] cursor-pointer ${
                  hoveredIndex === index ? "animate-scroll_Up" : "opacity-[0.5]"
                }`}
                src={item}
                alt="img"
              />
            </div>
          ))}
        </div>
        <div className="flex">
          <div className="w-[650px]">
            <swiper-container slides-per-view="1" speed="500" navigation="true">
              {loaderData.images.map((item, index) => {
                return (
                  <swiper-slide key={index}>
                    <div className="flex items-center justify-center">
                      <img
                        className="bg-cover bg-center"
                        width="400"
                        height="400"
                        src={item}
                        alt="img"
                      />
                    </div>
                  </swiper-slide>
                );
              })}
            </swiper-container>
          </div>
          <div className="border rounded p-3">
            <p className="underline text-[#46474a] text-sm hover:text-[#0071DC]">
              {loaderData.category}
            </p>
            <p className="text-[1.25rem] text-[#2e2f32] leading-8 font-bold my-[0.25rem]">
              {loaderData.name}
            </p>
            <div className="flex flex-wrap mb-[1rem] h-auto ">
              <div className="flex items-center mr-[0.5rem] ">
                <div className="w-[60px] mr-[0.25rem] text-[#000] inline-flex items-center ">
                  <span
                    className="text-black inline-flex mr-[0.25rem]"
                    style={{ width: "60px" }}
                  >
                    <i
                      className="ld ld-StarFill "
                      style={{
                        fontSize: "12px",
                        verticalAlign: "-0.175em",
                        width: "12px",
                        height: "12px",
                        boxSizing: "content-box",
                      }}
                      aria-hidden="true"
                    >
                      &#9733;
                    </i>
                    <i
                      className="ld ld-StarFill "
                      style={{
                        fontSize: "12px",
                        verticalAlign: "-0.175em",
                        width: "12px",
                        height: "12px",
                        boxSizing: "content-box",
                      }}
                    >
                      &#9733;
                    </i>
                    <i
                      className="ld ld-StarFill "
                      style={{
                        fontSize: "12px",
                        verticalAlign: "-0.175em",
                        width: "12px",
                        height: "12px",
                        boxSizing: "content-box",
                      }}
                    >
                      &#9733;
                    </i>
                    <i
                      className="ld ld-StarFill "
                      style={{
                        fontSize: "12px",
                        verticalAlign: "-0.175em",
                        width: "12px",
                        height: "12px",
                        boxSizing: "content-box",
                      }}
                    >
                      &#9733;
                    </i>
                    <i
                      className="ld ld-StarHalf "
                      style={{
                        fontSize: "12px",
                        verticalAlign: "-0.175em",
                        width: "12px",
                        height: "12px",
                        boxSizing: "content-box",
                      }}
                    >
                      &#9733;
                    </i>
                  </span>
                  <span className="mr-1 text-[0.75rem] ">{`(${loaderData.reviews})`}</span>
                  <span className="underline whitespace-nowrap inline-block cursor-pointer text-[0.75rem] text-[#2e2f32] hover:no-underline hover:text-[#004f9a]">
                    150 reviews
                  </span>
                </div>
              </div>
            </div>
            <p className="text-[1.75rem] text-[#2e2f32] leading-6 font-bold mb-[1rem]">
              {"$" + sCaracter.price}
            </p>
            {!activeLinkCart ? (
              <button
                className={"btn-add-cart"}
                onClick={() => {
                  setContent(<div className="loader"></div>);

                  setTimeout(() => {
                    setActiveLinkCart(true);
                    dispatch(
                      getProductData({
                        ...loaderData,
                        nbItems: counter,
                        initialS: sCaracter,
                      })
                    );
                  }, 2000);
                }}
              >
                {content}
              </button>
            ) : (
              <div className="btn-add-cart">
                <div className={` flex items-center justify-between w-full`}>
                  <FontAwesomeIcon
                    icon={faMinus}
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
                  <span className="text-sm font-light select-none">
                    {counter} x
                    <span className="ml-1 font-bold text-white">added</span>
                  </span>

                  <FontAwesomeIcon
                    icon={faPlus}
                    onClick={() => {
                      setCounter((prevState) => {
                        return prevState + 1;
                      });
                    }}
                  />
                </div>
              </div>
            )}

            <hr />
            <div className="pt-[1rem] ">
              <span className="font-bold text-[#46474a] text-[0.875rem] ">
                Size:{sCaracter.size + '"'}
              </span>
              <div className="flex w-full">
                {loaderData.prices.map((item, index) => {
                  console.log("item size :", item.size);
                  return (
                    <div
                      className="flex flex-grow-0 flex-shrink-0 flex-col mb-0"
                      style={{ flexBasis: "33.33%" }}
                      key={index}
                    >
                      <button
                        className={
                          sCaracter.size != item.size
                            ? caracterSymbolStyle +
                              "border-[#babbbe] border-2 text-[#babbbe] "
                            : caracterSymbolStyle +
                              "text-[#000] border-4 border-[#000]"
                        }
                        onClick={() => {
                          setScaracter(item);
                        }}
                      >
                        <p>{item.size + '"'}</p>
                        <p>{item.price}</p>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
