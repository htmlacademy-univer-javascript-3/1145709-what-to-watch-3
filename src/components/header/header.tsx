import {Link, useNavigate} from 'react-router-dom';
import {Film} from '../../types/film';
import {useAppDispatch, useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {logout} from '../../store/thunks.ts';
import {PropsWithChildren} from 'react';
import {selectAuthData, selectIsAuthenticated} from '../../store/user/user-slice.selectors.ts';
import {AppRoute} from '../../types/enums.ts';

interface HeaderProps {
  showBreadcrumbs?: boolean;
  film?: Film;
  headerClassName?: string;
}

export const Header = (props: PropsWithChildren<HeaderProps>) => {
  const {showBreadcrumbs = false, film} = props;
  const isAuth = useAppSelector(selectIsAuthenticated);
  const authData = useAppSelector(selectAuthData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const headerClasses = props.headerClassName;

  return (
    <header className={`page-header ${headerClasses ?? ''}`}>
      <div className="logo">
        <Link to={AppRoute.Root} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
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

      {props.children}

      <ul className="user-block">
        {isAuth ?
          <>
            <li className="user-block__item">
              <Link to={AppRoute.MyList} data-testid='mylist'>
                <div className="user-block__avatar">
                  <img src={authData?.avatarUrl} alt={authData?.name} width="63" height="63"/>
                </div>
              </Link>
            </li>
            <li className="user-block__item">
              <div onClick={() => {
                dispatch(logout()).then(() => navigate(AppRoute.SignIn));
              }} className="user-block__link" data-testid='logout'
              >
                Sign out
              </div>
            </li>
          </>
          :
          <li className="user-block__item">
            <Link to={AppRoute.SignIn} className="user-block__link" data-testid='sign-in'>Sign in</Link>
          </li>}
      </ul>
    </header>
  );
};
