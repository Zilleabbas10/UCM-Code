// libs
import {createStore, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

// src
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  // loadState(),
  applyMiddleware(
    thunk,
    //TODO: ALWAYS DISABLE IN RELEASE MODE
    // createLogger({
    //   collapsed: true,
    // }),
  ),
);

// store.subscribe(throttle(() => saveState(store.getState()), 1000))
export default store;
