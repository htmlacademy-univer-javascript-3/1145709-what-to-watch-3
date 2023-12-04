import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {Film} from '../../types/film';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {clearAuthData} from '../../store/action.ts';

interface HeaderProps {
  showBreadcrumbs?: boolean;
  film?: Film;
}

export const Header = (props: HeaderProps) => {
  const {showBreadcrumbs = false, film} = props;
  const isAuth = useAppSelector((state) => state.isAuthenticated);
  const authData = useAppSelector((state) => state.authData);
  const dispatch = useAppDispatch();

  return (
    <header className="page-header">
      <div className="logo">
        <a href={AppRoute.Root} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </a>
      </div>

      {showBreadcrumbs && film &&
        <nav className="breadcrumbs">
          <ul className="breadcrumbs__list">
            <li className="breadcrumbs__item">
              <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.name}</Link>
            </li>
            <li className="breadcrumbs__item">
              <a className="breadcrumbs__link">Add review</a>
            </li>
          </ul>
        </nav>}

      <ul className="user-block">
        {isAuth ?
          <>
            <li className="user-block__item">
              <div className="user-block__avatar">
                <img src={authData?.avatarUrl} alt={authData?.name} width="63" height="63"/>
              </div>
            </li>
            <li className="user-block__item">
              <Link to={AppRoute.SignIn} onClick={() => {
                dispatch(clearAuthData());
                localStorage.removeItem('token');
              }} className="user-block__link"
              >
                Sign out
              </Link>
            </li>
          </>
          :
          <li className="user-block__item">
            <Link to={AppRoute.SignIn} className="user-block__link">Sign in</Link>
          </li>}
      </ul>
    </header>
  );
};
