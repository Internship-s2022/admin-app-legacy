import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import employeeReducer from './employee/reducer';
import userReducer from './user/reducer';

const rootReducer = combineReducers({
  user: userReducer,
  employee: employeeReducer,
});

const configureStore = () => {
  const enhancer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhancer);
};

const store = configureStore();

export default store;
export type RootState = ReturnType<typeof rootReducer>;
