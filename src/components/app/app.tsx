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
import {getAllFilms, getFavoriteFilms, getLoginData, getPromoFilm} from '../../store/thunks.ts';
import {LoadingMessage} from '../loading-messsage/loading-message.tsx';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {getToken} from '../../api/utils.ts';

function App(): JSX.Element {
  const isLoading = useAppSelector((state) => state.main.isFilmListLoading);
  const isAuthLoading = useAppSelector((state) => state.user.isAuthLoading);
  const isAuthenticated = useAppSelector((state) => state.user.isAuthenticated);
  const authStatus = useAppSelector((state) => state.user.authorizationStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllFilms());
    dispatch(getPromoFilm());
    if (getToken()) {
      dispatch(getLoginData());
    }
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getFavoriteFilms());
    }
    dispatch(getPromoFilm());
  }, [dispatch, isAuthenticated]);

  if (isLoading || isAuthLoading) {
    return <LoadingMessage/>;
  }

  return (
    <>
      <ToastContainer/>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={
            <MainPage/>
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
            <Route index element={<FilmPage/>}/>
            <Route path={AppRoute.Review} element={
              <PrivateRoute authorizationStatus={authStatus}>
                <AddReviewPage />
              </PrivateRoute>
            }
            />
          </Route>
          <Route index path={`${AppRoute.Player}/:id/`} element={<PlayerPage />}/>
        </Route>
        <Route path="*" element={<Page404/>}/>
      </Routes>
    </>
  );
}

export default App;
