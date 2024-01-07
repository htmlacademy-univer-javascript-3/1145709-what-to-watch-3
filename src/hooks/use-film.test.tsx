import {describe, expect} from 'vitest';
import {renderHook, waitFor} from '@testing-library/react';
import {useFilm} from './use-film';

import {film} from '../mocks/film.ts';
import {makeFakeStore} from '../utils/mock-component.tsx';
import {Provider} from 'react-redux';
import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {StoreSchema} from '../types/state.ts';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes} from '../utils/mocks.ts';
import {PropsWithChildren} from 'react';
import {createAPI} from '../api/api.ts';
import HistoryRouter from '../components/history-route/history-route.tsx';
import {createMemoryHistory, MemoryHistory} from 'history';
import {getFilmById} from '../store/thunks.ts';
import {Route, Routes} from 'react-router-dom';
import {APIRoute, AppRoute} from '../types/enums.ts';


describe('Hook: useFilm', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should return film and isLoading',async () => {
    const axios = createAPI();
    const mockAxiosAdapter = new MockAdapter(axios);
    const middleware = [thunk.withExtraArgument(axios)];
    const mockStoreCreator = configureMockStore<StoreSchema, Action<string>, AppThunkDispatch>(middleware);
    const mockStore = mockStoreCreator(makeFakeStore());
    const wrapper = ({ children }: PropsWithChildren) => (
      <Provider store={mockStore}>
        <HistoryRouter history={mockHistory}>
          <Routes>
            <Route path={`${AppRoute.Films}/:id`} element={children}/>
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    mockHistory.push(`${AppRoute.Films}/${film.id}`);

    mockAxiosAdapter.onGet(`${APIRoute.Films}/${film.id}`).reply(200, film);

    renderHook(() => useFilm(), {wrapper});

    await waitFor(() => expect(extractActionsTypes(mockStore.getActions())).toEqual([
      getFilmById.pending.type,
      getFilmById.fulfilled.type,
    ]));
  });
});
