import {render, screen} from '@testing-library/react';

import {expect} from 'vitest';
import {FilmList} from './film-list.tsx';
import {films} from '../../mocks/films.ts';
import {makeFakeStore, withStore} from '../../utils/mock-component.tsx';
import userEvent from '@testing-library/user-event';
import {DefaultMoreCounterValue} from '../../const.ts';
import {promoFilm} from '../../mocks/promo-film.ts';


vi.mock('../film-card/film-card', () => ({
  default: () => <div data-testid="film">film tabs with key</div>
}));

vi.mock('../genre-list/genre-list.tsx', () => ({
  GenreList: () => <div>genre list</div>
}));

describe('Component: FilmList', () => {
  it('should render correctly', () => {
    const {withStoreComponent} = withStore(<FilmList films={films} title={'my title'}/>, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getByText('my title')).toBeInTheDocument();
    expect(screen.queryByText('show genres')).not.toBeInTheDocument();
    expect(screen.queryByText('Show more')).toBeInTheDocument();
    expect(screen.getAllByTestId('film').length).toEqual(8);
  });

  it('should correctly handle click on show more button', async () => {
    const {withStoreComponent} = withStore(<FilmList films={films} title={'my title'}/>, makeFakeStore({}));
    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId('show-more-button')
    );

    expect(screen.getAllByTestId('film').length).toEqual(DefaultMoreCounterValue * 2);

    while(screen.queryByTestId('show-more-button')) {
      await userEvent.click(
        screen.getByTestId('show-more-button')
      );
    }

    expect(screen.getAllByTestId('film').length).toEqual(films.length);
  });

  it('should correctly show genres', () => {
    const {withStoreComponent} = withStore(<FilmList films={films} title={'my title'} showGenres={false}/>, makeFakeStore({}));
    render(withStoreComponent);
    expect(screen.queryByText('show genres')).not.toBeInTheDocument();
  });

  it('should correctly show more', () => {
    const {withStoreComponent} = withStore(<FilmList films={films} title={'my title'} showMore={false}/>, makeFakeStore({}));
    render(withStoreComponent);
    expect(screen.queryByText('show more')).not.toBeInTheDocument();
  });

  it('should correctly filter by genre', () => {
    const selectedGenre = 'Drama';
    const {withStoreComponent} = withStore(<FilmList films={films} title={'my title'} />, makeFakeStore({
      main: {
        promoFilm: promoFilm,
        films: films,
        isFilmListLoading: false,
        genre: selectedGenre
      }
    }));
    render(withStoreComponent);

    expect(screen.getAllByTestId('film').length).toEqual(films.filter((film) => film.genre === selectedGenre).length);
  });
});
