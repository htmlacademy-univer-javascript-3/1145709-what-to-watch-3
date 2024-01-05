import {getComments, getFilmById, getSimilarFilms} from '../thunks.ts';
import {createSlice} from '@reduxjs/toolkit';
import {FilmState} from '../../types/state.ts';

const initialState: FilmState = {
  film: null,
  similarFilms: [],
  filmComments: [],
  isFilmLoading: false,
};

export const filmSlice = createSlice({
  name: 'film',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getFilmById.pending, (state) => {
        state.isFilmLoading = true;
        state.film = null;
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.isFilmLoading = false;
        state.film = action.payload;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.filmComments = action.payload;
      })
      .addCase(getSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      });
  }});
