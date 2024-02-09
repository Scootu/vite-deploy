import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Segments } from "../component/segments/Segments";
import { CartProductLIst } from "../component/CartProductLIst";
import { Form, Link, useActionData, useNavigate } from "react-router-dom";
import { getNewAddress } from "../store/newOrderSlice";

export const Cart = () => {
  const productsData = useSelector((state) => state.productsData.data);
  const [address, setAddress] = useState(["Algiers"]);
  const [clickModifyAddress, setClickModifyAddress] = useState(false);
  const [clickUpdate, setCLickUpdate] = useState(false);
  const inputElement = useRef();
  const villeInput = useRef();
  const codePostalInput = useRef();
  const codePromoInput = useRef();
  const [checkError, setCheckError] = useState(false);
  const [checkInputNumber, setCheckInputNumber] = useState(false);
  const [codePromoNumberError, setCodePromoNumberError] = useState(false);
  const [codePromotionAction, setCodePromotionAction] = useState(<p></p>);
  const [clickValidateOrder, setClickValidteOrder] = useState(false);
  const [checkInputWord, setCheckInputWord] = useState(false);
  const actionError = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (actionError) {
      setCodePromotionAction(() =>
        actionError.ok ? (
          <div className="text-green-600">
            the promo code {actionError.code} applied
          </div>
        ) : (
          <div className="text-red-600">
            The promo code «{actionError.code}» does not exist!
          </div>
        )
      );
    }
  }, [actionError]);

  function checkFormInput() {
    // we can build a form validation with action and useActionData
    if (
      villeInput.current.value === "" ||
      codePostalInput.current.value === ""
    ) {
      setCheckError(true);
    } else {
      setCLickUpdate(true);

      setTimeout(() => {
        setClickModifyAddress(false);

        setAddress([
          villeInput.current.value,
          inputElement.current.options[inputElement.current.selectedIndex]
            .textContent,
          codePostalInput.current.value,
        ]);
        console.log("dispatch");
        dispatch(
          getNewAddress({
            city: villeInput.current.value,
            wilaya:
              inputElement.current.options[inputElement.current.selectedIndex]
                .textContent,
            codePostal: codePostalInput.current.value,
          })
        );
        setCLickUpdate(false);
      }, 2000);
    }
  }
  // const [height, setHeight] = useState(0);
  // function animateElement() {
  //   for (let index = 0; height < 270; index++) {
  //     setHeight((prev) => prev + 10);
  //   }
  //   if (!clickModifyAddress) {
  //     setHeight(0);
  //   }
  // }
  return (
    <section className="max-w-7xl px-12 m-auto">
      <Segments />
      <div className="py-[30px] w-full px-[15px] ">
        <div className="flex max-w-[1110px]">
          {productsData.length == 0 ? (
            <div className="w-full">
              <div className="mb-[1rem] text-[1.5rem] text-center">
                Your cart is empety right now.
              </div>
              <Link
                className={
                  "py-0 px-[1.5rem] mb-[1rem] mx-auto  text-[1rem] h-[2.5rem] flex w-[200px] bg-[#0071dc] text-[#fff] font-bold items-center appearance-none border-0 rounded-[62.5rem] cursor-pointer justify-center whitespace-nowrap"
                }
                to={"/vite-deploy/"}
              >
                Back to shop
              </Link>
            </div>
          ) : (
            <>
              <div
                className="pt-0 px-[30px] pb-[30px] mb-0 max-w-[63%]"
                style={{ flexBasis: "63%" }}
              >
                {/* <Table data={productsData} /> */}

                {codePromotionAction}
                <div className="font-bold pb-[1rem]">
                  {productsData.reduce((previous, current) => {
                    return previous + current.nbItems;
                  }, 0)}{" "}
                  items
                </div>
                <ul className="max-h-[430px] h-full overflow-y-auto">
                  {productsData.map((item, index) => {
                    return <CartProductLIst key={index} {...item} />;
                  })}
                </ul>
              </div>
              <div
                className="h-full border rounded shadow border-[#ececec] pt-[15px] px-[15px] pb-[15px] mb-0 max-w-[37%] relative "
                style={{ flexBasis: "37%" }}
              >
                <table className="w-full mb-[1rem] border-[#ececec] ">
                  <thead className="border-b-[3px]">
                    <tr className="w-full  uppercase leading-[1.05rem] tracking-wider text-[1rem] text-[#777] font-bold   p-[0.25rem] ">
                      Total Cart
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b-[1px] ">
                      <th className="text-left p-[0.25rem] table-cell text-[1.1rem] font-normal text-[#777] ">
                        subTotal
                      </th>
                      <td className="p-[0.25rem] table-cell font-bold text-right">
                        $
                        {productsData
                          .reduce((previous, current) => {
                            return (
                              previous +
                              current.prices[0].price * current.nbItems
                            );
                          }, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                    <tr className="border-b-[1px]">
                      <th className="text-left p-[0.25rem] table-cell text-[1.1rem] font-normal text-[#777] ">
                        shipping
                      </th>
                      <td className="table-cell p-[0.25rem] text-right">
                        <div className="text-[#777]  w-[300px]  whitespace-nowrap">
                          Free delivery
                        </div>
                        <div className="text-[#777] ">
                          Delivery to{" "}
                          <span className="font-bold">{address.join()}.</span>
                        </div>
                        <div
                          className="text-[#334862] select-none whitespace-nowrap text-right w-full  text-[.9rem] hover:text-[#000] cursor-pointer"
                          onClick={() => {
                            setClickModifyAddress(!clickModifyAddress);
                          }}
                        >
                          Change the address
                        </div>
                        {
                          <section
                            className={
                              clickModifyAddress
                                ? "bg-[rgba(0,0,0,.03)] relative  rounded-[5px] mt-[5px] pt-[15px] px-[15px] pb-[10px] text-[#666] text-[.9em] leading-[1.3em] text-left   overflow-hidden"
                                : "hidden"
                            }
                          >
                            {clickUpdate && (
                              <div className="absolute w-[100%] h-[100%]  opacity-70  bg-white top-0 left-0 grid justify-center items-center">
                                <div className="loader"></div>
                              </div>
                            )}
                            <div className="">
                              <select
                                className="px-[0.75em] w-full align-middle outline-none cursor-pointer  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-[#ddd] text-[.97em] h-[2.507em]"
                                defaultValue={"Algeria"}
                              >
                                <option value="">
                                  Select a country/region…
                                </option>
                                <option value={"FR"}>France</option>
                                <option value={"DZ"}>Algeria</option>
                                <option value={"LY"}>Libya</option>
                                <option value={"MA"}>Morocco</option>
                                <option value={"TN"}>Tunisia</option>
                                <option value={"EG"}>Egypt</option>
                                <option value={"SD"}>Sudan</option>
                              </select>
                              <select
                                className="px-[0.75em] w-full outline-none align-middle cursor-pointer  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-[#ddd] text-[.97em] h-[2.507em]"
                                placeholder="Région / Département"
                                ref={inputElement}
                              >
                                <option value="DZ-01">Adrar</option>
                                <option value="DZ-02">Chlef</option>
                                <option value="DZ-03">Laghouat</option>
                                <option value="DZ-04">Oum El Bouaghi</option>
                                <option value="DZ-05">Batna</option>
                                <option value="DZ-06">Béjaïa</option>
                                <option value="DZ-07">Biskra</option>
                                <option value="DZ-08">Béchar</option>
                                <option value="DZ-09">Blida</option>
                                <option value="DZ-10">Bouira</option>
                                <option value="DZ-11">Tamanrasset</option>
                                <option value="DZ-12">Tébessa</option>
                                <option value="DZ-13">Tlemcen</option>
                                <option value="DZ-14">Tiaret</option>
                                <option value="DZ-15">Tizi Ouzou</option>
                                <option value="DZ-16">Alger</option>
                                <option value="DZ-17">Djelfa</option>
                                <option value="DZ-18">Jijel</option>
                                <option value="DZ-19">Sétif</option>
                                <option value="DZ-20">Saïda</option>
                                <option value="DZ-21">Skikda</option>
                                <option value="DZ-22">Sidi Bel Abbès</option>
                                <option value="DZ-23">Annaba</option>
                                <option value="DZ-24">Guelma</option>
                                <option value="DZ-25">Constantine</option>
                                <option value="DZ-26">Médéa</option>
                                <option value="DZ-27">Mostaganem</option>
                                <option value="DZ-28">M’Sila</option>
                                <option value="DZ-29">Mascara</option>
                                <option value="DZ-30">Ouargla</option>
                                <option value="DZ-31">Oran</option>
                                <option value="DZ-32">El Bayadh</option>
                                <option value="DZ-33">Illizi</option>
                                <option value="DZ-34">
                                  Bordj Bou Arréridj
                                </option>
                                <option value="DZ-35">Boumerdès</option>
                                <option value="DZ-36">El Tarf</option>
                                <option value="DZ-37">Tindouf</option>
                                <option value="DZ-38">Tissemsilt</option>
                                <option value="DZ-39">El Oued</option>
                                <option value="DZ-40">Khenchela</option>
                                <option value="DZ-41">Souk Ahras</option>
                                <option value="DZ-42">Tipasa</option>
                                <option value="DZ-43">Mila</option>
                                <option value="DZ-44">Aïn Defla</option>
                                <option value="DZ-45">Naâma</option>
                                <option value="DZ-46">Aïn Témouchent</option>
                                <option value="DZ-47">Ghardaïa</option>
                                <option value="DZ-48">Relizane</option>
                              </select>
                              <input
                                name="ville"
                                className="w-full px-[0.75em] align-middle outline-none  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-[#ddd] text-[.97em] h-[2.507em] focus:shadow"
                                placeholder="Ville"
                                ref={villeInput}
                                onChange={() => {
                                  if (checkError) {
                                    setCheckError(false);
                                  }
                                  if (
                                    !isNaN(villeInput.current.value) &&
                                    villeInput.current.value != ""
                                  ) {
                                    setCheckInputWord(true);
                                  } else {
                                    setCheckInputWord(false);
                                  }
                                }}
                              />
                              {checkError && (
                                <p className="text-red-600 relative -top-[15px]">
                                  Need to fill this
                                </p>
                              )}
                              {checkInputWord && (
                                <p className="text-red-600 relative -top-[8px]">
                                  Need to be a word
                                </p>
                              )}
                              <input
                                name="codePostal"
                                className="w-full px-[0.75em] align-middle outline-none  mb-[1rem] text-[#444] whitespace-nowrap bg-white border border-[#ddd] text-[.97em] h-[2.507em] focus:shadow"
                                placeholder="Code postal"
                                ref={codePostalInput}
                                onChange={() => {
                                  if (checkError) {
                                    setCheckError(false);
                                  }
                                  if (isNaN(codePostalInput.current.value)) {
                                    setCheckInputNumber(true);
                                  } else {
                                    setCheckInputNumber(false);
                                  }
                                }}
                              />
                              {checkError && (
                                <p className="text-red-600 relative -top-[15px]">
                                  Need to fill this
                                </p>
                              )}
                              {checkInputNumber && (
                                <p className="text-red-600 relative -top-[8px]">
                                  Need to be a number
                                </p>
                              )}
                              <button
                                className="py-0 px-[1.5rem] mb-[1rem] text-[1rem] h-[2.5rem] flex w-full bg-[#0071dc] text-[#fff] font-bold items-center appearance-none border-0 rounded-[62.5rem] cursor-pointer justify-center whitespace-nowrap"
                                onClick={checkFormInput}
                              >
                                update
                              </button>
                            </div>
                          </section>
                        }
                      </td>
                    </tr>
                    <tr className="border-b-[3px]">
                      <th className="text-left p-[0.25rem] table-cell text-[1.1rem] font-normal text-[#777] ">
                        Total
                      </th>
                      <td className="p-[0.25rem] font-bold text-right">
                        $
                        {productsData
                          .reduce((previous, current) => {
                            return (
                              previous +
                              current.prices[0].price * current.nbItems
                            );
                          }, 0)
                          .toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </table>
                {clickValidateOrder && (
                  <div className="absolute w-[100%] h-[100%]  opacity-70  bg-white top-0 left-0 grid justify-center items-center">
                    <div className="loader"></div>
                  </div>
                )}
                <button
                  className="py-0 px-[1.5rem] mb-[1rem] text-[1rem] h-[2.5rem] flex w-full bg-[#0071dc] text-[#fff] font-bold items-center appearance-none border-0 rounded-[62.5rem] cursor-pointer justify-center whitespace-nowrap"
                  onClick={() => {
                    setClickValidteOrder(true);
                    setTimeout(() => {
                      navigate("/vite-deploy/checkout");
                    }, 2000);
                  }}
                >
                  Validated the order
                </button>
                <Form method="POST">
                  <div>
                    <p className="font-bold text-[#555555] text-[.95rem] mb-[15px] pb-[10px] border-b-[3px] border-[#ececec] ">
                      Code promo
                    </p>
                    <input
                      name="userCodePromo"
                      type="text"
                      placeholder="Code promo"
                      className="w-full shadow border text-[.95rem] px-4 py-2 outline-none mb-[1rem] "
                      ref={codePromoInput}
                      onChange={() => {
                        if (codePromoNumberError) {
                          setCodePromoNumberError(false);
                        }
                      }}
                    />
                    {codePromoNumberError && (
                      <p className="text-red-600 relative -top-[15px]">
                        Need to fill this
                      </p>
                    )}
                    <button
                      type="submit"
                      name="apply_code_promo"
                      className="w-full bg-[#f9f9f9] border border-[#ddd] text-[#666]  cursor-pointer text-[0.97em] leading-[2.4em] tracking-[.03em] mr-[1em] px-[1.2em] min-h-[2.5em] hover:tran_btn"
                      onClick={() => {
                        if (codePromoInput.current.value === "") {
                          setCodePromoNumberError(true);
                        }
                      }}
                    >
                      Apply the code promo
                    </button>
                  </div>
                </Form>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};
