import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';

import Spinner from './spinner';
import {makeFakeStore, withStore} from '../../utils/mock-component.tsx';
import {DEFAULT_FILM_GENRE} from '../../const.ts';


describe('Component: Spinner', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<Spinner/>, makeFakeStore());

    render(withStoreComponent);

    expect(screen.queryByTestId('spinner')).not.toBeInTheDocument();
  });

  it('should render spinner correctly', () => {
    const {withStoreComponent} = withStore(<Spinner/>, makeFakeStore({
      main: {
        films: [],
        genre: DEFAULT_FILM_GENRE,
        promoFilm: null,
        isFilmListLoading: true,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
