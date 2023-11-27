import {useNavigate, useSearchParams} from 'react-router-dom';
import {changeGenre, filterFilmsByGenre} from '../../store/action';
import {useEffect} from 'react';
import {useAppSelector} from '../../hooks/redux-typed-hooks';
import {useDispatch} from 'react-redux';
import {DefaultFilmGenre} from '../../const.ts';

export const GenreList = () => {
  const navigate = useNavigate();
  const currentGenre = useAppSelector((state) => state.genre);
  const dispatch = useDispatch();
  const films = useAppSelector((state) => state.films);

  const uniqueGenres = [...new Set(films.map((x) => x.genre))];
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(changeGenre(searchParams.get('genre') || DefaultFilmGenre));
  }, [dispatch, searchParams]);

  const onClickHandler = (genre: string) => {
    dispatch(changeGenre(genre));
    dispatch(filterFilmsByGenre());
    navigate(`?genre=${genre}`);
  };

  return (
    <ul className="catalog__genres-list">
      <li className={`catalog__genres-item ${currentGenre === DefaultFilmGenre ? 'catalog__genres-item--active' : ''}`}>
        <div className="catalog__genres-link" style={{cursor: 'pointer'}} onClick={() => onClickHandler(DefaultFilmGenre)}>
          All genres
        </div>
      </li>
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
