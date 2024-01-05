import {describe} from 'vitest';

import {decrementFavoriteFilmsCount, incrementFavoriteFilmsCount, userSlice} from './user-slice.ts';
import {AuthorizationStatus} from '../../const.ts';
import {authData} from '../../mocks/auth-data.ts';
import {getFavoriteFilms, getLoginData, logout, postLoginData} from '../thunks.ts';
import {authError} from '../../mocks/auth-error.ts';
import {films} from '../../mocks/films.ts';

describe('User store slice', () => {
  const defaultState = {
    authorizationStatus: AuthorizationStatus.NoAuth,
    isAuthenticated: false,
    authData: null,
    isAuthLoading: false,
    favoriteFilms: [],
    favoriteFilmsCount: null,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = {
      ...defaultState,
    };

    const result = userSlice.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('loginGet', () => {
    it('should return correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        authData: authData
      };

      const result = userSlice.reducer(undefined, getLoginData.fulfilled(authData, '', undefined));

      expect(result).toEqual(expectedState);
    });

    it('should return correct state with rejected', () => {
      const expectedState = {
        ...defaultState,
      };

      const result = userSlice.reducer(undefined, getLoginData.rejected(null, '', undefined, authError));

      expect(result).toEqual(expectedState);
    });
  });

  describe('postLoginData', () => {
    it('should return correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        authData: authData,
      };

      const result = userSlice.reducer(undefined, postLoginData.fulfilled(authData, '', {email: 'example@post.com', password: 'qwe123'}));

      expect(result).toEqual(expectedState);
    });

    it('should return correct state with rejected', () => {
      const expectedState = {
        ...defaultState,
      };

      const result = userSlice.reducer(undefined, postLoginData.rejected(null, '', {email: 'example@post.com', password: 'qwe123'}, authError));

      expect(result).toEqual(expectedState);
    });
  });

  describe('logout', () => {
    it('should return correct state with logout.fulfilled', () => {
      const expectedState = {
        ...defaultState,
      };
      const initialState = {...expectedState, authData: authData, authorizationStatus: AuthorizationStatus.Auth};

      const result = userSlice.reducer(initialState, logout.fulfilled);

      expect(result).toEqual(expectedState);
    });
  });

  describe('getFavoriteFilms', () => {
    it('should return correct state with getFavoriteFilms.fulfilled', () => {
      const expectedState = {
        ...defaultState,
        favoriteFilms: films,
        favoriteFilmsCount: 25
      };

      const result = userSlice.reducer(undefined, getFavoriteFilms.fulfilled(films, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('counter increment and decrement', () => {
    it('should return correct state with incrementFavoriteFilmsCount', () => {
      const expectedState = {
        ...defaultState,
        favoriteFilmsCount: 3
      };

      const initialState = {...expectedState, favoriteFilmsCount: 2};
      const result = userSlice.reducer(initialState, incrementFavoriteFilmsCount);

      expect(result).toEqual(expectedState);
    });

    it('should return correct state with decrementFavoriteFilmsCount', () => {
      const initialState = {...defaultState, favoriteFilmsCount: 1};

      const result1 = userSlice.reducer(initialState, decrementFavoriteFilmsCount);
      expect(result1.favoriteFilmsCount).toEqual(0);

      const result2 = userSlice.reducer(initialState, decrementFavoriteFilmsCount);
      expect(result2.favoriteFilmsCount).toEqual(0);
    });
  });
});
