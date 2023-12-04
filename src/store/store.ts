import {configureStore} from '@reduxjs/toolkit';
import {reducer} from './reducer.ts';
import {getAxiosObject} from '../api.ts';


export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: getAxiosObject()
      }
    })
});
