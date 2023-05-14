import { createSlice } from "@reduxjs/toolkit";

const hotelSlice = createSlice({
  name: "hotel",
  initialState: {},
  reducers: {
    setHotelDetails: (state, action) => {
      return action.payload;
    },
  },
});

export const { setHotelDetails } = hotelSlice.actions;

export default hotelSlice.reducer;