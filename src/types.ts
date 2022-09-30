import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { RootState } from './redux/store';

export type AppDispatch<T> = ThunkDispatch<RootState, T, AnyAction>;
