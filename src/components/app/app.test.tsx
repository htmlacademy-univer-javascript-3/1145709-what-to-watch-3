import {render, screen} from '@testing-library/react';
import {createMemoryHistory, MemoryHistory} from 'history';
import App from './app';

import {comments} from '../../mocks/comments';
import {makeFakeStore, withHistory, withStore} from '../../utils/mock-component.tsx';
import {AuthorizationStatus, DefaultFilmGenre} from '../../const.ts';
import {authData} from '../../mocks/auth-data.ts';
import {similarFilms} from '../../mocks/similar-films.ts';
import {film} from '../../mocks/film.ts';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render "Main" when user navigate to "/"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      main: {
        isFilmListLoading: false,
        films: [],
        promoFilm: film,
        genre: DefaultFilmGenre,
      }
    }));
    mockHistory.push('/');

    render(withStoreComponent);

    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });

  it('should render "SignIn" when user navigate to "/login"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    mockHistory.push('/login');

    render(withStoreComponent);

    expect(screen.getAllByText('Sign in').length).toBe(2);
    expect(screen.getByText('Email address')).toBeInTheDocument();
    expect(screen.getByText('Password')).toBeInTheDocument();
  });

  it('should render "MyList" when user navigate to "/mylist"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        authData: authData,
        isAuthLoading: false,
        isAuthenticated: true,
        favoriteFilms: [],
        favoriteFilmsCount: null,
      }
    }));
    mockHistory.push('/mylist');

    render(withStoreComponent);

    expect(screen.getByText(/My list/i)).toBeInTheDocument();
    expect(screen.getByText(/Catalog/i)).toBeInTheDocument();
  });

  it('should render "Film" when user navigate to "/films/{id}"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      film: {
        film: film,
        similarFilms: [],
        filmComments: comments,
        isFilmLoading: false,
      }
    }));
    mockHistory.push(`/films/${film.id}`);

    render(withStoreComponent);

    expect(screen.getByText(film.name)).toBeInTheDocument();
    expect(screen.getByText(film.genre)).toBeInTheDocument();
    expect(screen.getByText(film.released)).toBeInTheDocument();
  });

  it('should render "AddReview" when user navigate to "/films/{id}/review"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      film: {
        film: film,
        similarFilms: similarFilms,
        filmComments: comments,
        isFilmLoading: false,
      },
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        authData: authData,
        isAuthLoading: false,
        isAuthenticated: true,
        favoriteFilms: [],
        favoriteFilmsCount: null,
      }
    }));
    mockHistory.push(`/films/${film.id}/review`);

    render(withStoreComponent);

    expect(screen.getByText('Add review')).toBeInTheDocument();
  });

  it('should render "Player" when user navigate to "/player/{id}"', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore({
      film: {
        film: film,
        similarFilms: similarFilms,
        filmComments: comments,
        isFilmLoading: false,
      }
    }));
    mockHistory.push(`/player/${film.id}`);

    render(withStoreComponent);

    expect(screen.getByTestId('player')).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {
    const withHistoryComponent = withHistory(<App/>, mockHistory);
    const {withStoreComponent} = withStore(withHistoryComponent, makeFakeStore());
    const unknownRoute = '/unknown-route';
    mockHistory.push(unknownRoute);

    render(withStoreComponent);

    expect(screen.getByText('404, page not found.')).toBeInTheDocument();
    expect(screen.getByText('Go back')).toBeInTheDocument();
  });
});
