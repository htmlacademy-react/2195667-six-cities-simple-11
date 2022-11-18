import { AuthorizationStatus, CITY_LIST, Sort } from './../const';
import {
  changeCity,
  changeSorting,
  fillOfferList,
  requireAuthorization,
  setDataLoading
} from './action';
import { createReducer } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';

type InitialState = {
  city: string;
  offers: Offers;
  sorting: string;
  loading: boolean;
  authorizationStatus: AuthorizationStatus;
}

const initialState: InitialState = {
  city: CITY_LIST[0],
  offers: [],
  sorting: Sort.Popular,
  loading: true,
  authorizationStatus: AuthorizationStatus.Unknown
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const { city } = action.payload;
      state.city = city;
    })
    .addCase(fillOfferList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(changeSorting, (state, action) => {
      const { sorting } = action.payload;
      state.sorting = sorting;
    })
    .addCase(setDataLoading, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export { reducer };
