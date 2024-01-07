import {useNavigate, useSearchParams} from 'react-router-dom';
import {useEffect, useMemo} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks';
import {DefaultFilmGenre} from '../../const.ts';
import {changeGenre} from '../../store/main/main-slice.ts';
import {FilmShallow} from '../../types/film-shallow.ts';
import {selectGenre} from '../../store/main/main-slice.selectors.ts';

interface GenreListProps {
  films: FilmShallow[];
}

export const GenreList = (props: GenreListProps) => {
  const navigate = useNavigate();
  const currentGenre = useAppSelector(selectGenre);
  const dispatch = useAppDispatch();
  const films = props.films;

  const uniqueGenres = useMemo(() => [DefaultFilmGenre, ...new Set(films.map((x) => x.genre))].slice(0, 10), [films]);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(changeGenre(searchParams.get('genre') || DefaultFilmGenre));
  }, [dispatch, searchParams]);

  const onClickHandler = (genre: string) => {
    navigate(`?genre=${genre}`);
  };

  return (
    <ul className="catalog__genres-list">
      {uniqueGenres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${currentGenre === genre ? 'catalog__genres-item--active' : ''}`}>
          <div className="catalog__genres-link" style={{cursor: 'pointer'}} data-testid='genre-button' onClick={() => onClickHandler(genre)}>
            {genre}
          </div>
        </li>
      ))}
    </ul>
  );
};
