import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';
import {DescDetails} from './desc-details.tsx';
import {film} from '../../mocks/film.ts';

describe('Component: DescDetails', () => {
  it('should render correct', () => {
    render(
      <DescDetails
        film={film}
      />
    );

    film.starring.forEach((artist) => expect(screen.getByText(artist)).toBeInTheDocument());
    expect(screen.getByTestId('run-time')).toBeInTheDocument();
    expect(screen.getByText(film.released.toString())).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.director)).toBeInTheDocument();
  });
});
