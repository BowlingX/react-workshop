/**
 * @flow
 */

import React from 'react';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Root from './container/Root';
import todoReducer from './reduxConfig/index';
import customMiddleware from './reduxConfig/middleware';

const store = createStore(
  // reducers
  combineReducers({
    todos: todoReducer
  }),
  // initial state
  {
    todos: [
      { name: 'A redux TODO', done: false, id: 1 }
    ]
  },
  compose(
    // middleware
    applyMiddleware(customMiddleware),
    (typeof global.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? global.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

const TodoApplication = () => {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
};

export default TodoApplication;
