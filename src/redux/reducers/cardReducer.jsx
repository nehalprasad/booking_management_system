import { createSlice } from "@reduxjs/toolkit";

const cardSlice = createSlice({
  name: "card",
  initialState: {},
  reducers: {
    setCardDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setCardDetails } = cardSlice.actions;

export default cardSlice.reducer;