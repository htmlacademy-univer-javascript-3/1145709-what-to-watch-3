import {filterFilmsByGenre, setFilms, setIsFilmsLoading} from './action.ts';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {StoreSchema} from './reducer.ts';
import {AppDispatch} from '../hooks/redux-typed-hooks.ts';
import {AxiosInstance} from 'axios';
import {FilmShallow} from '../types/filmShallow.ts';

export enum APIRoute {
  Films = '/films',
}
export const getAllFilms = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: StoreSchema;
  extra: AxiosInstance;
}>('getFilms', async (_, {dispatch, extra: api}) => {

  const response = await api.get<FilmShallow[]>(APIRoute.Films);
  dispatch(setIsFilmsLoading(true));
  if (response.status === 200) {
    dispatch(setFilms(response.data));
    dispatch(filterFilmsByGenre());
  }
  dispatch(setIsFilmsLoading(false));
});
