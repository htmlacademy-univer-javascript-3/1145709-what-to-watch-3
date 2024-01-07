export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
}

export enum AppRoute {
  Root = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Films = '/films',
  Review = 'review',
  Player = '/player',
  NotFound = '/404'
}

export type RatingDescriptions = 'Bad' | 'Normal' | 'Good' | 'Very good' | 'Awesome'

export enum APIRoute {
  Films = '/films',
  Favorite = '/favorite',
  FilmsSimilar = '/similar',
  Login = '/login',
  Logout = '/logout',
  Comments = '/comments',
  Promo = '/promo',
}

export enum DescriptionType {
  Overview = 'overview',
  Details = 'details',
  Reviews = 'reviews'
}
