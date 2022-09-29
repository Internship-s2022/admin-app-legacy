import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

import userReducer from './user/reducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const configureStore = () => {
  const enhacer = composeWithDevTools(applyMiddleware(thunk));
  return createStore(rootReducer, enhacer);
};

const store = configureStore();

export default store;
export type RootState = ReturnType<typeof rootReducer>;
