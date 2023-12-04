import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  filterFilmsByGenre,
  incMoreCounter,
  resetMoreCounter,
  setFilms,
  setIsFilmsLoading
} from './action.ts';
import {DefaultFilmGenre, DefaultMoreCounterValue} from '../const.ts';
import {FilmShallow} from '../types/filmShallow.ts';

export interface StoreSchema {
  films: FilmShallow[];
  filmsByGenre: FilmShallow[];
  moreCounter: number;
  genre: string;
  isFilmListLoading: boolean;
}

const initialState: StoreSchema = {
  films: [],
  filmsByGenre: [],
  moreCounter: DefaultMoreCounterValue,
  isFilmListLoading: true,
  genre: 'All genres',
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
      });
  });
