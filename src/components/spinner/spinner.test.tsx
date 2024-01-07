import {render, screen} from '@testing-library/react';
import {expect} from 'vitest';

import Spinner from './spinner';
import {makeFakeStore, withStore} from '../../utils/mock-component.tsx';
import {DefaultFilmGenre} from '../../const.ts';


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
        genre: DefaultFilmGenre,
        promoFilm: null,
        isFilmListLoading: true,
      }
    }));

    render(withStoreComponent);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });
});
