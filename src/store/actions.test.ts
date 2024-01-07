import {configureMockStore} from '@jedmao/redux-mock-store';

import MockAdapter from 'axios-mock-adapter';
import thunk from 'redux-thunk';
import {Action} from 'redux';
import {AppThunkDispatch, extractActionsTypes} from '../utils/mocks';

import {StoreSchema} from '../types/state.ts';
import {
  changeFavoriteFilms,
  getAllFilms,
  getComments,
  getFavoriteFilms,
  getFilmById,
  getLoginData,
  getPromoFilm,
  getSimilarFilms, logout, postLoginData
} from './thunks.ts';
import {createAPI} from '../api/api.ts';
import {authData} from '../mocks/auth-data.ts';
import * as TokenStorage from '../api/utils.ts';
import {describe, expect} from 'vitest';
import {films} from '../mocks/films.ts';
import {promoFilm} from '../mocks/promo-film.ts';
import {film} from '../mocks/film.ts';
import {similarFilms} from '../mocks/similar-films.ts';
import {comments} from '../mocks/comments.ts';
import {APIRoute} from '../types/enums.ts';

describe('Async actions', () => {
  const axios = createAPI();
  const mockAxiosAdapter = new MockAdapter(axios);
  const middleware = [thunk.withExtraArgument(axios)];
  const mockStoreCreator = configureMockStore<StoreSchema, Action<string>, AppThunkDispatch>(middleware);
  let store: ReturnType<typeof mockStoreCreator>;

  beforeEach(() => {
    store = mockStoreCreator({});
  });

  describe('getLoginData', () => {
    it('should dispatch "getLoginData.pending" and "getLoginData.fulfilled" with thunk "getLoginData', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(200, authData);
      const mockSaveToken = vi.spyOn(TokenStorage, 'setToken');

      await store.dispatch(getLoginData());
      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginGetActionFulfilled = emittedActions.at(1) as ReturnType<typeof getLoginData.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getLoginData.pending.type,
        getLoginData.fulfilled.type,
      ]);

      expect(loginGetActionFulfilled.payload)
        .toEqual(authData);

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(authData.token);
    });

    it('should dispatch "getLoginData.pending" and "getLoginData.rejected" when server response 400', async () => {
      mockAxiosAdapter.onGet(APIRoute.Login).reply(400);

      await store.dispatch(getLoginData());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getLoginData.pending.type,
        getLoginData.rejected.type,
      ]);
    });
  });

  describe('getAllFilms', () => {
    it('should dispatch "getAllFilms.pending", "getAllFilms.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(200, films);

      await store.dispatch(getAllFilms());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getAllFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getAllFilms.pending.type,
        getAllFilms.fulfilled.type,
      ]);

      expect(fetchFilmsActionFulfilled.payload)
        .toEqual(films);
    });

    it('should dispatch "getAllFilms.pending", "getAllFilms.rejected" when server response 500', async () => {
      mockAxiosAdapter.onGet(APIRoute.Films).reply(500, null);

      await store.dispatch(getAllFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getAllFilms.pending.type,
        getAllFilms.rejected.type,
      ]);
    });
  });

  describe('getPromoFilm', () => {
    it('should dispatch "getPromoFilm.pending", "getPromoFilm.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(200, promoFilm);

      await store.dispatch(getPromoFilm());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchPromoActionFulfilled = emittedActions.at(1) as ReturnType<typeof getPromoFilm.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getPromoFilm.pending.type,
        getPromoFilm.fulfilled.type,
      ]);

      expect(fetchPromoActionFulfilled.payload)
        .toEqual(promoFilm);
    });

    it('should dispatch "getPromoFilm.pending", "getPromoFilm.rejected" when server response 500', async () => {
      mockAxiosAdapter.onGet(APIRoute.Promo).reply(500, null);

      await store.dispatch(getPromoFilm());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getPromoFilm.pending.type,
        getPromoFilm.rejected.type,
      ]);
    });
  });

  describe('getFilmById', () => {
    const id = '0';
    it('should dispatch "getFilmById.pending", "getFilmById.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(200, film);

      await store.dispatch(getFilmById(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFilmActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFilmById.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFilmById.pending.type,
        getFilmById.fulfilled.type,
      ]);

      expect(fetchFilmActionFulfilled.payload)
        .toEqual(film);
    });

    it('should dispatch "getFilmById.pending", "getFilmById.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}`).reply(404, null);

      await store.dispatch(getFilmById(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFilmById.pending.type,
        getFilmById.rejected.type,
      ]);
    });
  });

  describe('getSimilarFilms', () => {
    const id = '0';
    it('should dispatch "getSimilarFilms.pending", "getSimilarFilms.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}${APIRoute.FilmsSimilar}`).reply(200, similarFilms);

      await store.dispatch(getSimilarFilms(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchSimilarActionFulfilled = emittedActions.at(1) as ReturnType<typeof getSimilarFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getSimilarFilms.pending.type,
        getSimilarFilms.fulfilled.type,
      ]);

      expect(fetchSimilarActionFulfilled.payload)
        .toEqual(similarFilms);
    });

    it('should dispatch "getSimilarFilms.pending", "getSimilarFilms.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Films}/${id}${APIRoute.FilmsSimilar}`).reply(404, null);

      await store.dispatch(getSimilarFilms(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getSimilarFilms.pending.type,
        getSimilarFilms.rejected.type,
      ]);
    });
  });

  describe('getComments', () => {
    const id = '0';
    it('should dispatch "getComments.pending", "getComments.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(200, comments);

      await store.dispatch(getComments(id));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchCommentsActionFulfilled = emittedActions.at(1) as ReturnType<typeof getComments.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getComments.pending.type,
        getComments.fulfilled.type,
      ]);

      expect(fetchCommentsActionFulfilled.payload)
        .toEqual(comments);
    });

    it('should dispatch "fetchComments.pending", "fetchComments.rejected" when server response 404', async () => {
      mockAxiosAdapter.onGet(`${APIRoute.Comments}/${id}`).reply(404, null);

      await store.dispatch(getComments(id));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getComments.pending.type,
        getComments.rejected.type,
      ]);
    });
  });

  describe('getFavoriteFilms', () => {
    it('should dispatch "fetchFavorite.pending", "fetchFavorite.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(200, getFavoriteFilms);

      await store.dispatch(getFavoriteFilms());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const fetchFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof getFavoriteFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        getFavoriteFilms.pending.type,
        getFavoriteFilms.fulfilled.type,
      ]);

      expect(fetchFavoriteActionFulfilled.payload)
        .toEqual(getFavoriteFilms);
    });

    it('should dispatch "getFavoriteFilms.pending", "getFavoriteFilms.rejected" when server response 401', async () => {
      mockAxiosAdapter.onGet(APIRoute.Favorite).reply(401, null);

      await store.dispatch(getFavoriteFilms());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        getFavoriteFilms.pending.type,
        getFavoriteFilms.rejected.type,
      ]);
    });
  });

  describe('changeFavorite', () => {
    const filmId = '0';
    const s = 1;
    it('should dispatch "changeFavorite.pending", "changeFavorite.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${filmId}/${s}`).reply(200, {...film, isFavorite: true});

      await store.dispatch(changeFavoriteFilms({filmId: filmId, status: s}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const changeFavoriteActionFulfilled = emittedActions.at(1) as ReturnType<typeof changeFavoriteFilms.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        changeFavoriteFilms.pending.type,
        changeFavoriteFilms.fulfilled.type,
      ]);

      expect(changeFavoriteActionFulfilled.payload)
        .toEqual({...film, isFavorite: true});
    });

    it('should dispatch "changeFavorite.pending", "changeFavorite.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost(`${APIRoute.Favorite}/${filmId}/${s}`).reply(400, null);

      await store.dispatch(changeFavoriteFilms({filmId: filmId, status: s}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        changeFavoriteFilms.pending.type,
        changeFavoriteFilms.rejected.type,
      ]);
    });
  });

  describe('postLoginData', () => {
    it('should dispatch "postLoginData.pending", "postLoginData.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onPost(APIRoute.Login).reply(200, authData);

      await store.dispatch(postLoginData({email: 'example@post.com', password: 'aet123'}));

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);
      const loginGetActionFulfilled = emittedActions.at(1) as ReturnType<typeof postLoginData.fulfilled>;

      expect(extractedActionsTypes).toEqual([
        postLoginData.pending.type,
        postLoginData.fulfilled.type,
      ]);

      expect(loginGetActionFulfilled.payload)
        .toEqual(authData);
    });

    it('should dispatch "postLoginData.pending", "loginPost.rejected" when server response 400', async () => {
      mockAxiosAdapter.onPost('/login').reply(400, null);

      await store.dispatch(postLoginData({email: 'example@post.com', password: 'aet123'}));
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        postLoginData.pending.type,
        postLoginData.rejected.type,
      ]);
    });

    it('should call "setToken" once with the received token', async () => {
      mockAxiosAdapter.onPost('/login').reply(200, authData);
      const mockSaveToken = vi.spyOn(TokenStorage, 'setToken');

      await store.dispatch(postLoginData({email: 'a', password: 'a0'}));

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith(authData.token);
    });
  });

  describe('logout', () => {
    it('should dispatch "logout.pending", "logout.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
      const mockSaveToken = vi.spyOn(TokenStorage, 'setToken');

      await store.dispatch(logout());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        logout.pending.type,
        logout.fulfilled.type,
      ]);

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith('');
    });

    it('should dispatch "logout.pending", "logout.rejected" when server response 400', async () => {
      mockAxiosAdapter.onDelete('/logout').reply(400, null);

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        logout.rejected.type,
      ]);
    });
  });

  describe('counter logic', () => {
    it('should dispatch "logout.pending", "logout.fulfilled", when server response 200', async () => {
      mockAxiosAdapter.onDelete(APIRoute.Logout).reply(200);
      const mockSaveToken = vi.spyOn(TokenStorage, 'setToken');

      await store.dispatch(logout());

      const emittedActions = store.getActions();
      const extractedActionsTypes = extractActionsTypes(emittedActions);

      expect(extractedActionsTypes).toEqual([
        logout.pending.type,
        logout.fulfilled.type,
      ]);

      expect(mockSaveToken).toBeCalledTimes(1);
      expect(mockSaveToken).toBeCalledWith('');
    });

    it('should dispatch "logout.pending", "logout.rejected" when server response 400', async () => {
      mockAxiosAdapter.onDelete('/logout').reply(400, null);

      await store.dispatch(logout());
      const actions = extractActionsTypes(store.getActions());

      expect(actions).toEqual([
        logout.pending.type,
        logout.rejected.type,
      ]);
    });
  });
});
