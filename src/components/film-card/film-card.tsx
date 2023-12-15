import {HTMLAttributes} from 'react';
import {AppRoute} from '../../const';
import {Link} from 'react-router-dom';
import VideoPlayer from '../video-player/video-player';
import {FilmShallow} from '../../types/film-shallow.ts';

interface ArticleProps extends HTMLAttributes<HTMLDivElement> {
  film: FilmShallow;
}


function FilmCard(props: ArticleProps): JSX.Element {
  const {film, ...restProps } = props;


  return (
    <article className="small-film-card catalog__films-card" {...restProps}>
      <VideoPlayer film={film}/>
      <h3 className="small-film-card__title">
        <Link className="small-film-card__link" to={`${AppRoute.Films}/${film.id}`}>{film.name}</Link>
      </h3>
    </article>
  );
}

export default FilmCard;
