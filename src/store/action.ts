import {createAction} from '@reduxjs/toolkit';
export const filterFilmsByGenre = createAction('GET_FILMS_BY_GENRE');
export const incMoreCounter = createAction('INCREMENT_MORE_COUNTER');
export const resetMoreCounter = createAction('RESET_MORE_COUNTER');

export const changeGenre = createAction('CHANGE_GENRE', (value: string) => ({
  payload: value,
}));
