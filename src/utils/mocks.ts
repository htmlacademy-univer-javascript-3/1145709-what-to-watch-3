import {ThunkDispatch} from '@reduxjs/toolkit';
import {StoreSchema} from '../types/state.ts';
import {createAPI} from '../api/api.ts';
import {Action} from 'redux';

export type AppThunkDispatch = ThunkDispatch<StoreSchema, ReturnType<typeof createAPI>, Action>;
export const extractActionsTypes = (actions: Action<string>[]) => actions.map(({ type }) => type);
