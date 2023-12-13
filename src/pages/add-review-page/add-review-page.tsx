import {useFilm} from '../../hooks/use-film';
import {AppRoute} from '../../const';
import {Navigate} from 'react-router-dom';
import {Header} from '../../components/header/header';
import AddReviewForm from '../../components/add-review-form/add-review-form';

function AddReviewPage(): JSX.Element {
  const { film } = useFilm();

  if (film === undefined) {
    return <Navigate to={AppRoute.NotFound}/>;
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name} />
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <Header
          showBreadcrumbs
          film={film}
        />

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={`${film.name} poster`} width="218" height="327" />
        </div>
      </div>

      <AddReviewForm/>
    </section>
  );
}

export default AddReviewPage;
