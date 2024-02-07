import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getProductData } from "../../store/createSlice";
import { useSelector } from "react-redux";
export const CartProduct = (props) => {
  const dispatsh = useDispatch();
  const productsData = useSelector((state) => state.productsData.data);
  const [activeLinkCart, setActiveLinkCart] = useState("Add to cart");
  const [classLinkBtn, setClassLinkBtn] = useState("link-btn");

  const {
    id,
    images: img,
    category,
    name: title,
    prices: price,
    reviews,
  } = props.props;

  useEffect(() => {
    checkLink(); // check if the link is clicked before
  }, []);

  function checkLink() {
    const flag = productsData.some((element) => element.id === id);
    if (flag === true) {
      setActiveLinkCart(
        <NavLink
          to={`/products/${id}`}
          className="flex items-center gap-1 font-bold text-slate-800 hover:text-slate-500"
        >
          See Cart
          <span className="material-symbols-outlined">trending_flat</span>
        </NavLink>
      );
      setClassLinkBtn("link-btn-active");
    }
  }

  return (
    <div className="border shadow px-4 py-4">
      <Link to={`/products/${id}`} className="h-full w-full">
        <img
          className="h-128 px-4 py-4"
          width={"247"}
          height={"296"}
          src={img[0]}
          alt={title}
        />
        <div className="bg-white mb-3">
          <p className="text-xs mb-1">{category}</p>
          <p className="text-text-blinder text-sm h-12 overflow-hidden leading-6">
            {title}
          </p>
          <div className="flex gap-2 items-center">
            <span className="text-black text-xl">
              {"Size " + price[0].size}
            </span>
            <span className="text-black text-xl">{"$" + price[0].price}</span>
            <span className="">{}</span>
          </div>
        </div>
      </Link>
      <div className="h-[40px] w-full relative">
        {
          <button
            className={classLinkBtn}
            onClick={() => {
              setActiveLinkCart(<div className="loader"></div>);
              setTimeout(() => {
                setActiveLinkCart(
                  <NavLink
                    to={`/products/${id}`}
                    className="flex items-center gap-1 font-bold text-slate-800 hover:text-slate-500"
                  >
                    See Cart
                    <span className="material-symbols-outlined">
                      trending_flat
                    </span>
                  </NavLink>
                );
                if (classLinkBtn == "link-btn") {
                  dispatsh(
                    getProductData({
                      ...props.props,
                      nbItems: 1,
                      initialS: price[0],
                    })
                  );
                }

                setClassLinkBtn("link-btn-active");
              }, 2000);
            }}
          >
            {activeLinkCart}
          </button>
        }
      </div>
    </div>
  );
};
