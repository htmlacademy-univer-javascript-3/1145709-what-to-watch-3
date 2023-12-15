import {useAppDispatch, useAppSelector} from './redux-typed-hooks.ts';
import {useNavigate, useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {getFilmById} from '../store/thunks.ts';
import {AppRoute} from '../const.ts';

export const useFilm = () => {
  const film = useAppSelector((state) => state.film.film);
  const isFilmLoading = useAppSelector((state) => state.film.isFilmLoading);

  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getFilmById(id)).then((response) => {
        if ('error' in response) {
          navigate(AppRoute.NotFound);
        }
      });
    }
  }, [navigate, dispatch, id]);

  return {film: film, isFilmLoading: isFilmLoading};
};
