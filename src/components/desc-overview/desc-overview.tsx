import {CommonDescriptionProps} from '../../const';
import {getDescriptionByRate} from '../utils/film-utils.ts';

export const DescOverview = (props: CommonDescriptionProps) => {
  const {film} = props;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score" data-testid={'rating'}>{film.rating}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getDescriptionByRate(film.rating)}</span>
          <span className="film-rating__count" data-testid={'rating-count'}>{film.scoresCount} ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p data-testid={'description'}>{film.description}</p>

        <p className="film-card__director" data-testid={'director'}><strong>Director: {film.director}</strong></p>

        <p className="film-card__starring" data-testid={'artist'}>
          <strong>Starring: {film.starring.map((artistName) => artistName).join(', ')}</strong>
        </p>
      </div>
    </>
  );
};
