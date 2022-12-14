import { Comments } from './../types/comments';
import { AuthorizationStatus, CITY_LIST, Sort } from './../const';
import {
  changeCity,
  changeSorting,
  fillOfferList,
  requireAuthorization,
  setDataLoading,
  fillOffer,
  setUserName,
  fillBesideList,
  fillCommentList,
} from './action';
import { createReducer } from '@reduxjs/toolkit';
import { Offer, Offers } from '../types/offers';

type InitialState = {
  city: string;
  offers: Offers;
  offer: Offer | null;
  besideList: Offers;
  comments: Comments;
  sorting: string;
  loading: boolean;
  authorizationStatus: AuthorizationStatus;
  userName: string | null;
}

const initialState: InitialState = {
  city: CITY_LIST[0],
  offers: [],
  offer: null,
  besideList: [],
  comments: [],
  sorting: Sort.Popular,
  loading: true,
  authorizationStatus: AuthorizationStatus.Unknown,
  userName: null
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
    .addCase(fillOffer, (state, action) => {
      state.offer = action.payload;
    })
    .addCase(fillBesideList, (state, action) => {
      state.besideList = action.payload;
    })
    .addCase(fillCommentList, (state, action) => {
      state.comments = action.payload;
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
    })
    .addCase(setUserName, (state, action) => {
      state.userName = action.payload;
    });
});

export { reducer };
