import {useFilm} from '../../hooks/use-film';
import {Header} from '../../components/header/header';
import AddReviewForm from '../../components/add-review-form/add-review-form';
import {Spinner} from '../../components/spinner/spinner.tsx';
import {useEffect} from 'react';
import {getFilmById} from '../../store/thunk.ts';
import {Navigate, useParams} from 'react-router-dom';
import {AppRoute} from '../../const.ts';
import {useAppDispatch} from '../../hooks/redux-typed-hooks.ts';

function AddReviewPage(): JSX.Element {
  const { isFilmLoading, film } = useFilm();
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (id !== undefined) {
      dispatch(getFilmById(id));
    }
  }, [dispatch, id]);

  if (isFilmLoading || film === undefined) {
    return <Spinner/>;
  }

  if (film === null) {
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
