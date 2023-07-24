import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const apiSlice = createSlice({
  name: "apiActions",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = apiSlice.actions;

export default apiSlice.reducer;
