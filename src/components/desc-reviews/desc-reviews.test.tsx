import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';

import {film} from '../../mocks/film.ts';
import {makeFakeStore, withStore} from '../../utils/mock-component.tsx';
import {DescReviews, ReviewComponent} from './desc-reviews.tsx';
import {similarFilms} from '../../mocks/similar-films.ts';
import {comments} from '../../mocks/comments.ts';

describe('Component: DescOverview', () => {
  it('should render correct', () => {
    const {withStoreComponent} = withStore(<DescReviews/>, makeFakeStore({
      film: {
        film: film,
        similarFilms: similarFilms,
        filmComments: comments,
        isFilmLoading: false,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('col1').children.length + screen.getByTestId('col2').children.length).toEqual(comments.length);
  });
});

describe('Component: ReviewComponent', () => {
  it('should render correct', () => {
    const review = comments[0];

    render(<ReviewComponent review={review}/>);

    expect(screen.getByTestId('comment')).toHaveTextContent(review.comment);
    expect(screen.getByTestId('date')).toBeInTheDocument();
    expect(screen.getByTestId('rating')).toHaveTextContent(review.rating.toString());
    expect(screen.getByTestId('user')).toHaveTextContent(review.user);
  });
});
