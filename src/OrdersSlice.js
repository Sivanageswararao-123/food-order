

import { createSlice } from "@reduxjs/toolkit";

const ordersSlice = createSlice({
  name: "orders",

  initialState: [],

  reducers: {

    addOrder: (state, action) => {
      state.push(action.payload);
    },

  },
});

// Export actions
export const { addOrder } = ordersSlice.actions;

// Export reducer
export default ordersSlice.reducer;