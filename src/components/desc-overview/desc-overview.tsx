import {Artist} from '../../types/artist';
import {CommonDescriptionProps} from '../../const';

export const DescOverview = (props: CommonDescriptionProps) => {
  const {film} = props;

  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.ratingScore}</div>
        <p className="film-rating__meta">
          <span className="film-rating__level">Very good</span>
          <span className="film-rating__count">240 ratings</span>
        </p>
      </div>
      <div className="film-card__text">
        <p>{film.info.text}</p>

        <p className="film-card__director"><strong>Director: {film.info.director}</strong></p>

        <p className="film-card__starring">
          <strong>Starring: {film.info.starring.map((artist: Artist) => artist.name).join(', ')}</strong>
        </p>
      </div>
    </>
  );
};
