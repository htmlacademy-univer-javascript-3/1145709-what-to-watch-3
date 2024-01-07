import {createMemoryHistory, MemoryHistory} from 'history';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {render, screen} from '@testing-library/react';
import {authData} from '../../mocks/auth-data.ts';
import userEvent from '@testing-library/user-event';
import {extractActionsTypes} from '../../utils/mocks.ts';
import {postLoginData} from '../../store/thunks.ts';
import {LoginForm} from './login-form.tsx';
import {APIRoute, AppRoute, AuthorizationStatus} from '../../types/enums.ts';

describe('Component: Login Form', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render correctly with no auth', () => {
    const withHistoryComponent = withHistory(<LoginForm />, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({}));
    render(withStoreComponent);

    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
    expect(screen.queryByTestId('incorrect-message')).not.toBeInTheDocument();
  });

  it('should move page to main correctly with auth', () => {
    const withHistoryComponent = withHistory(<LoginForm />, mockHistory);
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

    expect(mockHistory.location.pathname).toEqual(AppRoute.Root);
  });

  it('should work correctly on 200 from server', async () => {
    const withHistoryComponent = withHistory(<LoginForm />, mockHistory);
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(withHistoryComponent, makeFakeStore({}));
    mockAxiosAdapter.onPost(APIRoute.Login).reply(200, authData);
    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId('email'),
      'lol@sobaka.com',
    );

    await userEvent.type(
      screen.getByTestId('password'),
      'qwe123',
    );

    await userEvent.click(
      screen.getByRole('button')
    );

    expect(extractActionsTypes(mockStore.getActions())).toEqual([
      postLoginData.pending.type,
      postLoginData.fulfilled.type,
    ]);

    expect(mockHistory.location.pathname).toEqual(AppRoute.Root);
  });


  it('should render correctly with auth', async () => {
    const withHistoryComponent = withHistory(<LoginForm />, mockHistory);
    const {withStoreComponent, mockStore, mockAxiosAdapter} = withStore(withHistoryComponent, makeFakeStore({}));
    mockAxiosAdapter.onPost(APIRoute.Login).reply(400);
    render(withStoreComponent);

    await userEvent.type(
      screen.getByTestId('email'),
      'lol@sobaka.com',
    );

    await userEvent.type(
      screen.getByTestId('password'),
      'qwe123',
    );

    await userEvent.click(
      screen.getByRole('button')
    );

    expect(extractActionsTypes(mockStore.getActions())).toEqual([
      postLoginData.pending.type,
      postLoginData.rejected.type,
    ]);

    expect(screen.getByTestId('incorrect-message')).toBeInTheDocument();
  });
});
