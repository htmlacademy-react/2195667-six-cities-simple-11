import { Comments } from './../types/comments';
import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosInstance, AxiosResponse } from 'axios';
import { APIRoute, AppRoute, AuthorizationStatus } from '../const';
import { dropToken, saveToken } from '../services/token';
import { AuthData } from '../types/auth-data';
import { Offer, Offers } from '../types/offers';
import { AppDispatch, State } from '../types/state';
import { UserData } from '../types/user-data';

export const redirectToRoute = createAction<AppRoute>('app/redirectToRoute');

export const changeCity = createAction<{
  city: string;
}>('city/change');

export const fillOfferList = createAction<Offers>('offer/fillList');
export const fillOffer = createAction<Offer>('offer/fill');
export const fillBesideList = createAction<Offers>('offer/fillBesideList');
export const fillCommentList = createAction<Comments>('offer/fillCommentList');

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
  dispatch(fillOfferList(data));
  dispatch(setDataLoading(false));
});

export const getOffer = createAsyncThunk<
  void,
  string ,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('offer/getOffer', async (id, { dispatch, extra: api }) => {
  dispatch(setDataLoading(true));
  const { data } = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
  dispatch(fillOffer(data));

  const offersBeside = await api.get<Offers>(`${APIRoute.Offers}/${id}/nearby`);
  const comments = await api.get<Comments>(`${APIRoute.Comments}/${id}`);
  dispatch(fillBesideList(offersBeside.data));
  dispatch(fillCommentList(comments.data));
  dispatch(setDataLoading(false));
});

export const requireAuthorization = createAction<AuthorizationStatus>(
  'user/requireAuthorization'
);
export const setUserName = createAction<string | null>('user/setUserName');

export const checkAuthAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/checkAuth', async (_arg, { dispatch, extra: api }) => {
  try {
    const response: AxiosResponse<UserData> = await api.get(APIRoute.Login);
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
    dispatch(setUserName(response.data.email));
  } catch {
    dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    setUserName(null);
  }
});

export const loginAction = createAsyncThunk<
  void,
  AuthData,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>(
  'user/login',
  async ({ login: email, password }, { dispatch, extra: api }) => {
    const {
      data: { token }
    } = await api.post<UserData>(APIRoute.Login, { email, password });
    saveToken(token);
    dispatch(setUserName(email));
    dispatch(requireAuthorization(AuthorizationStatus.Auth));
  }
);

export const logoutAction = createAsyncThunk<
  void,
  undefined,
  {
    dispatch: AppDispatch;
    state: State;
    extra: AxiosInstance;
  }
>('user/logout', async (_arg, { dispatch, extra: api }) => {
  await api.delete(APIRoute.Logout);
  dropToken();
  setUserName(null);
  dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
});
