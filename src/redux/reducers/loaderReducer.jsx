import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "loader",
  initialState: {
    isLoading: true,
  },
  reducers: {
    setisLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setisLoading } = loadSlice.actions;

export default loadSlice.reducer;
