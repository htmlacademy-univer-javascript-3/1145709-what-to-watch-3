import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, Routes} from 'react-router-dom';
import {Page404} from '../../pages/404/404.tsx';
import SignInPage from '../../pages/sign-in-page/sign-in-page.tsx';
import MyListPage from '../../pages/my-list/my-list-page.tsx';
import FilmPage from '../../pages/film-page/film-page.tsx';
import AddReviewPage from '../../pages/add-review-page/add-review-page.tsx';
import PlayerPage from '../../pages/player-page/player-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {AppRoute, AuthorizationStatus} from '../../const.ts';
import {Films} from '../../types/film';

interface AppProps {
  films: Films;
}

function App(props: AppProps): JSX.Element {
  const { films } = props;

  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={
          <MainPage promoFilmGenre={'Drama'}
            films={films}
            promoFilmName={'The Grand Budapest Hotel'}
            promoFilmReleaseDate={new Date(2014, 0)}
          />
        }
        />
        <Route path={AppRoute.SignIn} element={<SignInPage />} />
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
            <MyListPage films={films} />
          </PrivateRoute>
        }
        />
        <Route path={`${AppRoute.Films}/:id/`} >
          <Route index element={<FilmPage films={films} />} />
          <Route path={AppRoute.Reviews} element={<AddReviewPage films={films}/>} />
        </Route>
        <Route index path={`${AppRoute.Player}/:id/`} element={<PlayerPage films={films} />} />
      </Route>
      <Route path='*' element={<Page404 />} />
    </Routes>
  );
}

export default App;
