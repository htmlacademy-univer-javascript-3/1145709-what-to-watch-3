import {Film} from './types/film';

export enum AuthorizationStatus {
  Auth= 'AUTH',
  NoAuth = 'NO_AUTH',
}

export enum AppRoute {
  Root = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  Reviews = 'reviews',
  Player = '/player-page',
  NotFound = '/404'
}

export enum DescriptionType {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews'
}

export interface CommonDescriptionProps {
  film: Film;
}

export const DefaultFilmGenre = 'All genres';
export const DefaultMoreCounterValue = 8;

export enum APIRoute {
  Films = '/films',
  FilmsSimilar = '/similar',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
}