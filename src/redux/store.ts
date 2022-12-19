import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { composeWithDevTools } from '@redux-devtools/extension';

import authReducer from './auth/reducer';
import clientReducer from './client/reducer';
import employeeReducer from './employee/reducer';
import memberReducer from './member/reducer';
import notificationReducer from './notifications/reducer';
import projectReducer from './project/reducer';
import uiReducer from './ui/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  project: projectReducer,
  client: clientReducer,
  ui: uiReducer,
  auth: authReducer,
  member: memberReducer,
  notification: notificationReducer,
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
