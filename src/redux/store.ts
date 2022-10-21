import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import clientReducer from './client/reducer';
import employeeReducer from './employee/reducer';
import projectReducer from './project/reducer';
import uiReducer from './ui/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
  project: projectReducer,
  client: clientReducer,
  ui: uiReducer,
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
export type RootState = ReturnType<typeof rootReducer>;
