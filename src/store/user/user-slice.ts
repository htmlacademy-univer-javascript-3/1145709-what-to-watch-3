import {AuthorizationStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getFavoriteFilms, getLoginData, logout, postLoginData} from '../thunks.ts';
import {UserState} from '../../types/state.ts';

const initialState: UserState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  isAuthenticated: false,
  authData: null,
  isAuthLoading: false,
  favoriteFilms: [],
  favoriteFilmsCount: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    incrementFavoriteFilmsCount: (state) => {
      if (state.favoriteFilmsCount !== null) {
        state.favoriteFilmsCount = state.favoriteFilmsCount + 1;
      }
    },
    decrementFavoriteFilmsCount: (state) => {
      if (state.favoriteFilmsCount !== null && state.favoriteFilmsCount > 0) {
        state.favoriteFilmsCount = state.favoriteFilmsCount - 1;
      }
    }
  },
  extraReducers(builder){
    builder
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAuthenticated = true;
      })
      .addCase(postLoginData.rejected, (state) => {
        state.authData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(getLoginData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAuthenticated = true;
        state.isAuthLoading = false;
      })
      .addCase(getLoginData.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthenticated = false;
        state.isAuthLoading = true;
      })
      .addCase(getLoginData.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthenticated = false;
        state.isAuthLoading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.favoriteFilmsCount = null;
        state.favoriteFilms = [];
        state.isAuthenticated = false;
      })
      .addCase(getFavoriteFilms.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
        state.favoriteFilmsCount = action.payload.length;
      });
  }});

export const {incrementFavoriteFilmsCount, decrementFavoriteFilmsCount} = userSlice.actions;
