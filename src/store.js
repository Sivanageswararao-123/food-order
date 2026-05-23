import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./cartSlice";
import couponReducer from "./couponSlice";
import orderReducer from "./OrdersSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    couponDetails: couponReducer,
    orders: orderReducer,
  },
});