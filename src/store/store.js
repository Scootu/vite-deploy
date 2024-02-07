import { configureStore } from "@reduxjs/toolkit";
import { dataSlice } from "./createSlice";
import { newOrderUser } from "./newOrderSlice";

export default configureStore({
  reducer: {
    newOrder: newOrderUser.reducer,
    productsData: dataSlice.reducer,
  },
});
