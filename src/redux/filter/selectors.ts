import { RootState } from '../store';

export const selectSortFilter = (state: RootState) => state.filterSlice;

export const selectSort = (state: RootState) => state.filterSlice.sortType;
