import { createSlice } from "@reduxjs/toolkit";

const initialData = {
  order: { address1: { wilaya: "", city: "" } },
};
export const newOrderUser = createSlice({
  name: "order",
  initialState: initialData,
  reducers: {
    getNewAddress: (state, action) => {
      state.order = { ...state.order, address1: action.payload };

      console.log(state.order);
    },
    getNewOrder: (state, action) => {},
  },
});

export const { getNewOrder, getNewAddress } = newOrderUser.actions;
