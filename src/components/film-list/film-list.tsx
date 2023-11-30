import {Film, Films} from '../../types/film';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';
import {GenreList} from '../genre-list/genre-list.tsx';


interface FilmListProps {
  films: Films;
  title: string;
  stepCount?: number;

  showMore?: boolean;
  showTitle?: boolean;
  showGenres?: boolean;
  className?: string;
}

export function FilmList(props: FilmListProps) {
  const {films, title, stepCount = 32, showGenres = true, showTitle = false, showMore = true, className} = props;
  const [, setCurrentFilm] = useState({});

  return (
    <section className={className ?? 'catalog'}>
      <h2 className={showTitle ? 'catalog__title' : 'catalog__title visually-hidden'}>{title}</h2>

      {showGenres && <GenreList />}


      <div className="catalog__films-list">
        {films.slice(0, stepCount).map(
          (film: Film) => <FilmCard film={film} key={film.id} onMouseEnter={() => setCurrentFilm(film)}/>
        )}
      </div>

      {showMore &&
        <div className="catalog__more">
          <button className="catalog__button" type="button">Show more</button>
        </div>}
    </section>
  );
}
