import {store} from '../store/store.ts';
import {AuthData} from './user.ts';
import {FilmShallow} from './film-shallow.ts';
import {Film} from './film.ts';
import {FilmComment} from './film-comment.ts';
import {FilmPromo} from './film-promo.ts';
import {AuthorizationStatus} from './enums.ts';

export interface FilmState {
  film: Film | null;
  similarFilms: FilmShallow[];
  filmComments: FilmComment[];
  isFilmLoading: boolean;
}
export interface MainState {
  promoFilm: FilmPromo | null;
  films: FilmShallow[];
  genre: string;
  isFilmListLoading: boolean;
}
export interface UserState {
  authorizationStatus: AuthorizationStatus;
  authData: AuthData | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  favoriteFilms: FilmShallow[];
  favoriteFilmsCount: number | null;
}

export type StoreSchema = ReturnType<typeof store.getState>;
