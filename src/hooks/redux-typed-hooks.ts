import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {StoreSchema} from '../store/reducer.ts';
import {store} from '../store/store.ts';

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;
