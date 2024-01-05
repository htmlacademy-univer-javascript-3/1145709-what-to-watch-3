import {describe} from 'vitest';
import {comments} from '../../mocks/comments';
import {filmSlice} from './film-slice.ts';
import {FilmState} from '../../types/state.ts';
import {getComments, getFilmById, getSimilarFilms} from '../thunks.ts';
import {film} from '../../mocks/film.ts';
import {similarFilms} from '../../mocks/similar-films.ts';

describe('Film store slice', () => {
  const defaultState: FilmState = {
    film: null,
    similarFilms: [],
    filmComments: [],
    isFilmLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = defaultState;

    const result = filmSlice.reducer(defaultState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('getFilmById', () => {
    it('should return  correct state with pending', () => {
      const expectedState = {
        ...defaultState,
        isFilmLoading: true,
      };

      const result = filmSlice.reducer(defaultState, getFilmById.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        film: film,
      };

      const result = filmSlice.reducer(defaultState, getFilmById.fulfilled(film, '', ''));

      expect(result).toEqual(expectedState);
    });
  });

  describe('getSimilarFilms', () => {
    it('should return  correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        similarFilms: similarFilms,
      };

      const result = filmSlice.reducer(undefined, getSimilarFilms.fulfilled(similarFilms, '', '0'));

      expect(result).toEqual(expectedState);
    });
  });

  describe('getComments', () => {
    it('should return  correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        filmComments: comments,
      };

      const result = filmSlice.reducer(undefined, getComments.fulfilled(comments, '', '0'));

      expect(result).toEqual(expectedState);
    });
  });
});
