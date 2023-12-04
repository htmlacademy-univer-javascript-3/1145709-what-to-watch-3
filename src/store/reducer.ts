import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  clearAuthData,
  filterFilmsByGenre,
  incMoreCounter,
  resetMoreCounter,
  setAuthData,
  setAuthStatus,
  setFilms,
  setIsFilmsLoading
} from './action.ts';
import {AuthorizationStatus, DefaultFilmGenre, DefaultMoreCounterValue} from '../const.ts';
import {FilmShallow} from '../types/filmShallow.ts';
import {AuthData} from '../types/auth.ts';

export interface StoreSchema {
  films: FilmShallow[];
  filmsByGenre: FilmShallow[];
  moreCounter: number;
  genre: string;
  isFilmListLoading: boolean;
  authorizationStatus: AuthorizationStatus;
  authData?: AuthData;
  isAuthenticated: boolean;
}

const initialState: StoreSchema = {
  films: [],
  filmsByGenre: [],
  moreCounter: DefaultMoreCounterValue,
  isFilmListLoading: true,
  genre: 'All genres',
  authorizationStatus: AuthorizationStatus.Unknown,
  isAuthenticated: false,
};

export const reducer = createReducer<StoreSchema>(initialState,
  (builder) => {
    builder
      .addCase(filterFilmsByGenre, (state) => {
        state.filmsByGenre = state.films.filter((film) => film.genre === state.genre || state.genre === DefaultFilmGenre);
      })
      .addCase(incMoreCounter, (state) => {
        state.moreCounter = state.moreCounter += 8;
      })
      .addCase(resetMoreCounter, (state, action) => {
        state.moreCounter = action.payload;
      })
      .addCase(changeGenre, (state, action) => {
        state.genre = action.payload;
      })
      .addCase(setFilms, (state, action) => {
        state.films = action.payload;
      })
      .addCase(setIsFilmsLoading, (state, action) => {
        state.isFilmListLoading = action.payload;
      })
      .addCase(setAuthStatus, (state, action) => {
        state.authorizationStatus = action.payload;
        state.isAuthenticated = state.authorizationStatus === AuthorizationStatus.Auth;
      })
      .addCase(setAuthData, (state, action) => {
        state.authData = action.payload;
      })
      .addCase(clearAuthData, (state) => {
        state.authData = undefined;
        state.authorizationStatus = AuthorizationStatus.Unknown;
        state.isAuthenticated = false;
      });
  });
