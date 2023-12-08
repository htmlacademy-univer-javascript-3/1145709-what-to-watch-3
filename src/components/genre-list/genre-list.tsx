import {useNavigate, useSearchParams} from 'react-router-dom';
import {changeGenre} from '../../store/action';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks';
import {DefaultFilmGenre} from '../../const.ts';

export const GenreList = () => {
  const navigate = useNavigate();
  const currentGenre = useAppSelector((state) => state.genre);
  const dispatch = useAppDispatch();
  const films = useAppSelector((state) => state.films);

  const uniqueGenres = [DefaultFilmGenre, ...new Set(films.map((x) => x.genre))];
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(changeGenre(searchParams.get('genre') || DefaultFilmGenre));
  }, [dispatch, searchParams]);

  const onClickHandler = (genre: string) => {
    dispatch(changeGenre(genre));
    navigate(`?genre=${genre}`);
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
          <div className="catalog__genres-link" style={{cursor: 'pointer'}} onClick={() => onClickHandler(genre)}>
            {genre}
          </div>
        </li>
      ))}
    </ul>
  );
};