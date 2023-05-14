import { createSlice } from "@reduxjs/toolkit";

const dateSlice = createSlice({
  name: "date",
  initialState: {},
  reducers: {
    setBookingDate: (state, action) => {
      return action.payload;
    },
  },
});

export const { setBookingDate } = dateSlice.actions;

export default dateSlice.reducer;