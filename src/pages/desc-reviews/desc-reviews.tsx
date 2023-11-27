import {CommonDescriptionProps} from '../../const';
import {Review} from '../../types/review';

const ReviewComponent = ({review}: { review: Review }) => (
  <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{review.text}</p>

      <footer className="review__details">
        <cite className="review__author">{review.authorName}</cite>
        <time className="review__date" dateTime="2016-12-24">{new Date(review.created).toDateString()}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{review.rating}</div>
  </div>
);

export const DescReviews = (props: CommonDescriptionProps) => {
  const {film} = props;
  const reviews = [...film.reviews];
  const orderedReviews = reviews.sort((review1, review2) => review2.rating - review1.rating);
  const reviewsCount = reviews.length;

  return (
    <div className="film-card__reviews film-card__row">
      <div className="film-card__reviews-col">
        {orderedReviews.slice(0, reviewsCount / 2 + reviewsCount % 2).map((review) =>
          <ReviewComponent key={review.id} review={review}/>
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
