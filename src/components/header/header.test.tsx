import {createMemoryHistory, MemoryHistory} from 'history';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {Header} from './header.tsx';
import {film} from '../../mocks/film.ts';
import {authData} from '../../mocks/auth-data.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../utils/mocks.ts';
import {logout} from '../../store/thunks.ts';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../types/enums.ts';

describe('Component: Header', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly with no auth', () => {
    const withHistoryComponent = withHistory(<Header film={film}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getByText('Sign in')).toBeInTheDocument();
  });

  it('should move page to login correctly with no auth', async () => {
    const withHistoryComponent = withHistory(<Header film={film}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId('sign-in')
    );

    expect(mockHistory.location.pathname).toEqual(AppRoute.SignIn);
  });

  it('should render correctly with auth', () => {
    const withHistoryComponent = withHistory(<Header film={film}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authData: authData,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        isAuthLoading: false,
        favoriteFilms: [],
        favoriteFilmsCount: null,
      }
    }));
    render(withStoreComponent);

    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should logout correctly with auth',async () => {
    const withHistoryComponent = withHistory(<Header film={film}/>, mockHistory);
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authData: authData,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        isAuthLoading: false,
        favoriteFilms: [],
        favoriteFilmsCount: null,
      }
    }));
    mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId('logout')
    );

    const actions = mockStore.getActions();
    expect(extractActionsTypes(actions)).toEqual([
      logout.pending.type,
      logout.fulfilled.type,
    ]);

    expect(mockHistory.location.pathname).toEqual(AppRoute.SignIn);
  });

  it('should go to mylist correctly with auth',async () => {
    const withHistoryComponent = withHistory(<Header film={film}/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authData: authData,
        authorizationStatus: AuthorizationStatus.Auth,
        isAuthenticated: true,
        isAuthLoading: false,
        favoriteFilms: [],
        favoriteFilmsCount: null,
      }
    }));
    render(withStoreComponent);

    await userEvent.click(
      screen.getByTestId('mylist')
    );

    expect(mockHistory.location.pathname).toEqual(AppRoute.MyList);
  });
});
