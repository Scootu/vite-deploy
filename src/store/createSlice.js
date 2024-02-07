import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};
export const dataSlice = createSlice({
  name: "data",
  initialState: initialState,
  reducers: {
    getProductData: (state, action) => {
      let productData = action.payload;
      const getElem = productData.prices.findIndex((elem) => {
        return elem.size === productData.initialS.size;
      });

      if (getElem != -1 && getElem != 0) {
        const initialElem = productData.prices[0];
        productData.prices[0] = productData.prices[getElem];
        productData.prices[getElem] = initialElem;

        // [state.data[index].prices[getElem], state.data[index].prices[0]] = [state.data[index].prices[0], action.payload.item];
      }
      state.data.push(productData);
    },
    removeProduct: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        // Check if the item is found
        state.data.splice(index, 1); // Remove 1 element at the found index
      }
    },
    modifieItemNumber: (state, action) => {
      const index = state.data.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        if (Object.hasOwn(state.data[index], "nbItems")) {
          // If the key exists, update its value
          state.data[index] = {
            ...state.data[index],
            nbItems: action.payload.nbItems,
          };
        } else {
          // If the key doesn't exist, add a new key-value pair
          state.data[index].nbItems = action.payload.nbItems;
        }
      }
    },
    changeItemPosition(state, action) {
      const index = state.data.findIndex((elem) => {
        return elem.id == action.payload.id;
      });
      if (index != -1) {
        const getElem = state.data[index].prices.findIndex((elem) => {
          return elem.size === action.payload.item.size;
        });
        if (getElem != -1 && getElem != 0) {
          const initialElem = state.data[index].prices[0];
          state.data[index].prices[0] = action.payload.item;
          state.data[index].prices[getElem] = initialElem;
          console.log(state.data[index].prices);
          // [state.data[index].prices[getElem], state.data[index].prices[0]] = [state.data[index].prices[0], action.payload.item];
        }
      }
    },
  },
});

// {type: "counter/increment"}
export const {
  getProductData,
  removeProduct,
  modifieItemNumber,
  changeItemPosition,
} = dataSlice.actions;
