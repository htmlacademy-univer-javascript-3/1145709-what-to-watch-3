import {combineReducers} from '@reduxjs/toolkit';
import {authSlice} from './user/auth-slice.ts';
import {mainSlice} from './main/main-slice.ts';
import {filmSlice} from './film/film-slice.ts';

export const reducer = combineReducers({
  user: authSlice.reducer,
  main: mainSlice.reducer,
  film: filmSlice.reducer
});
