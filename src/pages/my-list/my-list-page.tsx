import {FilmList} from '../../components/film-list/film-list';
import {Footer} from '../../components/footer/footer';
import {Header} from '../../components/header/header';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {useEffect} from 'react';
import {getFavoriteFilms} from '../../store/thunks.ts';
import {selectFavoriteFilms, selectFavoriteFilmsCount} from '../../store/user/user-slice.selectors.ts';

function MyListPage(): JSX.Element {
  const favoriteFilms = useAppSelector(selectFavoriteFilms);
  const favoriteFilmsCount = useAppSelector(selectFavoriteFilmsCount);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFavoriteFilms());
  }, [dispatch]);

  return (
    <div className="user-page">
      <Header headerClassName={'user-page__head'}>
        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilmsCount}</span></h1>
      </Header>
      <FilmList films={favoriteFilms} title={'Catalog'}/>
      <Footer/>
    </div>
  );
}

export default MyListPage;
