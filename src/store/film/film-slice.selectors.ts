import {StoreSchema} from '../../types/state';

export const selectFilm = (state: Pick<StoreSchema, 'film'>) => state.film.film;
export const selectSimilarFilms = (state: Pick<StoreSchema, 'film'>) => state.film.similarFilms;
export const selectFilmComments = (state: Pick<StoreSchema, 'film'>) => state.film.filmComments;
export const selectIsFilmLoading = (state: Pick<StoreSchema, 'film'>) => state.film.isFilmLoading;
