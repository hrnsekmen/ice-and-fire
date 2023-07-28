import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import qs from "qs";
const initialState = {
  house: [],
  houses: [],
  books: [],
  book: [],
  characters: [],
  character: [],
};
const baseUrl = "https://anapioficeandfire.com/api";
const customAxios = axios.create();
customAxios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params, { encode: true, arrayFormat: "brackets" });
};
// HOUSE
export const getHouses = createAsyncThunk("getHouses", async (data) => {
  try {
    let response;
    if (data.name) {
      response = await customAxios.get(`${baseUrl}/houses`, {
        params: {
          name: "House " + data.name,
        },
      });
    } else {
      response = await axios.get(`${baseUrl}/houses`, {
        params: {
          page: data.page,
          pageSize: data.pageSize,
          name: data.name,
          hasWords: data.hasWords,
          hasTitles: data.hasTitles,
          hasDiedOut: data.hasDiedOut,
        },
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const getHouse = createAsyncThunk("getHouse", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/houses/${id}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
// CHARACTERS
export const getCharacters = createAsyncThunk("getCharacters", async (data) => {
  try {
    let response;
    if (data.name) {
      response = await customAxios.get(`${baseUrl}/characters`, {
        params: {
          name: data.name,
        },
      });
    } else {
      response = await axios.get(`${baseUrl}/characters`, {
        params: {
          page: data.page,
          pageSize: data.pageSize,
          name: data.name,
          isAlive: data.isAlive,
        },
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const getCharacter = createAsyncThunk("getCharacter", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/characters/${id}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
// BOOKS
export const getBooks = createAsyncThunk("getBooks", async (data) => {
  try {
    let response;
    if (data.name) {
      response = await customAxios.get(`${baseUrl}/books`, {
        params: {
          name: data.name,
        },
      });
    } else {
      response = await axios.get(`${baseUrl}/books`, {
        params: {
          page: data.page,
          pageSize: data.pageSize,
        },
      });
    }
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const getBook = createAsyncThunk("getBook", async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/books/${id}`, {});
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
});
export const apiSlice = createSlice({
  name: "apiActions",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getHouses.fulfilled, (state, action) => {
      state.houses = action.payload;
    });
    builder.addCase(getHouse.fulfilled, (state, action) => {
      state.house = action.payload;
    });
    builder.addCase(getCharacters.fulfilled, (state, action) => {
      state.characters = action.payload;
    });
    builder.addCase(getCharacter.fulfilled, (state, action) => {
      state.character = action.payload;
    });
    builder.addCase(getBooks.fulfilled, (state, action) => {
      state.books = action.payload;
    });
    builder.addCase(getBook.fulfilled, (state, action) => {
      state.book = action.payload;
    });
  },
});

export default apiSlice.reducer;
