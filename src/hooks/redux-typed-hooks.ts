import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {StoreSchema} from '../store/reducer.ts';

export const useAppSelector: TypedUseSelectorHook<StoreSchema> = useSelector;
