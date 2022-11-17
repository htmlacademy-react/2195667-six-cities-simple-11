import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { APIRoute } from '../const';
import { Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state';

export const changeCity = createAction<{
  city: string;
}>('city/change');

export const fillOfferList = createAction<Offers>('offer/fillList');

export const changeSorting = createAction<{
  sorting: string;
}>('sorting/change');

export const setDataLoading = createAction<boolean>('loading/change');

export const fetchOfferList = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/fetchList', async (_arg, { dispatch, extra: api }) => {
  dispatch(setDataLoading(true));
  const { data } = await api.get<Offers>(APIRoute.Offers);
  dispatch(setDataLoading(false));
  dispatch(fillOfferList(data));
});
