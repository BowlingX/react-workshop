/**
 * @flow
 */

import React from 'react';
import { createStore, combineReducers, compose } from 'redux';
import { reducer as formReducer, Field, reduxForm, getFormValues } from 'redux-form';
import { Provider, connect } from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import connectQueryToProps from './lib/ConnectQueryToProps';
import QueryContainer from './lib/QueryContainer';

const history = createHistory();

const store = createStore(
  combineReducers({
    form: formReducer
  }),
  {},
  compose(
    (typeof global.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined') ? global.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  )
);

type Props = {
  checked: boolean,
  onChange: () => void,
  handleSubmit: () => void
};
// $FlowFixMe: ignore
let SimpleComponent = (props: Props) => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <p>Please check</p>
      <Field name="checked" component="input" type="checkbox" />
      <Field name="text" component="input" type="text" />
      <button type="submit">Submit</button>
    </form>
  );
};

const parameter = name => ({
  // called during serialization
  toQueryString: (value: any) => {
    return JSON.stringify(value);
  },
  // called initially before render
  fromQueryString: (value: any, props) => {
    const nextValue = JSON.parse(value);
    props.change(name, nextValue);
    return nextValue;
  },
  // called if navigate and a certain state should be restored
  fromHistory: (value: boolean, props) => {
    props.change(name, value);
  }
});

SimpleComponent = connectQueryToProps('s', {
  [`p.checked`]: parameter('checked'),
  [`p.text`]: parameter('text')
})(SimpleComponent);

SimpleComponent = reduxForm({
  // a unique name for the form
  form: 'contact'
})(SimpleComponent);

SimpleComponent = connect((state) => {
  const formValues = getFormValues('contact')(state);
  return {
    [`p.checked`]: formValues ? formValues.checked || false : false,
    [`p.text`]: formValues ? formValues.text || '' : ''
  };
})(SimpleComponent);

const ConnectProps = () => {
  return (
    <Provider store={store}>
      <QueryContainer history={history}>
        <SimpleComponent />
      </QueryContainer>
    </Provider>
  );
};

export default ConnectProps;
