import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';

import { RootState } from './store';

export type AppThunk = ActionCreator<ThunkAction<void, RootState, null, Action<null>>>;
