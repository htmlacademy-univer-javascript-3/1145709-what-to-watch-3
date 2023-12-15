import {getComments, getFilmById, getSimilarFilms} from '../thunks.ts';
import {createSlice} from '@reduxjs/toolkit';
import {FilmState} from '../../types/state.ts';

const initialState: FilmState = {
  film: null,
  similarFilms: [],
  filmComments: [],
  isFilmLoading: false,
  error: null,
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
        state.error = null;
      })
      .addCase(getFilmById.fulfilled, (state, action) => {
        state.isFilmLoading = false;
        state.film = action.payload;
      })
      .addCase(getFilmById.rejected, (state, action) => {
        state.isFilmLoading = false;
        state.error = action.error;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.filmComments = action.payload;
      })
      .addCase(getSimilarFilms.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
      });
  }});
