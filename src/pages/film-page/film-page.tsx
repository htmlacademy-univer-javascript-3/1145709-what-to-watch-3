import {Link, useParams} from 'react-router-dom';
import {AppRoute} from '../../const';
import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import FilmDesc from '../../components/film-desc/film-desc';
import {MyListButton} from '../../components/my-list-button/my-list-button.tsx';
import {PlayButton} from '../../components/play-button/play-button.tsx';
import {useFilm} from '../../hooks/use-film.ts';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {useEffect} from 'react';
import {setIsFilmLoading} from '../../store/action.ts';
import {getComments, getFilmById, getSimilarFilms} from '../../store/thunk.ts';

function FilmPage(): JSX.Element {
  const { film, similarFilms, isFilmLoading } = useFilm();

  const isAuthenticated = useAppSelector((state) => state.isAuthenticated);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(setIsFilmLoading(true));
    if (id !== undefined) {
      dispatch(getFilmById(id));
      dispatch(getComments(id));
      dispatch(getSimilarFilms(id));
    }
  }, [dispatch, id]);

  if (isFilmLoading || film === undefined) {
    return <Spinner/>;
  }

  return (
    <>
      <section className="film-card film-card--full" style={{backgroundColor: film.backgroundColor}}>
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.backgroundImage} alt={film.name}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.released}</span>
              </p>

              <div className="film-card__buttons">
                <PlayButton/>
                <MyListButton/>
                {isAuthenticated && <Link to={`${AppRoute.Films}/${film.id}/reviews`} className="btn film-card__button">Add review</Link>}
              </div>
            </div>
          </div>
        </div>

        <FilmDesc film={film}/>
      </section>

      <div className="page-content">
        <FilmList
          films={similarFilms}
          title={'More like this'}
          showGenres={false}
          limit={4}
          showTitle
          showMore={false}
          className={'catalog catalog--like-this'}
        />

        <Footer/>
      </div>
    </>
  );
}

export default FilmPage;
