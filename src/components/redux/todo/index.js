/**
 * @flow
 */

import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import Root from './container/Root';
import todoReducer from './reducer/index';

const store = createStore(
  combineReducers({
    todos: todoReducer
  }),
  {},
  compose(
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
