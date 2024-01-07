import {createMemoryHistory, MemoryHistory} from 'history';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {GenreList} from './genre-list.tsx';
import {films} from '../../mocks/films.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../utils/mocks.ts';
import {changeGenre} from '../../store/main/main-slice.ts';
import {DEFAULT_FILM_GENRE} from '../../const.ts';

describe('Component: FilmTabs', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<GenreList films={films}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getAllByTestId('genre-button').length - 1).toBe(new Set([...films.map((film) => film.genre)]).size);
  });

  it('should correctly handle genre change', async () => {
    const withHistoryComponent = withHistory(<GenreList films={films}/>, mockHistory);
    const {withStoreComponent, mockStore} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    const allGenreButtons = screen.getAllByTestId('genre-button');
    const secondGenreButton = allGenreButtons[1];

    await userEvent.click(
      secondGenreButton
    );

    expect(mockHistory.location.search.substring(1)).toEqual(`genre=${secondGenreButton.textContent ?? ''}`);

    const actions = mockStore.getActions();
    expect(extractActionsTypes(actions)).toEqual([
      changeGenre.type,
      changeGenre.type
    ]);
    expect((actions.at(0) as ReturnType<typeof changeGenre>).payload).toBe(DEFAULT_FILM_GENRE);
    expect((actions.at(1) as ReturnType<typeof changeGenre>).payload).toBe(secondGenreButton.textContent);
  });
});
