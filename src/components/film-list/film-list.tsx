import FilmCard from '../film-card/film-card';
import {useEffect, useMemo, useState} from 'react';
import {GenreList} from '../genre-list/genre-list.tsx';
import {DEFAULT_FILM_GENRE, DEFAULT_MORE_COUNTER_VALUE} from '../../const.ts';
import {FilmShallow} from '../../types/film-shallow.ts';
import {useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {selectGenre} from '../../store/main/main-slice.selectors.ts';


interface FilmListProps {
  films: FilmShallow[];
  title: string;

  limit?: number;
  showMore?: boolean;
  showTitle?: boolean;
  showGenres?: boolean;
  className?: string;
}

export function FilmList(props: FilmListProps) {
  const {
    films,
    title,
    showGenres = true,
    showTitle = false,
    showMore = true,
    className,
    limit
  } = props;
  const [, setCurrentFilm] = useState({});
  const [moreCounter, setMoreCounter] = useState(DEFAULT_MORE_COUNTER_VALUE);
  const currentGenre = useAppSelector(selectGenre);
  const filteredFilms = useMemo(() => films.filter((film) => film.genre === currentGenre || currentGenre === DEFAULT_FILM_GENRE), [films, currentGenre]);

  useEffect(() => {
    setMoreCounter(DEFAULT_MORE_COUNTER_VALUE);
  }, [currentGenre]);

  return (
    <section className={className ?? 'catalog'}>
      <h2 className={showTitle ? 'catalog__title' : 'catalog__title visually-hidden'}>{title}</h2>

      {showGenres && <GenreList films={films}/>}

      <div className="catalog__films-list">
        {filteredFilms.slice(0, limit ? Math.min(moreCounter, limit) : moreCounter).map(
          (film: FilmShallow) => <FilmCard film={film} key={film.id} onMouseEnter={() => setCurrentFilm(film)}/>
        )}
      </div>

      {showMore && moreCounter < filteredFilms.length &&
        (
          <div className="catalog__more">
            <button className="catalog__button" type="button" data-testid='show-more-button'
              onClick={() => setMoreCounter(moreCounter + DEFAULT_MORE_COUNTER_VALUE)}
            >Show more
            </button>
          </div>
        )}
    </section>
  );
}

