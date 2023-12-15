import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store} from '../store/store.ts';
import {StoreSchema} from '../types/state.ts';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;
