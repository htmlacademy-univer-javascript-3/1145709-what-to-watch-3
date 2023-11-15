import {Film, Films} from '../../types/film';
import {Link} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useFilm} from '../../hooks/use-film';
import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {Navigate} from 'react-router-dom';
import FilmDesc from '../../components/film-desc/film-desc';

interface FilmPageProps {
  films: Films;
}

function FilmPage(props: FilmPageProps): JSX.Element {
  const areFilmsGenresSimilar = (film1: Film, film2: Film) => {
    const genre1 = film1.genre.toLowerCase();
    const genre2 = film2.genre.toLowerCase();

    return genre2 === genre1 || genre1.includes(genre2) || genre2.includes(genre1);
  };

  const {films} = props;
  const film = useFilm(films);

  if (film === undefined) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <>
      <section className="film-card film-card--full">
        <div className="film-card__hero">
          <div className="film-card__bg">
            <img src={film.imageSrc} alt={film.title}/>
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header/>

          <div className="film-card__wrap">
            <div className="film-card__desc">
              <h2 className="film-card__title">{film.title}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{film.genre}</span>
                <span className="film-card__year">{film.year}</span>
              </p>

              <div className="film-card__buttons">
                <button className="btn btn--play film-card__button" type="button">
                  <svg viewBox="0 0 19 19" width="19" height="19">
                    <use xlinkHref="#play-s"></use>
                  </svg>
                  <span>Play</span>
                </button>
                <button className="btn btn--list film-card__button" type="button">
                  <svg viewBox="0 0 19 20" width="19" height="20">
                    <use xlinkHref="#add"></use>
                  </svg>
                  <span>My list</span>
                  <span className="film-card__count">9</span>
                </button>
                <Link to={`${AppRoute.Films}/${film.id}/reviews`} className="btn film-card__button">Add review</Link>
              </div>
            </div>
          </div>
        </div>

        <FilmDesc film={film}/>
      </section>

      <div className="page-content">
        <FilmList
          films={films.filter((localFilm) => film && areFilmsGenresSimilar(localFilm, film))}
          title={'More like this'}
          showGenres={false}
          stepCount={4}
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
