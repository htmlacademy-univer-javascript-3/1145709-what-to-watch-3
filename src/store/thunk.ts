import {
  setAuthStatus,
  filterFilmsByGenre,
  setFilms,
  setIsFilmsLoading,
  setAuthData,
  setIsFilmLoading, setFilm, setComments, setSimilarFilms, clearAuthData
} from './action.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {StoreSchema} from './reducer.ts';
import {AppDispatch} from '../hooks/redux-typed-hooks.ts';
import {AxiosInstance} from 'axios';
import {FilmShallow} from '../types/filmShallow.ts';
import {AuthData, AuthPost} from '../types/auth.ts';
import {AuthorizationStatus} from '../const.ts';
import {Film} from '../types/film.ts';
import {FilmComment, PostCommentData} from '../types/film-comment.ts';
import {setToken} from '../api/utils.ts';

export enum APIRoute {
  Films = '/films',
  FilmsSimilar = '/similar',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
}
export const getAllFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getFilms', async (_, {dispatch, extra: api}) => {
  dispatch(setIsFilmsLoading(true));
  const response = await api.get<FilmShallow[]>(APIRoute.Films);
  if (response.status === 200) {
    dispatch(setFilms(response.data));
    dispatch(filterFilmsByGenre());
  }
  dispatch(setIsFilmsLoading(false));
});


export const getFilmById = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getFilm', async (id, {dispatch, extra: api}) => {
  dispatch(setIsFilmLoading(true));
  try {
    const response = await api.get<Film>(`${APIRoute.Films}/${id}`);
    if (response.status === 200) {
      dispatch(setFilm(response.data));
    }
  } catch (e) {
    dispatch(setFilm(null));
  } finally {
    dispatch(setIsFilmLoading(false));
  }
});


export const getComments = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getComments', async (id, {dispatch, extra: api}) => {
  const response = await api.get<FilmComment[]>(`${APIRoute.Comments}/${id}`);
  if (response.status === 200) {
    dispatch(setComments(response.data));
  }
});


export const getSimilarFilms = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getSimilarFilms', async (id, {dispatch, extra: api}) => {
  const response = await api.get<FilmShallow[]>(`${APIRoute.Films}/${id}${APIRoute.FilmsSimilar}`);
  if (response.status === 200) {
    dispatch(setSimilarFilms(response.data));
  }
});


export const getLoginData = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getLoginData', async (_, {dispatch, extra: api}) => {
  try {
    const response = await api.get<AuthData>(APIRoute.Login);
    if (response.status === 200) {
      dispatch(setAuthStatus(AuthorizationStatus.Auth));
      dispatch(setAuthData(response.data));
      setToken(response.data.token);
    }
  } catch (e) {
    dispatch(setAuthStatus(AuthorizationStatus.NoAuth));
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
    setToken(response.data.token);
  }
});

export const logout = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('logout', async (_, {dispatch, extra: api}) => {
  const response = await api.delete(APIRoute.Logout);
  if (response.status === 204) {
    dispatch(clearAuthData());
    localStorage.removeItem('token');
  }
});

export const postComment = createAsyncThunk<void, PostCommentData, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('logout', async (data, {dispatch, extra: api}) => {
  const response = await api.post(`${APIRoute.Comments}/${data.id}`, data.form);
  if (response.status === 200 || response.status === 201) {
    dispatch(getComments(data.id));
  }
});
