import {StoreSchema} from '../../types/state';

export const selectAuthorizationStatus = (state: Pick<StoreSchema, 'user'>) => state.user.authorizationStatus;
export const selectIsAuthenticated = (state: Pick<StoreSchema, 'user'>) => state.user.isAuthenticated;
export const selectAuthData = (state: Pick<StoreSchema, 'user'>) => state.user.authData;
export const selectIsAuthLoading = (state: Pick<StoreSchema, 'user'>) => state.user.isAuthLoading;
export const selectFavoriteFilms = (state: Pick<StoreSchema, 'user'>) => state.user.favoriteFilms;
export const selectFavoriteFilmsCount = (state: Pick<StoreSchema, 'user'>) => state.user.favoriteFilmsCount;
