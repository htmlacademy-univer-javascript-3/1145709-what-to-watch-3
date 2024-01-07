import {Link, useNavigate, useParams} from 'react-router-dom';
import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import FilmDesc from '../../components/film-desc/film-desc';
import MyListButton from '../../components/my-list-button/my-list-button.tsx';
import {PlayButton} from '../../components/play-button/play-button.tsx';
import {useFilm} from '../../hooks/use-film.ts';
import {LoadingMessage} from '../../components/loading-messsage/loading-message.tsx';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {useEffect} from 'react';
import {getComments, getSimilarFilms} from '../../store/thunks.ts';
import {selectIsAuthenticated} from '../../store/user/user-slice.selectors.ts';
import {selectSimilarFilms} from '../../store/film/film-slice.selectors.ts';
import {AppRoute} from '../../types/enums.ts';

function FilmPage(): JSX.Element {
  const { film } = useFilm();

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const similarFilms = useAppSelector(selectSimilarFilms);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id && film) {
      dispatch(getComments(id));
      dispatch(getSimilarFilms(id));
    }
  }, [navigate, dispatch, id, film]);

  if (film === null) {
    return <LoadingMessage/>;
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
                <PlayButton id={film.id}/>
                <MyListButton film={film}/>
                {isAuthenticated && <Link to={`${AppRoute.Films}/${film.id}/${AppRoute.Review}`} className="btn film-card__button">Add review</Link>}
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
          showTitle
          showMore={false}
          limit={4}
          className={'catalog catalog--like-this'}
        />

        <Footer/>
      </div>
    </>
  );
}

export default FilmPage;
