import React, {
  Fragment,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import { Segments } from "../component/segments/Segments";
import { useDispatch, useSelector } from "react-redux";
import { Form, Link, useActionData } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { getNewAddress } from "../store/newOrderSlice";
// function reducerFirstName({ state, action }) {
//   switch ("check_word") {
//     case "check_word":
//       return {
//         check_word: !isNaN(action.payload),
//       };
//     default:
//       throw new Error("Unknown action: ");
//   }
// }

export const Checkout = () => {
  const productsData = useSelector((state) => state.productsData.data);
  const newOrder = useSelector((state) => {
    return state.newOrder.order;
  });
  console.log(newOrder);
  const actionError = useActionData();
  const [clickCodePromo, setClickCodePromo] = useState(false);
  const [actionOk, setActionOk] = useState([{ ok: false, message: "" }]);
  const [actionErrorContent, setActionErrorContent] = useState("");
  const [clickLink, setClickLink] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const [itemsNumber, setItemsNumber] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [savingAmount, setSavingAmount] = useState(0);
  const [taxes, setTaxes] = useState(1);
  const [isTaxesCon, setIsTaxesCon] = useState(false);
  const [selectAddress, setSelctetAddress] = useState("");
  const [validataForm, setValidateForm] = useState(false);
  const [inputErrorForm, setInputErrorForm] = useState([]);
  // const [inputCheckName, dispatch] = useReducer(reducerFirstName, {
  //   check_word: false,
  // });

  // console.log("check number", inputCheckName.check_word);
  useEffect(() => {
    setSubTotal(
      productsData.reduce((prev, current) => {
        return prev + current.prices[0].price * current.nbItems;
      }, 0) * taxes
    );
    setItemsNumber(
      productsData.reduce((prev, current) => {
        return prev + current.nbItems;
      }, 0)
    );
    // modifye data
  }, [productsData, taxes]);
  const billing = useRef();
  useEffect(() => {
    if (actionError && clickLink) {
      setActionOk(actionError);
    }
  }, [actionError]);
  useEffect(() => {
    if (typeof actionError === "object" && actionError != undefined) {
      setInputErrorForm(actionError);
    }
  }, [actionError]);
  useEffect(() => {
    const billingDiv = billing.current;

    function handleScroll() {
      let scroll = window.scrollY;

      if (scroll > 238) {
        billingDiv.classList.add("billingFixed");
      } else {
        billingDiv.classList.remove("billingFixed");
      }
    }

    // Add event listeners for scroll and resize events
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <section className="max-w-7xl px-12 m-auto">
      <Segments />
      {productsData.length == 0 ? (
        <div>
          <p className="mb-[1rem] text-[1.2rem]">
            Unable to order if your cart is empty.
          </p>
          <div className="w-full">
            <div className="mb-[1rem] text-[1.5rem] text-center">
              Your cart is empety right now.
            </div>
            <Link
              className={
                "py-0 px-[1.5rem] mb-[1rem] mx-auto  text-[1rem] h-[2.5rem] flex w-[200px] bg-[#0071dc] text-[#fff] font-bold items-center appearance-none border-0 rounded-[62.5rem] cursor-pointer justify-center whitespace-nowrap"
              }
              to={"/"}
            >
              Back to shop
            </Link>
          </div>
        </div>
      ) : (
        <div className="max-w-[1080px] mx-auto ">
          <div className="w-full mx-auto px-[30px]">
            <p className="text-[1.2em] text-[#777777] whitespace-nowrap pb-[0.5em]">
              <span>Do you have a promo code? </span>
              <span
                className="text-[#334862] hover:text-[#000] cursor-pointer"
                onClick={() => {
                  setClickLink(!clickLink);
                }}
              >
                Click here to enter your code
              </span>
            </p>
            {clickLink &&
              clickCodePromo &&
              (actionOk[0].ok ? (
                <p className="text-[1.05em] text-green-700 whitespace-nowrap pb-[0.5em]">
                  {actionOk[0].message}
                </p>
              ) : (
                <ul className="list-none">
                  {actionOk.map((p, index) => {
                    return (
                      <li
                        key={index}
                        className="text-[1.05em] text-red-600 whitespace-nowrap pb-[0.5em]"
                      >
                        {p.message}
                      </li>
                    );
                  })}
                </ul>
              ))}

            {clickLink && (
              <div className="pt-[15px] px-[30px] pb-[30px] mb-[1.3em]  border-dashed border-2 border-[#130754]">
                <p className="mb-[0.5em] text-[#777777] text-[1.2em]">
                  If you have a promo code, please apply it below.
                </p>
                <Form className="flex" method="POST">
                  <input
                    name="codePromo"
                    placeholder="Code promo"
                    className="w-full px-[0.75em] align-middle outline-none  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-[#ddd] text-[.97em] h-[2.507em] focus:shadow"
                    onChange={() => {
                      if (clickCodePromo) {
                        setClickCodePromo(false);
                      }
                    }}
                    readOnly={actionOk[0].ok}
                  ></input>
                  <button
                    type="submit"
                    name="intent"
                    value="codePromo"
                    className=" py-0 px-[1.5rem] mb-[1rem] text-[1rem] h-[2.5rem] flex w-max bg-[#0071dc] text-[#fff] font-bold items-center appearance-none border-0  cursor-pointer justify-center whitespace-nowrap uppercase"
                    onClick={() => {
                      setClickCodePromo(true);
                    }}
                  >
                    applies the promo code
                  </button>
                </Form>
              </div>
            )}
          </div>

          <Form method="POST">
            <div className="flex">
              <div
                className="pt-0 px-[30px] pb-[30px] mb-0 max-w-[63%]"
                style={{ flexBasis: "63%" }}
              >
                {validataForm && (
                  <p className="text-red-700">
                    Please verify all fields below.
                  </p>
                )}
                <div className="pt-[15px] border-t-2 border-t-[#ddd] ">
                  <h3 className="text-[1.1em] font-bold pt-[10px] uppercase text-[#555555] mb-[0.5em] mt-0">
                    billing details
                  </h3>
                </div>

                <div className="flex">
                  <p className="text-[0.9em] mr-[1em]">
                    <label className="text-[#222] font-bold mb-[0.4em] block">
                      First name *
                    </label>
                    <input
                      name="billing_first_name"
                      className={
                        !Object.hasOwn(inputErrorForm, "billing_first_name")
                          ? "bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                          : "bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-red-600 text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                      }

                      // onChange={(p) => {
                      //   dispatch({
                      //     payload: p.target.value,
                      //   });
                      // }}
                    />
                    {Object.hasOwn(inputErrorForm, "billing_first_name") && (
                      <p className="text-[0.875rem] -top-[10px] relative text-red-500 ">
                        {inputErrorForm.billing_first_name.message}
                      </p>
                    )}
                    {/* {inputCheckName.check_word && (
                      <span className="text-[0.875rem] block -top-[10px] relative text-red-500">
                        Need to be a word
                      </span>
                    )} */}
                  </p>
                  <p className="text-[0.9em] ml-[1em]">
                    <label className="text-[#222] font-bold mb-[0.4em] block">
                      Last name *
                    </label>
                    <input
                      name="billing_Last_name"
                      className={
                        !Object.hasOwn(inputErrorForm, "billing_Last_name")
                          ? "bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                          : "bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-red-600 text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                      }
                    />
                    {Object.hasOwn(inputErrorForm, "billing_Last_name") && (
                      <p className="text-[0.875rem] -top-[10px] relative text-red-500 ">
                        {inputErrorForm.billing_Last_name.message}
                      </p>
                    )}
                  </p>
                </div>
                <p className="text-[0.9em]">
                  <label className="text-[#222] font-bold mb-[0.4em] block">
                    Name of company (optional)
                  </label>
                  <input
                    name="billing_Company_name"
                    className="w-full bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                  />
                </p>
                <div className="flex">
                  <p className="text-[0.9em] mr-[1em]">
                    <label className="text-[#222] font-bold mb-[0.4em] block">
                      Address (optional)
                    </label>
                    <input
                      name="billing_address_1"
                      className="bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                      placeholder="Lane number and street name"
                    />
                  </p>
                  <p className="text-[0.9em] ml-[1em] self-end">
                    <input
                      name="billing_address_2"
                      className="bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                      placeholder="Building, apartment, lot, etc. (optional)"
                    />
                  </p>
                </div>
                <p className="text-[0.9em]">
                  <label className="text-[#222] font-bold mb-[0.4em] block">
                    Wilaya *
                  </label>
                  <select
                    className={
                      !Object.hasOwn(inputErrorForm, "billing_State")
                        ? "px-[0.75em] w-full outline-none align-middle cursor-pointer  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-[#ddd] text-[.97em] h-[2.7em]"
                        : "px-[0.75em] w-full outline-none align-middle cursor-pointer  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-red-700 text-[.97em] h-[2.7em]"
                    }
                    name="billing_State"
                    defaultValue={newOrder.address1.wilaya}
                    onChange={(p) => {
                      setSelctetAddress(
                        p.target.options[p.target.selectedIndex].textContent
                      );
                      setIsTaxesCon(true);
                    }}
                  >
                    <option value={""}>Région / Département</option>
                    <option>Adrar</option>
                    <option>Chlef</option>
                    <option>Laghouat</option>
                    <option>Oum El Bouaghi</option>
                    <option>Batna</option>
                    <option>Béjaïa</option>
                    <option>Biskra</option>
                    <option>Béchar</option>
                    <option>Blida</option>
                    <option>Bouira</option>
                    <option>Tamanrasset</option>
                    <option>Tébessa</option>
                    <option>Tlemcen</option>
                    <option>Tiaret</option>
                    <option>Tizi Ouzou</option>
                    <option>Alger</option>
                    <option>Djelfa</option>
                    <option>Jijel</option>
                    <option>Sétif</option>
                    <option>Saïda</option>
                    <option>Skikda</option>
                    <option>Sidi Bel Abbès</option>
                    <option>Annaba</option>
                    <option>Guelma</option>
                    <option>Constantine</option>
                    <option>Médéa</option>
                    <option>Mostaganem</option>
                    <option>M’Sila</option>
                    <option>Mascara</option>
                    <option>Ouargla</option>
                    <option>Oran</option>
                    <option>El Bayadh</option>
                    <option>Illizi</option>
                    <option>Bordj Bou Arréridj</option>
                    <option>Boumerdès</option>
                    <option>El Tarf</option>
                    <option>Tindouf</option>
                    <option>Tissemsilt</option>
                    <option>El Oued</option>
                    <option>Khenchela</option>
                    <option>Souk Ahras</option>
                    <option>Tipasa</option>
                    <option>Mila</option>
                    <option>Aïn Defla</option>
                    <option>Naâma</option>
                    <option>Aïn Témouchent</option>
                    <option>Ghardaïa</option>
                    <option>Relizane</option>
                  </select>
                  {Object.hasOwn(inputErrorForm, "billing_State") && (
                    <p className="text-[0.875rem] -top-[10px] relative text-red-500 ">
                      {inputErrorForm.billing_State.message}
                    </p>
                  )}
                </p>
                <p className="text-[0.9em] mr-[1em] w-full">
                  <label className="text-[#222] font-bold mb-[0.4em] block">
                    City *
                  </label>
                  <input
                    name="billing_city"
                    className={
                      !Object.hasOwn(inputErrorForm, "billing_city")
                        ? "bg-white inputShadow w-full text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                        : "bg-white inputShadow w-full text-[#333] outline-none outline-offset-2 border border-red-600 text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                    }
                    defaultValue={newOrder.address1.city}
                  />
                  {Object.hasOwn(inputErrorForm, "billing_city") && (
                    <p className="text-[0.875rem] -top-[10px] relative text-red-500 ">
                      {inputErrorForm.billing_city.message}
                    </p>
                  )}
                </p>
                <p className="text-[0.9em] mr-[1em] w-full">
                  <label className="text-[#222] font-bold mb-[0.4em] block">
                    Phone number *
                  </label>
                  <input
                    name="billing_phone"
                    className={
                      !Object.hasOwn(inputErrorForm, "billing_phone")
                        ? "bg-white inputShadow w-full text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                        : "bg-white inputShadow w-full text-[#333] outline-none outline-offset-2 border border-red-600 text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                    }
                    pattern="0[5-7][0-9]{8}|[+1-3]{4}[5-7][0-9]{8}|0[2-4][0-9]{7}"
                    title="Enter a valid phone number"
                  />
                  {Object.hasOwn(inputErrorForm, "billing_phone") && (
                    <p className="text-[0.875rem] -top-[10px] relative text-red-500 ">
                      {inputErrorForm.billing_phone.message}
                    </p>
                  )}
                </p>
                <p className="text-[0.9em] mr-[1em] w-full">
                  <label className="text-[#222] font-bold mb-[0.4em] block">
                    Email
                  </label>
                  <input
                    type="email"
                    title="Invalide email"
                    name="billing_email"
                    className={
                      !Object.hasOwn(inputErrorForm, "billing_email")
                        ? "bg-white inputShadow w-full text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                        : "bg-white inputShadow w-full text-[#333] outline-none outline-offset-2 border border-red-600 text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
                    }
                  />
                  {Object.hasOwn(inputErrorForm, "billing_email") && (
                    <p className="text-[0.875rem] -top-[10px] relative text-red-500 ">
                      {inputErrorForm.billing_email.message}
                    </p>
                  )}
                </p>
                <p className="text-[0.95em]">
                  <input
                    name="ship_to_different_address"
                    className="mr-[0.5em]"
                    type="checkbox"
                    value={1}
                  />
                  <span className="text-[#222] ">
                    Ship to a different address ?
                  </span>
                </p>
                <p className="text-[0.9em] mr-[1em]">
                  <label className="text-[#222] font-bold mb-[0.4em] block">
                    Order Notes (optional)
                  </label>
                  <textarea
                    name="order_comments"
                    rows={"2"}
                    cols={"5"}
                    className=" h-[120px] w-full bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[1.1em]  p-[1em] mb-[1em] touch-manipulation "
                    placeholder="Comments regarding your order, e.g. delivery instructions."
                  ></textarea>
                </p>
              </div>
              <div
                className="mb-0 max-w-[37%] relative "
                style={{ flexBasis: "37%" }}
              >
                {/* <table className="w-full">
                <thead>
                  <tr className="uppercase">
                    <th className=" pb-[10px] border-b-[3px] text-[1em] border-b-[#ececec]  text-left leading-[1.05em] tracking-[.05em] ">
                      Product
                    </th>
                    <th className="whitespace-nowrap pb-[10px] border-b-[3px] text-[1em] border-b-[#ececec]  text-right leading-[1.05em] tracking-[.05em] ">
                      sub-total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="py-[15px] text-[#666] text-[.9em] leading-[1.3em]  text-left border-b border-[#ececec]"></td>
                    <td className="font-bold text-[#000] text-right py-[15px] text-[.9em] leading-[1.3em]   border-b border-[#ececec]">
                      44.01554 dz
                    </td>
                  </tr>
                </tbody>
              </table> */}
                <div
                  className="top-0 border-2 rounded shadow border-[#446084] pt-[30px] px-[15px] pb-[30px] mb-0  "
                  ref={billing}
                >
                  <div className="text-[1.2em] pb-[1em] px-[1em] border-t-[#f1f1f2] border-t border-b-[3px]">
                    <div className="flex items-center justify-between pt-[1rem] ">
                      <p className="text-[#2e2f32] font-bold text-[1rem] self-start">
                        SubTotal ({itemsNumber}
                        {itemsNumber === 1 ? " item" : " items"})
                      </p>
                      {isSaving ? (
                        <div className="text-[1rem] block">
                          <p className="line-through text-[#46474a] text-[1rem]">
                            ${subTotal}
                          </p>
                          <p className="">${subTotal - savingAmount}</p>
                        </div>
                      ) : (
                        <p className="text-[1rem] text-[#46474a] ">
                          ${subTotal}
                        </p>
                      )}
                    </div>
                    {isSaving && (
                      <div className="flex items-center justify-between pt-[1rem]">
                        <p className="text-[#46474a] font-bold text-[1rem]">
                          Saving
                        </p>
                        <div className="p-[.25rem] bg-[#eaf3e6] text-[#2a8703] rounded-[.25rem] text-[1rem]">
                          -${savingAmount}
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-[.875rem] text-[#46474a] pt-[0.25rem]">
                      {subTotal >= 35 ? (
                        <>
                          {" "}
                          <p className="">Shipping</p>
                          <p className="text-[#2a8703]">Free</p>{" "}
                        </>
                      ) : (
                        <>
                          {" "}
                          <p className="">Shipping (below $35 order minimum)</p>
                          <p>$6.99</p>
                        </>
                      )}
                    </div>

                    <div className="pt-[1rem] pb-[1rem] text-[#000] border-b-[#f1f1f2] border-b">
                      <div className="flex items-center justify-between text-[1rem] ">
                        <p className="font-bold">Taxes</p>
                        <p className="">{isTaxesCon ? "No Fees" : "Pending"}</p>
                      </div>
                      {!isTaxesCon && (
                        <span className="text-[.75rem] mt-[.25rem] text-[#74767c] ">
                          Calculated once address is confirmed
                        </span>
                      )}
                    </div>

                    <div className=" border-b-[#f1f1f2] ">
                      <div className="flex items-center justify-between text-[1.25rem] pb-[1rem] pt-[1rem] text-[#2e2f32] font-bold ">
                        <p>Estimated Total</p>
                        <div className="text-[1.125rem] ">${subTotal}</div>
                      </div>
                      <div className="text-[1.125rem] flex items-center justify-between pt-[0.5rem] ">
                        <div className="flex items-center">
                          <span className="text-[1.125rem] font-normal">
                            Temporary hold
                          </span>
                          <button className="ml-[0.25rem] text-[1rem] h-[2rem] inline-flex items-center justify-center cursor-pointer rounded-[62.5rem] whitespace-nowrap transition_I leading-5 hover:text-[#004f9a] ">
                            <FontAwesomeIcon
                              className="h-[1rem] w-[1rem] "
                              icon={faCircleInfo}
                            />
                          </button>
                        </div>
                        <p>${subTotal}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-[1rem] py-[1rem] px-[15px]">
                    <p className="font-bold">Cach on delivery</p>
                    <p className="text-[.875rem]">
                      Pay with cash upon delivery.
                    </p>
                    <input
                      name="productData"
                      defaultValue={JSON.stringify({
                        totalPrice: productsData.reduce((prev, current) => {
                          return (
                            prev + current.prices[0].price * current.nbItems
                          );
                        }, 0),
                        totalItems: productsData.reduce((prev, current) => {
                          return prev + current.nbItems;
                        }, 0),
                        products: productsData.map((item) => {
                          return {
                            title: item.name,
                            quantity: item.nbItems,
                            price: item.prices[0].price,
                          };
                        }),
                      })}
                      style={{ display: "none" }}
                    />
                    <button
                      className="mt-[1rem] py-0 px-[1.5rem] mb-[1rem] text-[1rem] h-[2.5rem] flex w-1/2 bg-[#0071dc] text-[#fff] font-bold items-center appearance-none border-0 rounded-[62.5rem] cursor-pointer justify-center whitespace-nowrap"
                      type="submit"
                      name="intent"
                      value="checkout"
                    >
                      COMMANDER
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
      )}
    </section>
  );
};
