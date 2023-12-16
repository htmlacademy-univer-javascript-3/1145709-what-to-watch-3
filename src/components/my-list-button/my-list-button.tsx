import {FilmPromo} from '../../types/film-promo.ts';
import {Film} from '../../types/film.ts';
import {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {decrementFavoriteFilmsCount, incrementFavoriteFilmsCount} from '../../store/user/user-slice.ts';
import {changeFavoriteFilms} from '../../store/thunks.ts';
import {useNavigate} from 'react-router-dom';
import {APIRoute} from '../../const.ts';

interface MyListButton {
  film: Film | FilmPromo;
}
const MyListButton = (props: MyListButton) => {
  const {film} = props;
  const [isFavorite, setIsFavorite] = useState(film.isFavorite ?? false);
  const favoriteFilmsCount = useAppSelector((state) => state.user.favoriteFilmsCount);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(film.isFavorite ?? false);
  }, [film.isFavorite]);
  const handleMyListButtonClick = () => {
    if (isAuthenticated) {
      setIsFavorite(!isFavorite);
      dispatch(changeFavoriteFilms({
        filmId: film.id,
        status: isFavorite ? 0 : 1
      })).then(() => {
        dispatch(isFavorite ? decrementFavoriteFilmsCount() : incrementFavoriteFilmsCount());
      });
    } else {
      navigate(APIRoute.Login);
    }
  };


  return (
    <button className="btn btn--list film-card__button" type="button" onClick={handleMyListButtonClick}>
      <svg viewBox="0 0 19 20" width="19" height="20">
        {isFavorite ? <use xlinkHref="#in-list"></use> : <use xlinkHref="#add"></use>}
      </svg>
      <span>My list</span>
      {favoriteFilmsCount !== null ? <span className="film-card__count">{favoriteFilmsCount}</span> : undefined}
    </button>
  );
};

export default MyListButton;
