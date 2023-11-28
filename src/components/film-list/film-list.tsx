import {Film, Films} from '../../types/film';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';
import {GenreList} from '../genre-list/genre-list.tsx';
import {DefaultMoreCounterValue} from '../../const.ts';
import {ShowMore} from '../show-more/show-more.tsx';


interface FilmListProps {
  films: Films;
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

  return (
    <section className={className ?? 'catalog'}>
      <h2 className={showTitle ? 'catalog__title' : 'catalog__title visually-hidden'}>{title}</h2>

      {showGenres && <GenreList/>}


      <div className="catalog__films-list">
        {films.slice(0, limit).map(
          (film: Film) => <FilmCard film={film} key={film.id} onMouseEnter={() => setCurrentFilm(film)}/>
        )}
      </div>

      {showMore && <ShowMore/>}
    </section>
  );
}
