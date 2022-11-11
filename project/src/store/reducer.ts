import { CITY_LIST, Sort } from './../const';
import { changeCity, changeSorting, fillOfferList } from './action';
import { createReducer } from '@reduxjs/toolkit';
import { offerList } from '../mocks/offers';

const initialState = {
  city: CITY_LIST[0],
  offers: offerList,
  sorting: Sort.Popular as string
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(fillOfferList, (state, action) => {
      const { offers } = action.payload;
      state.offers = offers;
    })
    .addCase(changeSorting, (state, action) => {
      const { sorting } = action.payload;
      state.sorting = sorting;
    });
});

export { reducer };
