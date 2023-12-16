export interface AuthData {
  name: string;
  avatarUrl: string;
  email: string;
  token: string;
}

export interface AuthPost {
  email: string;
  password: string;
}

export interface ChangeFavoriteFilmsData {
  filmId: string;
  status: 0 | 1;
}
