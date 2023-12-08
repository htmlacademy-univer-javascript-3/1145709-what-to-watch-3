import MainPage from '../../pages/main-page/main-page.tsx';
import {Route, Routes} from 'react-router-dom';
import {Page404} from '../../pages/404/404.tsx';
import SignInPage from '../../pages/sign-in-page/sign-in-page.tsx';
import MyListPage from '../../pages/my-list/my-list-page.tsx';
import FilmPage from '../../pages/film-page/film-page.tsx';
import AddReviewPage from '../../pages/add-review-page/add-review-page.tsx';
import PlayerPage from '../../pages/player-page/player-page.tsx';
import {PrivateRoute} from '../private-route/private-route.tsx';
import {AppRoute} from '../../const.ts';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {useEffect} from 'react';
import {getAllFilms, getLoginData} from '../../store/thunk.ts';
import {Spinner} from '../spinner/spinner.tsx';

function App(): JSX.Element {
  const films = useAppSelector((state) => state.films);
  const isLoading = useAppSelector((state) => state.isFilmListLoading);
  const authStatus = useAppSelector((state) => state.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFilms());
    dispatch(getLoginData());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner/>;
  }

  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={
          <MainPage promoFilmGenre={'Drama'} promoFilmName={'The Grand Budapest Hotel'} promoFilmReleaseDate={new Date(2014, 0)}/>
        }
        />
        <Route path={AppRoute.SignIn} element={<SignInPage/>}/>
        <Route path={AppRoute.MyList} element={
          <PrivateRoute authorizationStatus={authStatus}>
            <MyListPage/>
          </PrivateRoute>
        }
        />
        <Route path={`${AppRoute.Films}/:id/`}>
          <Route index element={<FilmPage films={films}/>}/>
          <Route path={AppRoute.Reviews} element={<AddReviewPage />}/>
        </Route>
        <Route index path={`${AppRoute.Player}/:id/`} element={<PlayerPage />}/>
      </Route>
      <Route path="*" element={<Page404/>}/>
    </Routes>
  );
}

export default App;