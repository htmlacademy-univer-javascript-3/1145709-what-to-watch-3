import {Film} from '../../types/film';
import {HTMLAttributes} from 'react';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';

interface ArticleProps extends HTMLAttributes<HTMLDivElement> {
  film: Film;
}


function FilmCard(props: ArticleProps): JSX.Element {
  const {film, ...restProps } = props;

  return (
    <article className="small-film-card catalog__films-card" {...restProps}>
      <div className="small-film-card__image">
        <img src={film.imageSrc}
          alt={film.title} width="280" height="175"
        />
      </div>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${film.id}`}>{film.title}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
