import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import {Film} from '../../types/film';

interface HeaderProps {
  showBreadcrumbs?: boolean;
  film?: Film;
}

export const Header = (props: HeaderProps) => {
  const {showBreadcrumbs = false, film} = props;

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
            <Link to={`${AppRoute.Films}/${film.id}`} className="breadcrumbs__link">{film.title}</Link>
          </li>
          <li className="breadcrumbs__item">
            <a className="breadcrumbs__link">Add review</a>
          </li>
        </ul>
      </nav>}

      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
          </div>
        </li>
        <li className="user-block__item">
          <a className="user-block__link">Sign out</a>
        </li>
      </ul>
    </header>
  );
};
