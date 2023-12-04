import FilmCard from '../film-card/film-card';
import {useEffect, useState} from 'react';
import {GenreList} from '../genre-list/genre-list.tsx';
import {DefaultMoreCounterValue} from '../../const.ts';
import {ShowMore} from '../show-more/show-more.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {StoreSchema} from '../../store/reducer.ts';
import {resetMoreCounter} from '../../store/action.ts';
import {FilmShallow} from '../../types/filmShallow.ts';


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
  const moreCounter = useAppSelector((state: StoreSchema) => state.moreCounter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(resetMoreCounter());
  }, [dispatch]);

  return (
    <section className={className ?? 'catalog'}>
      <h2 className={showTitle ? 'catalog__title' : 'catalog__title visually-hidden'}>{title}</h2>

      {showGenres && <GenreList/>}


      <div className="catalog__films-list">
        {films.slice(0, moreCounter).map(
          (film: FilmShallow) => <FilmCard film={film} key={film.id} onMouseEnter={() => setCurrentFilm(film)}/>
        )}
      </div>

      {showMore && moreCounter < films.length && <ShowMore/>}
    </section>
  );
}
