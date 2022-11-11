import { createAction } from '@reduxjs/toolkit';
import { Offers } from '../types/offers';

export const changeCity = createAction<{
  city: string;
}>('city/change');

export const fillOfferList = createAction<{
  offers: Offers;
}>('offer/fillList');

export const changeSorting = createAction<{
  sorting: string;
}>('sorting/change');
