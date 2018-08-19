import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export const configureStore = (initialState = {}) => {
  let middleware = [
    applyMiddleware(thunk)
  ];

  if (process.env.CLIENT && process.env.NODE_ENV === 'development') {
    window.__REDUX_DEVTOOLS_EXTENSION__ && middleware.push(window.__REDUX_DEVTOOLS_EXTENSION__());
  }
  const store = createStore(
    rootReducer, 
    initialState,
    compose(...middleware)  
  );

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}