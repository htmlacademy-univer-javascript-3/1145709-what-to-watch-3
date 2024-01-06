import FilmCard from '../film-card/film-card';
import {useEffect, useMemo, useState} from 'react';
import {GenreList} from '../genre-list/genre-list.tsx';
import {DefaultFilmGenre, DefaultMoreCounterValue} from '../../const.ts';
import {FilmShallow} from '../../types/film-shallow.ts';
import {useAppSelector} from '../../hooks/redux-typed-hooks.ts';


interface FilmListProps {
  films: FilmShallow[];
  title: string;

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
    className
  } = props;
  const [, setCurrentFilm] = useState({});
  const [moreCounter, setMoreCounter] = useState(DefaultMoreCounterValue);
  const currentGenre = useAppSelector((state) => state.main.genre);
  const filteredFilms = useMemo(() => films.filter((film) => film.genre === currentGenre || currentGenre === DefaultFilmGenre), [films, currentGenre]);

  useEffect(() => {
    setMoreCounter(DefaultMoreCounterValue);
  }, [currentGenre]);

  return (
    <section className={className ?? 'catalog'}>
      <h2 className={showTitle ? 'catalog__title' : 'catalog__title visually-hidden'}>{title}</h2>

      {showGenres && <GenreList films={films}/>}

      <div className="catalog__films-list">
        {filteredFilms.slice(0, moreCounter).map(
          (film: FilmShallow) => <FilmCard film={film} key={film.id} onMouseEnter={() => setCurrentFilm(film)}/>
        )}
      </div>

      {showMore && moreCounter < filteredFilms.length &&
        (
          <div className="catalog__more">
            <button className="catalog__button" type="button" data-testid='show-more-button'
              onClick={() => setMoreCounter(moreCounter + DefaultMoreCounterValue)}
            >Show more
            </button>
          </div>
        )}
    </section>
  );
}

