import { createAction } from '@reduxjs/toolkit';

export const changeCity = createAction<{
  city: string;
}>('city/change');

export const fillOfferList = createAction('offer/fillList');
