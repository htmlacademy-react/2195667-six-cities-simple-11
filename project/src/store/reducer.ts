import { CITY_LIST } from './../const';
import { changeCity } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { offers } from '../mocks/offers';

const initialState = {
  city: CITY_LIST[0],
  offers: offers
};

const reducer = createReducer(initialState, (builder) => {
  builder.addCase(changeCity, (state, action) => {
    const { city } = action.payload;
    state.city = city;
  });
});

export { reducer };
