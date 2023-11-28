import {createReducer} from '@reduxjs/toolkit';
import {Films} from '../types/film.ts';
import {changeGenre, filterFilmsByGenre, incMoreCounter, resetMoreCounter} from './action.ts';
import {films} from '../mocks/films.ts';
import {DefaultFilmGenre, DefaultMoreCounterValue} from '../const.ts';

export interface StoreSchema {
  films: Films;
  filmsByGenre: Films;
  moreCounter: number;
  genre: string;
}

const initialState: StoreSchema = {
  films: films,
  filmsByGenre: [],
  moreCounter: DefaultMoreCounterValue,
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
      .addCase(resetMoreCounter, (state) => {
        state.moreCounter = DefaultMoreCounterValue;
      })
      .addCase(changeGenre, (state, action) => {
        state.genre = action.payload;
      });
  });
