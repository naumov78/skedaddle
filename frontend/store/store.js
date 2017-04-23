import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers/root_reducer';
import thunk from 'redux-thunk';

const middleware = [thunk];

// middleware.push(thunkMiddleware);

// if (process.env.NODE_ENV !== 'production') {
//   const createLogger = require('redux-logger');
//   middleware.push(createLogger());
// }

const configureStore = (preloadedState = {}) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middleware)
  );
};

export default configureStore;
