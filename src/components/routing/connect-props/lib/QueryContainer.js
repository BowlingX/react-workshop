/**
 *@flow
 */

import React, { Component, Children } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import createCachedSelector from 're-reselect';
import shallowEqual from 'fbjs/lib/shallowEqual';

type QueryContainerProps = {
  history: Object,
  children: Children
}

export default class QueryContainer extends Component {
  listener: ?Function;

  components: Object = {};

  initialParsedQuery: () => Object;

  isTransitioning: boolean = false;

  props:QueryContainerProps;

  constructor(props: QueryContainerProps) {
    super(props);
    const searchSelector = () => props.history.location.search;
    this.initialParsedQuery =
    createSelector(searchSelector, search => queryString.parse(search));
  }

  componentDidMount() {
    const { history } = this.props;
    history.replace(global.location, { componentState: this.currentComponentState(), isInitial: true });
    this.listener = history.listen((location, action) => {
      if (action !== 'POP' || !(location.state && location.state.componentState)) {
        return;
      }
      this.isTransitioning = true;
      Object.keys(location.state.componentState).forEach((key) => {
        if (this.components[key]) {
          Object.keys(location.state.componentState[key]).forEach((propKey) => {
            const oldValue = location.state.componentState[key][propKey];
            if (oldValue === undefined || (!shallowEqual(oldValue, this.components[key].state[propKey]))) {
              this.components[key].options[propKey].fromHistory(
                oldValue, this.components[key].props);
              // mutate current state with old value,
              // this way we can only call fromHistory where required
              this.components[key].state[propKey] = oldValue;
            }
          });
        }
      });
      this.isTransitioning = false;
    });
  }

  static childContextTypes = {
    queryManager: PropTypes.object
  };

  currentComponentState() {
    return Object.keys(this.components).reduce((initial, key) => ({
      ...initial,
      [key]: this.components[key].state
    }), {});
  }

  calculateQueryString() {
    return Object.keys(this.components).map((key) => {
      return queryString.stringify(this.components[key].serialized);
    }).join('&');
  }

  getChildContext() {
    return {
      queryManager: {
        pushChanges: (namespace: string, props: Object) => {
          const options = this.components[namespace].options;
          const optionsSelector = this.components[namespace].optionsSelector;
          const next = Object.keys(options).reduce((initial, key) => {
            const value = props[key];
            if (value !== undefined) {
              const nextValue = optionsSelector({ key, value }, key);
              return {
                state: { ...initial.state, [key]: value },
                serialized: {
                  ...initial.serialized,
                  ...nextValue
                }
              };
            }
            return initial;
          }, {
            state: {},
            serialized: {}
          });
          this.components[namespace] = { ...this.components[namespace], ...next };
          this.props.history.push(
            { pathname: location.pathname, search: this.calculateQueryString() },
            { componentState: this.currentComponentState() }
          );
        },
        register: (namespace: string, options: Object, props: Object) => {
          if (this.components[namespace]) {
            throw new Error(`connectQueryToProps: Namespace '${namespace}' already registered.`);
          }
          const keySelector = state => state.key;
          const valueSelector = state => state.value;
          const optionsSelector = createCachedSelector(keySelector, valueSelector, (key, value) => {
            return !(options[key].skip && options[key].skip(value)) ? {
              [`${namespace}.${key}`]: options[key].toQueryString(value)
            } : {};
          })((state, key) => key);
          const initialState = {};
          const serialized = {};
          const state = Object.keys(options).reduce((initial, key) => {
            const initialQueryValue = this.initialParsedQuery()[`${namespace}.${key}`];
            if (props[key] !== undefined) {
              initialState[key] = props[key];
            }
            if (initialQueryValue !== undefined) {
              const value = options[key].fromQueryString(initialQueryValue, props);
              initialState[key] = value;
              serialized[`${namespace}.${key}`] = initialQueryValue;
              return { ...initial, [key]: value };
            }
            return initial;
          }, props);

          this.components[namespace] = { options, props, optionsSelector, state: initialState, serialized };
          return state;
        },
        unregister: (namespace:string) => {
          this.components[namespace].optionsSelector.clearCache();
          delete this.components[namespace];
        },
        isTransitioning: () => this.isTransitioning
      }
    };
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener();
    }
    this.components = {};
    this.isTransitioning = false;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}
