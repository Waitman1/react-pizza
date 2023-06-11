import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';
export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { categoryId, sortType, searchValue, currentPage } = params;
  const { data } = await axios.get(
    `https://646a3ba903bb12ac209d6f61.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ''
    }&sortBy=${sortType.sortProperty.replace('-', '')}&order=${
      sortType.sortProperty.includes('-') ? 'desc' : 'asc'
    }&search=${searchValue ? `${searchValue}` : ''}`,
  );
  return data;
});

const initialState = {
  items: [],
  status: 'loading',
};

export const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(action, state) {
      state.items = action.payload;
    },
  },
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export const selectPizzaItems = (state) => state.pizzaSlice;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
