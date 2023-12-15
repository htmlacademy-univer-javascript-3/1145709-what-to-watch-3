import {store} from '../store/store.ts';
import {AuthorizationStatus} from '../const.ts';
import {AuthData} from './auth.ts';
import {SerializedError} from '@reduxjs/toolkit';
import {FilmShallow} from './film-shallow.ts';
import {Film} from './film.ts';
import {FilmComment} from './film-comment.ts';
import {FilmPromo} from './film-promo.ts';

export interface FilmState {
  film: Film | null;
  similarFilms: FilmShallow[];
  filmComments: FilmComment[];
  isFilmLoading: boolean;
  error: SerializedError | null;
}
export interface MainState {
  promoFilm: FilmPromo | null;
  films: FilmShallow[];
  genre: string;
  isFilmListLoading: boolean;
  error: SerializedError | null;
}
export interface AuthState {
  authorizationStatus: AuthorizationStatus;
  authData: AuthData | null;
  isAuthenticated: boolean;
  error: SerializedError | null;
  isAuthLoading: boolean;
}

export type StoreSchema = ReturnType<typeof store.getState>;
