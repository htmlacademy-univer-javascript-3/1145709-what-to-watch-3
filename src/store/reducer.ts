import {createReducer} from '@reduxjs/toolkit';
import {Films} from '../types/film.ts';
import {changeGenre, filterFilmsByGenre} from './action.ts';
import {films} from '../mocks/films.ts';
import {DefaultFilmGenre} from '../const.ts';

export interface StoreSchema {
  films: Films;
  filmsByGenre: Films;
  genre: string;
}

const initialState: StoreSchema = {
  films: films,
  filmsByGenre: [],
  genre: 'All genres',
};

export const reducer = createReducer<StoreSchema>(initialState,
  (builder) => {
    builder
      .addCase(filterFilmsByGenre, (state) => {
        state.filmsByGenre = state.films.filter((film) => film.genre === state.genre || state.genre === DefaultFilmGenre);
      })
      .addCase(changeGenre, (state, action) => {
        state.genre = action.payload;
      });
  });
