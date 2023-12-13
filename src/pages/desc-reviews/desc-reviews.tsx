import {FilmComment} from '../../types/film-comment.ts';
import {useAppSelector} from '../../hooks/redux-typed-hooks.ts';

const ReviewComponent = ({review}: { review: FilmComment }) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.comment}</p>

      <footer className="review__details">
        <cite className="review__author">{review.user}</cite>
        <time className="review__date" dateTime="2016-12-24">{new Date(review.date).toDateString()}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);

export const DescReviews = () => {
  const comments = useAppSelector((state) => state.filmComments);
  const orderedReviews = [...comments].sort((comment1, comment2) => comment2.rating - comment1.rating);
  const reviewsCount = comments.length;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {orderedReviews.slice(0, reviewsCount / 2 + reviewsCount % 2).map((comment) =>
          <ReviewComponent key={comment.id} review={comment}/>
        )}
      </div>
      <div className="film-card__reviews-col">
        {orderedReviews.slice(reviewsCount / 2 + reviewsCount % 2, reviewsCount).map((review) =>
          <ReviewComponent key={review.id} review={review}/>
        )}
      </div>
    </div>
  );
};
