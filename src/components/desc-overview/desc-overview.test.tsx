import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';

import {film} from '../../mocks/film.ts';
import {DescOverview} from './desc-overview.tsx';

describe('Component: DescReviews', () => {
  it('should render correct', () => {
    render(
      <DescOverview
        film={film}
      />
    );

    expect(screen.getByTestId('rating')).toHaveTextContent(film.rating.toString());
    expect(screen.getByTestId('artist')).toBeInTheDocument();
    expect(screen.getByTestId('rating-count')).toHaveTextContent(film.scoresCount.toString());
    expect(screen.getByTestId('description')).toHaveTextContent(film.description);
    expect(screen.getByTestId('director')).toHaveTextContent(film.director);
  });
});
