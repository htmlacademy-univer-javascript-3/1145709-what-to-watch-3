import { MemoryHistory, createMemoryHistory } from 'history';
import HistoryRouter from '../components/history-route/history-route';

import { MockStore, configureMockStore } from '@jedmao/redux-mock-store';
import MockAdapter from 'axios-mock-adapter';
import { HelmetProvider } from 'react-helmet-async';


import thunk from 'redux-thunk';
import { Action } from 'redux';

import { Provider } from 'react-redux';
import {StoreSchema} from '../types/state.ts';
import {createAPI} from '../api/api.ts';
import {AppThunkDispatch} from './mocks.ts';
import {AuthorizationStatus, DefaultFilmGenre} from '../const.ts';

export function withHistory(component: JSX.Element, history?: MemoryHistory) {
  const memoryHistory = history ?? createMemoryHistory();

  return (
    <HistoryRouter history={memoryHistory}>
      <HelmetProvider>
        {component}
      </HelmetProvider>
    </HistoryRouter>
  );
}

type ComponentWithMockStore = {
  withStoreComponent: JSX.Element;
  mockStore: MockStore;
  mockAxiosAdapter: MockAdapter;
}

export function withStore(
  component: JSX.Element,
  initialState: Partial<StoreSchema> = {},
): ComponentWithMockStore {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StoreSchema, Action<string>, AppThunkDispatch>(middleware);
  const mockStore = mockStoreCreator(initialState);

  return ({
    withStoreComponent: <Provider store={mockStore}>{component}</Provider>,
    mockStore,
    mockAxiosAdapter,
  });
}

export const makeFakeStore = (initialState?: Partial<StoreSchema>): StoreSchema => ({
  user: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    authData: null,
    isAuthenticated: false,
    isAuthLoading: false,
    favoriteFilms: [],
    favoriteFilmsCount: null,
  },
  main: {
    promoFilm: null,
    films: [],
    genre: DefaultFilmGenre,
    isFilmListLoading: false,
  },
  film: {
    film: null,
    similarFilms: [],
    filmComments: [],
    isFilmLoading: false,
  },
  ...initialState ?? {},
});
