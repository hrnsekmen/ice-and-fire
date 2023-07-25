import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
  value: 0,
  houses: [],
};
const baseUrl = "https://anapioficeandfire.com/api/";
export const getHouses = createAsyncThunk("getHouses", async (data) => {
  try {
    const response = await axios.get(`${baseUrl}/houses`, {
      params: {
        page: data.pageSize,
        pageSize: data.pageSize,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const apiSlice = createSlice({
  name: "apiActions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.houses = action.payload;
    });
  },
});

export default apiSlice.reducer;
