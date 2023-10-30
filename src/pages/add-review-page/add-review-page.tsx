import {Films} from '../../types/film';
import {useFilm} from '../../hooks/use-film';
import {AppRoute} from '../../const';
import {Navigate} from 'react-router-dom';
import {Header} from '../../components/header/header';
import AddReviewForm from '../../components/add-review-form/add-review-form';

interface AddReviewPageProps {
  films: Films;
}

function AddReviewPage(props: AddReviewPageProps): JSX.Element {
  const {films} = props;
  const film = useFilm(films);

  if (film === undefined) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.imageSrc} alt={film.title} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          showBreadcrumbs
          film={film}
        />

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImageSrc} alt={`${film.title} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm/>
    </section>
  );
}

export default AddReviewPage;
