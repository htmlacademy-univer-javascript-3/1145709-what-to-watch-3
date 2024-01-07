import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {MainState} from '../../types/state.ts';
import {getAllFilms, getPromoFilm} from '../thunks.ts';
import {DEFAULT_FILM_GENRE} from '../../const.ts';

const initialState: MainState = {
  films: [],
  isFilmListLoading: true,
  genre: DEFAULT_FILM_GENRE,
  promoFilm: null,
};

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getAllFilms.pending, (state) => {
        state.isFilmListLoading = true;
      })
      .addCase(getAllFilms.fulfilled, (state, action) => {
        state.isFilmListLoading = false;
        state.films = action.payload;
      })
      .addCase(getAllFilms.rejected, (state) => {
        state.isFilmListLoading = false;
      })
      .addCase(getPromoFilm.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
      });
  }});

export const {changeGenre} = mainSlice.actions;
