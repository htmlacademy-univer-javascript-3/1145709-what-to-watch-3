import {combineReducers} from '@reduxjs/toolkit';
import {userSlice} from './user/user-slice.ts';
import {mainSlice} from './main/main-slice.ts';
import {filmSlice} from './film/film-slice.ts';

export const reducer = combineReducers({
  user: userSlice.reducer,
  main: mainSlice.reducer,
  film: filmSlice.reducer
});
