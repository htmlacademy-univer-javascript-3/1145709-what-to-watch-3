import {createAction} from '@reduxjs/toolkit';
import {DEFAULT_MORE_COUNTER_VALUE} from '../const.ts';
export const filterFilmsByGenre = createAction('GET_FILMS_BY_GENRE');
export const incMoreCounter = createAction('INCREMENT_MORE_COUNTER');
export const resetMoreCounter = createAction('RESET_MORE_COUNTER', (value?: number) => ({
  payload: value ?? DEFAULT_MORE_COUNTER_VALUE,
}));

export const clearAuthData = createAction('CLEAR_AUTH_DATA');
