import {createAction} from '@reduxjs/toolkit';
import {FilmShallow} from '../types/filmShallow.ts';
import {AuthorizationStatus, DefaultMoreCounterValue} from '../const.ts';
import {AuthData} from '../types/auth.ts';
import {Film} from '../types/film.ts';
import {FilmComment} from '../types/film-comment.ts';
export const filterFilmsByGenre = createAction('GET_FILMS_BY_GENRE');
export const incMoreCounter = createAction('INCREMENT_MORE_COUNTER');
export const resetMoreCounter = createAction('RESET_MORE_COUNTER', (value?: number) => ({
  payload: value ?? DefaultMoreCounterValue,
}));
export const setFilms = createAction('SET_FILMS', (value: FilmShallow[]) => ({
  payload: value,
}));

export const setSimilarFilms = createAction('SET_SIMILAR_FILMS', (value: FilmShallow[]) => ({
  payload: value,
}));

export const setFilm = createAction('SET_FILM', (value: Film) => ({
  payload: value,
}));

export const setComments = createAction('SET_COMMENTS', (value: FilmComment[]) => ({
  payload: value,
}));

export const setIsFilmsLoading = createAction('SET_IS_FILMS_LOADING', (value: boolean) => ({
  payload: value,
}));

export const setIsFilmLoading = createAction('SET_IS_FILM_LOADING', (value: boolean) => ({
  payload: value,
}));

export const changeGenre = createAction('CHANGE_GENRE', (value: string) => ({
  payload: value,
}));

export const setAuthStatus = createAction('SET_AUTH_STATUS', (value: AuthorizationStatus) => ({
  payload: value,
}));

export const setAuthData = createAction('SET_AUTH_DATA', (value: AuthData) => ({
  payload: value,
}));

export const clearAuthData = createAction('CLEAR_AUTH_DATA');
