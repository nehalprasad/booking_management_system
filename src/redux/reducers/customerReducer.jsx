import { createSlice } from "@reduxjs/toolkit";

const customerReducer = createSlice({
  name: "customer",
  initialState: {},
  reducers: {
    setCustomersInfo: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCustomersInfo } = customerReducer.actions;

export default customerReducer.reducer;