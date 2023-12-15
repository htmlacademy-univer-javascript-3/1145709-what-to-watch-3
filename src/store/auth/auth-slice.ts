import {AuthorizationStatus} from '../../const.ts';
import {createSlice} from '@reduxjs/toolkit';
import {getLoginData, logout, postLoginData} from '../thunks.ts';
import {AuthState} from '../../types/state.ts';

const initialState: AuthState = {
  authorizationStatus: AuthorizationStatus.NoAuth,
  isAuthenticated: false,
  error: null,
  authData: null,
  isAuthLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(postLoginData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(postLoginData.rejected, (state, action) => {
        state.error = action.error;
      })
      .addCase(getLoginData.fulfilled, (state, action) => {
        state.authData = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.isAuthenticated = true;
        state.isAuthLoading = false;
        state.error = null;
      })
      .addCase(getLoginData.pending, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthenticated = false;
        state.isAuthLoading = true;
        state.error = null;
      })
      .addCase(getLoginData.rejected, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthenticated = false;
        state.error = action.error;
      })
      .addCase(logout.fulfilled, (state) => {
        state.authData = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.isAuthenticated = false;
      });
  }});
