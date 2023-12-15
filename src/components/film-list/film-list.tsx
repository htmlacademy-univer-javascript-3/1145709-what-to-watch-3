import FilmCard from '../film-card/film-card';
import {useEffect, useState} from 'react';
import {GenreList} from '../genre-list/genre-list.tsx';
import {DefaultFilmGenre, DefaultMoreCounterValue} from '../../const.ts';
import {ShowMore} from '../show-more/show-more.tsx';
import {FilmShallow} from '../../types/film-shallow.ts';
import {useAppSelector} from '../../hooks/redux-typed-hooks.ts';


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
  const {films, title, limit = DefaultMoreCounterValue, showGenres = true, showTitle = false, showMore = limit < films.length, className} = props;
  const [, setCurrentFilm] = useState({});
  const [moreCounter, setMoreCounter] = useState(DefaultMoreCounterValue);
  const currentGenre = useAppSelector((state) => state.main.genre);
  const filteredFilms = films.filter((film) => film.genre === currentGenre || currentGenre === DefaultFilmGenre);

  useEffect(() => {
    setMoreCounter(DefaultMoreCounterValue);
  }, [currentGenre]);

  return (
    <section className={className ?? 'catalog'}>
      <h2 className={showTitle ? 'catalog__title' : 'catalog__title visually-hidden'}>{title}</h2>

      {showGenres && <GenreList/>}

      <div className="catalog__films-list">
        {filteredFilms.slice(0, moreCounter).map(
          (film: FilmShallow) => <FilmCard film={film} key={film.id} onMouseEnter={() => setCurrentFilm(film)}/>
        )}
      </div>

      {showMore && moreCounter < filteredFilms.length && <ShowMore addMoreCounter={(count) => setMoreCounter(moreCounter + count)}/>}
    </section>
  );
}
