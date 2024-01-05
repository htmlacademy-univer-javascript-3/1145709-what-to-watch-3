import {describe} from 'vitest';
import {films} from '../../mocks/films';
import {changeGenre, mainSlice} from './main-slice.ts';
import {MainState} from '../../types/state.ts';
import {DefaultFilmGenre} from '../../const.ts';
import {getAllFilms, getPromoFilm} from '../thunks.ts';
import {film} from '../../mocks/film.ts';


describe('General store slice', () => {
  const defaultState: MainState = {
    promoFilm: null,
    films: [],
    genre: DefaultFilmGenre,
    isFilmListLoading: false,
  };

  it('should return initial state with empty action', () => {
    const emptyAction = {type: ''};
    const expectedState = defaultState;

    const result = mainSlice.reducer(defaultState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  describe('getAllFilms', () => {
    it('should return  correct state with pending', () => {
      const expectedState = {...defaultState, isFilmListLoading: true};

      const result = mainSlice.reducer(defaultState, getAllFilms.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        films: films,
      };

      const result = mainSlice.reducer(defaultState, getAllFilms.fulfilled(films, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  describe('getPromoFilm', () => {
    it('should return correct state with pending', () => {
      const expectedState = {
        ...defaultState,
        isFilmListLoading: true,
      };

      const result = mainSlice.reducer(defaultState, getPromoFilm.pending);

      expect(result).toEqual(expectedState);
    });

    it('should return correct state with fulfilled', () => {
      const expectedState = {
        ...defaultState,
        promoFilm: film,
      };

      const result = mainSlice.reducer(defaultState, getPromoFilm.fulfilled(film, '', undefined));

      expect(result).toEqual(expectedState);
    });
  });

  it('should change genre with changeGenre', () => {
    const genre = 'test';
    const expectedState = {
      ...defaultState,
      genre: genre,
    };

    const result = mainSlice.reducer(defaultState, changeGenre(genre));

    expect(result).toEqual(expectedState);
  });
});
