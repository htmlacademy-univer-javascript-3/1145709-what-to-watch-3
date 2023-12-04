import {setAuthStatus, filterFilmsByGenre, setFilms, setIsFilmsLoading, setAuthData} from './action.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {StoreSchema} from './reducer.ts';
import {AppDispatch} from '../hooks/redux-typed-hooks.ts';
import {AxiosInstance} from 'axios';
import {FilmShallow} from '../types/filmShallow.ts';
import {AuthData, AuthPost} from '../types/auth.ts';
import {AuthorizationStatus} from '../const.ts';

export enum APIRoute {
  Films = '/films',
  Login = '/login'
}
export const getAllFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getFilms', async (_, {dispatch, extra: api}) => {

  const response = await api.get<FilmShallow[]>(APIRoute.Films);
  dispatch(setIsFilmsLoading(true));
  if (response.status === 200) {
    dispatch(setFilms(response.data));
    dispatch(filterFilmsByGenre());
  }
  dispatch(setIsFilmsLoading(false));
});

export const getLoginData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getLoginData', async (_, {dispatch, extra: api}) => {
  const response = await api.get<AuthData>(APIRoute.Login);
  if (response.status === 200) {
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
    dispatch(setAuthData(response.data));
    localStorage.setItem('token', response.data.token);
  }
});

export const postLoginData = createAsyncThunk<void, AuthPost, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('postLoginData', async (data, {dispatch, extra: api}) => {
  const response = await api.post<AuthData>(APIRoute.Login, data);
  if (response.status === 200 || response.status === 201) {
    dispatch(setAuthStatus(AuthorizationStatus.Auth));
    dispatch(setAuthData(response.data));
    localStorage.setItem('token', response.data.token);
  }
});
