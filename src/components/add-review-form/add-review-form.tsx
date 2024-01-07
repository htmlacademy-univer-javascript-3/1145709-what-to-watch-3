import {FormEvent, useEffect, useState} from 'react';
import {postComment} from '../../store/thunks.ts';
import {useAppDispatch} from '../../hooks/redux-typed-hooks.ts';
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import React from 'react';
import {AppRoute} from '../../types/enums.ts';


function AddReviewForm(): JSX.Element {
  const [commentText, setCommentText] = useState('');
  const [commentScore, setCommentScore] = useState<number | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);
  const dispatch = useAppDispatch();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsValid(commentScore !== undefined && commentText.length >= 50 && commentText.length <= 400);
  }, [commentScore, commentText]);

  if (id === undefined) {
    return <Navigate to={AppRoute.NotFound}/>;
  }
  const submitAction = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    dispatch(postComment({
      id: id,
      form: {
        rating: commentScore ?? 10,
        comment: commentText,
      }
    })).then((value) => {
      if (!('error' in value)) {
        navigate(`${AppRoute.Films}/${id}?tab=reviews`);
      }
    });
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form" onSubmit={submitAction}>
        <div className="rating">
          <div className="rating__stars">
            {Array.from(Array(10).keys()).map((rate) =>
              (
                <React.Fragment key={rate}>
                  <input className="rating__input" id={`star-${rate}`} type="radio" name="rating" value={rate} data-testid={`rate-${rate}`}
                    onChange={() => setCommentScore(10 - rate)}
                  />
                  <label className="rating__label" htmlFor={`star-${rate}`}>Rating {rate}</label>
                </React.Fragment>
              )
            )}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text"
            data-testid="review-text"
            onChange={(event) => setCommentText(event.target.value)} value={commentText}
          />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit" disabled={!isValid}>Post</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddReviewForm;
