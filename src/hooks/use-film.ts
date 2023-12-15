import {useAppSelector} from './redux-typed-hooks.ts';

export const useFilm = () => {
  const film = useAppSelector((state) => state.film.film);
  const similarFilms = useAppSelector((state) => state.film.similarFilms);
  const isFilmLoading = useAppSelector((state) => state.film.isFilmLoading);

  return {film: film, similarFilms: similarFilms, isFilmLoading: isFilmLoading};
};
