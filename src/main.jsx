import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import { HeroSection } from "./Pages/HeroSection.jsx";
// import function to register Swiper custom elements
import { register } from "swiper/element/bundle";
import store from "./store/store.js";
import { Provider } from "react-redux";
import { Cart } from "./Pages/Cart.jsx";
import { Products } from "./Pages/Product.jsx";
import { Checkout } from "./Pages/Checkout.jsx";
import { CommandTermine } from "./Pages/CommandTermine.jsx";

// register Swiper custom elements

register();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      return await fetch("productData.json");
    },
    id: "root",
    children: [
      {
        path: "",
        element: <HeroSection />,
      },
      {
        path: "/account",
        element: <h1>Account</h1>,
      },
      {
        path: "/contact",
        element: <h1>Contact</h1>,
      },
      {
        path: "/shop",
        element: <h1>shop</h1>,
      },
      {
        path: "/cart",
        element: <Cart />,
        action: async ({ request }) => {
          try {
            let formData = await request.formData();
            const userCodePromo = formData.get("userCodePromo"); // Get the user-entered code

            const res = await fetch("http://localhost:5000/api/validate-code", {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: `userCodePromo=${userCodePromo}`,
            });

            if (!res.ok) {
              throw res;
            }

            const data = await res.json();

            return data;
          } catch (error) {
            console.error(error);
            // Handle error
            return null;
          }
        },
      },
      {
        path: "/checkout",
        element: <Checkout />,
        action: async ({ request }) => {
          function hasNumber(inputString) {
            return /\d/.test(inputString);
          }
          try {
            let arrayError = [];
            const formData = await request.formData();
            const intent = formData.get("intent");
            const codePromo = formData.get("codePromo");
            if (intent === "codePromo") {
              if (codePromo.length > 9) {
                arrayError.push({
                  ok: false,
                  code: codePromo,
                  message: "Invalid: should be less than 9 characters",
                });
              }
              if (codePromo.length == 0) {
                arrayError.push({
                  ok: false,
                  code: codePromo,
                  message: "Please enter a promo code.",
                });
              } else {
                const res = await fetch(
                  "http://localhost:5000/api/validate-code",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `userCodePromo=${codePromo}`,
                  }
                );

                if (!res.ok) {
                  throw new Error("Server error");
                }

                const data = await res.json();
                if (!data.ok) {
                  arrayError.push({
                    ok: data.ok,
                    code: data.code,
                    message: `The promo code «${data.code}» does not exist!`,
                  });
                } else {
                  arrayError.push({
                    ok: true,
                    code: data.code,
                    message: `The promo code «${data.code}» applied`,
                  });
                }
              }
              return arrayError;
            }
            if (intent === "checkout") {
              let OrderInformation = [];
              let arrayOfErrors = {};
              const formDataObject = Array.from(formData.entries()).reduce(
                (acc, [key, value]) => {
                  if (key === "productData") {
                    acc[key] = JSON.parse(value);
                  } else {
                    acc[key] = value;
                  }
                  return acc;
                },
                {}
              );
              console.log(formDataObject);
              for (const [name, value] of formData.entries()) {
                if (
                  value == "" &&
                  name !== "billing_address_1" &&
                  name != "billing_address_2" &&
                  name != "billing_email" &&
                  name != "order_comments" &&
                  name != "billing_Company_name"
                ) {
                  arrayOfErrors[name] = {
                    message: `${name
                      .split("_")
                      .slice(1)
                      .join(" ")} is required`,
                  };
                }
              }

              if (hasNumber(formData.get("billing_first_name"))) {
                arrayOfErrors["billing_first_name"] = {
                  message: `Invalide first name syntaxe`,
                };
              }
              if (hasNumber(formData.get("billing_Last_name"))) {
                arrayOfErrors["billing_Last_name"] = {
                  message: `Invalide last name syntaxe`,
                };
              }
              if (hasNumber(formData.get("billing_city"))) {
                arrayOfErrors["billing_city"] = {
                  message: `Invalide City syntaxe`,
                };
              }

              if (Object.keys(arrayOfErrors).length) {
                return arrayOfErrors;
              }

              const res = await fetch("http://localhost:5000/api/orders", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify([formDataObject]),
              });

              if (!res.ok) {
                throw new Error("Server error");
              }
              res.json().then((data) => {
                console.log("DATA :", data.data);
              });
              return redirect("/commandTermine");
            }
          } catch (error) {
            console.error(error);
            // Handle error
            return null;
          }
        },
      },
      {
        path: "/commandTermine",
        element: <CommandTermine />,
      },
      {
        path: "/products",
        children: [
          {
            path: ":productId",
            element: <Products />,
            loader: async ({ params }) => {
              try {
                const response = await fetch(
                  `http://localhost:5000/api/product/${params.productId}`
                );

                // Check if the response status is OK (200)
                if (response.ok) {
                  // Read the JSON content from the response body
                  const productData = await response.json();
                  return productData;
                } else {
                  console.error(
                    "Error fetching product data:",
                    response.statusText
                  );
                  // Handle the error appropriately, e.g., redirect to an error page
                  return null;
                }
              } catch (error) {
                console.error("Error fetching product data:", error);
                // Handle the error appropriately, e.g., redirect to an error page
                return null;
              }
            },
          },
        ],
      },
    ],
  },
]);
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
