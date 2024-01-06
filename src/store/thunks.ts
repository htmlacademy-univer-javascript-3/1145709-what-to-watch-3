import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch} from '../hooks/redux-typed-hooks.ts';
import {AxiosInstance} from 'axios';
import {FilmShallow} from '../types/film-shallow.ts';
import {AuthData, AuthPost, ChangeFavoriteFilmsData} from '../types/user.ts';
import {Film} from '../types/film.ts';
import {FilmComment, PostCommentData} from '../types/film-comment.ts';
import {setToken} from '../api/utils.ts';
import {StoreSchema} from '../types/state.ts';
import {APIRoute} from '../const.ts';
import {FilmPromo} from '../types/film-promo.ts';

export const getAllFilms = createAsyncThunk<FilmShallow[], undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getFilms', async (_, {extra: api}) => {
  const response = await api.get<FilmShallow[]>(APIRoute.Films);
  return response.data;
});


export const getFilmById = createAsyncThunk<Film, string, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getFilmById', async (id, {extra: api}) => {
  const response = await api.get<Film>(`${APIRoute.Films}/${id}`);
  return response.data;
});


export const getComments = createAsyncThunk<FilmComment[], string, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getComments', async (id, {extra: api}) => {
  const response = await api.get<FilmComment[]>(`${APIRoute.Comments}/${id}`);
  return response.data;
});


export const getSimilarFilms = createAsyncThunk<FilmShallow[], string, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getSimilarFilms', async (id, {extra: api}) => {
  const response = await api.get<FilmShallow[]>(`${APIRoute.Films}/${id}${APIRoute.FilmsSimilar}`);
  return response.data;
});


export const getLoginData = createAsyncThunk<AuthData, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getLoginData', async (_, {extra: api}) => {
  const response = await api.get<AuthData>(APIRoute.Login);
  setToken(response.data.token);
  return response.data;
});

export const postLoginData = createAsyncThunk<AuthData, AuthPost, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('postLoginData', async (data, {extra: api}) => {
  const response = await api.post<AuthData>(APIRoute.Login, data);
  setToken(response.data.token);
  return response.data;
});

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('logout', async (_, {extra: api}) => {
  await api.delete(APIRoute.Logout);
  setToken('');
});

export const postComment = createAsyncThunk<void, PostCommentData, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('postComment', async (data, {dispatch, extra: api}) => {
  const response = await api.post(`${APIRoute.Comments}/${data.id}`, data.form);
  if (response.status === 200 || response.status === 201) {
    dispatch(getComments(data.id));
  }
});


export const getPromoFilm = createAsyncThunk<FilmPromo, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('promoFilm', async (_, {extra: api}) => {
  const response = await api.get<FilmPromo>(APIRoute.Promo);
  return response.data;
});


export const getFavoriteFilms = createAsyncThunk<FilmShallow[], undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('favoriteFilms', async (_, {extra: api}) => {
  const response = await api.get<FilmShallow[]>(APIRoute.Favorite);
  return response.data;
});


export const changeFavoriteFilms = createAsyncThunk<Film, ChangeFavoriteFilmsData, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('changeFavoriteFilms', async (data, {extra: api}) => {
  const response = await api.post<Film>(`${APIRoute.Favorite}/${data.filmId}/${data.status}`);
  return response.data;
});
