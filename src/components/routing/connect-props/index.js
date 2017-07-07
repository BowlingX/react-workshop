/**
 * @flow
 */

import React, { Component, Children } from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { Provider, connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import connectQueryToProps from './lib/ConnectQueryToProps';
import QueryContainer from './lib/QueryContainer';

const history = createHistory();

const store = createStore(
  combineReducers({
    form: formReducer,
    checked: (state = false, action) => {
      switch (action.type) {
        case 'SET_CHECKED':
          return action.value;
      }
      return state;
    }
  }),
  {},
  compose(
    (typeof global.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? global.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

type Props = {
  checked: boolean,
  onChange: () => void
};
// $FlowFixMe: ignore
let SimpleComponent = (props: Props) => {
  return (
    <div>
      <p>Please check</p>
      <input type="checkbox" onChange={props.onChange} checked={props.checked}/>
    </div>
  );
};

SimpleComponent = connectQueryToProps('s', {
  checked: {
    toQueryString: (value: boolean) => value ? 1 : 0,
    fromQueryString: (value: any, props) => {
      const nextValue = value === '1';
      props.change(nextValue);
      return nextValue;
    },
    fromHistory: (value: boolean, props) => {
      props.change(value);
    }
  }
})(SimpleComponent);

const stateToProps = (state) => ({
  checked: state.checked
});

const dispatchToProps = (dispatch) => ({
  change: (value: boolean) => {
    dispatch({ type: 'SET_CHECKED', value });
  },
  onChange: (e: Event) => {
    // $FlowFixMe: ignore
    dispatch({ type: 'SET_CHECKED', value: e.target.checked });
  }
});

SimpleComponent = connect(stateToProps, dispatchToProps)(SimpleComponent);

const ConnectProps = () => {
  return (
    <Provider store={store}>
      <QueryContainer history={history}>
        <SimpleComponent/>
      </QueryContainer>
    </Provider>
  );
};

export default ConnectProps;