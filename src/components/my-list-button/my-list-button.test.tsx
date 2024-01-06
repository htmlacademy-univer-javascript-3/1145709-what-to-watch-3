import {createMemoryHistory, MemoryHistory} from 'history';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {APIRoute, AuthorizationStatus} from '../../const.ts';
import {authData} from '../../mocks/auth-data.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../utils/mocks.ts';
import {changeFavoriteFilms} from '../../store/thunks.ts';
import MyListButton from './my-list-button.tsx';
import {film} from '../../mocks/film.ts';
import {films} from '../../mocks/films.ts';
import {decrementFavoriteFilmsCount, incrementFavoriteFilmsCount} from '../../store/user/user-slice.ts';

describe('Component: MyListButton', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly', () => {
    const withHistoryComponent = withHistory(<MyListButton film={film}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getByText('My list')).toBeInTheDocument();
  });

  it('should render correctly with auth', () => {
    const withHistoryComponent = withHistory(<MyListButton film={{...film, isFavorite: false}} />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authData: authData,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        isAuthLoading: false,
        favoriteFilms: films,
        favoriteFilmsCount: films.length,
      }
    }));
    render(withStoreComponent);

    expect(screen.getByText(films.length.toString())).toBeInTheDocument();
    expect(screen.getByTestId('not-in-list')).toBeInTheDocument();
  });

  it('should render correctly with favorite', () => {
    const withHistoryComponent = withHistory(<MyListButton film={film} />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getByTestId('in-list')).toBeInTheDocument();
  });

  it('should send request and perform actions on click', async () => {
    const withHistoryComponent = withHistory(<MyListButton film={{...film, isFavorite: false}} />, mockHistory);
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authData: authData,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        isAuthLoading: false,
        favoriteFilms: films,
        favoriteFilmsCount: films.length,
      }
    }));
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${film.id}/1`).reply(200, film);
    mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${film.id}/0`).reply(200, film);
    render(withStoreComponent);

    await userEvent.click(
      screen.getByRole('button')
    );

    expect(screen.getByTestId('in-list')).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button')
    );

    expect(screen.getByTestId('not-in-list')).toBeInTheDocument();

    expect(extractActionsTypes(mockStore.getActions())).toEqual([
      changeFavoriteFilms.pending.type,
      changeFavoriteFilms.fulfilled.type,
      incrementFavoriteFilmsCount.type,
      changeFavoriteFilms.pending.type,
      changeFavoriteFilms.fulfilled.type,
      decrementFavoriteFilmsCount.type,
    ]);
  });
});
