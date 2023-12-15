import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './auth/auth-slice.ts';
import {mainSlice} from './main/main-slice.ts';
import {filmSlice} from './film/film-slice.ts';

export const reducer = combineReducers({
  auth: authSlice.reducer,
  main: mainSlice.reducer,
  film: filmSlice.reducer
});
