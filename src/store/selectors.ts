import {StoreSchema} from '../types/state.ts';

export const selectLoadingStatus = (state: StoreSchema) => state.film.isFilmLoading || state.main.isFilmListLoading || state.user.isAuthLoading;
