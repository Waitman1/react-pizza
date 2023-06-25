import { RootState } from '../store';

export const selectPizzaItems = (state: RootState) => state.pizzaSlice;
