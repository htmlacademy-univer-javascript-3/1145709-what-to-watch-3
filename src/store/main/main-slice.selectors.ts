import {StoreSchema} from '../../types/state';

export const selectIsFilmListLoading = (state: Pick<StoreSchema, 'main'>) => state.main.isFilmListLoading;
export const selectFilms = (state: Pick<StoreSchema, 'main'>) => state.main.films;
export const selectGenre = (state: Pick<StoreSchema, 'main'>) => state.main.genre;
export const selectPromoFilm = (state: Pick<StoreSchema, 'main'>) => state.main.promoFilm;
