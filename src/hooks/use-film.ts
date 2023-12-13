import {useAppSelector} from './redux-typed-hooks.ts';

export const useFilm = () => {
  const film = useAppSelector((state) => state.film);
  const similarFilms = useAppSelector((state) => state.films);
  const isFilmLoading = useAppSelector((state) => state.isFilmLoading);

  return {film: film, similarFilms: similarFilms, isFilmLoading: isFilmLoading};
};
