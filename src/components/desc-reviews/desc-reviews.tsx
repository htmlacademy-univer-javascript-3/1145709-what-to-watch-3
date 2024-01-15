import {FilmComment} from '../../types/film-comment.ts';
import {useAppSelector} from '../../hooks/redux-typed-hooks.ts';
import {selectFilmComments} from '../../store/film/film-slice.selectors.ts';

function formatDate(date: Date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  } as const;
  return date.toLocaleDateString('en-US', options);
}
export const ReviewComponent = ({review}: { review: FilmComment }) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text" data-testid={'comment'}>{review.comment}</p>

      <footer className="review__details">
        <cite className="review__author" data-testid={'user'}>{review.user}</cite>
        <time className="review__date" dateTime="2016-12-24" data-testid={'date'}>{formatDate(new Date(review.date))}</time>
      </footer>
    </blockquote>

    <div className="review__rating" data-testid={'rating'}>{review.rating}</div>
  </div>
);

export const DescReviews = () => {
  const comments = useAppSelector(selectFilmComments);
  const orderedReviews = [...comments].sort((comment1, comment2) => comment2.rating - comment1.rating);
  const reviewsCount = comments.length;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col" data-testid={'col1'}>
        {orderedReviews.slice(0, reviewsCount / 2 + reviewsCount % 2).map((comment) =>
          <ReviewComponent key={comment.id} review={comment}/>
        )}
      </div>
      <div className="film-card__reviews-col" data-testid={'col2'}>
        {orderedReviews.slice(reviewsCount / 2 + reviewsCount % 2, reviewsCount).map((review) =>
          <ReviewComponent key={review.id} review={review}/>
        )}
      </div>
    </div>
  );
};
