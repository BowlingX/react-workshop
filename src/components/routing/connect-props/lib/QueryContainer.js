/**
 *@flow
 */

import React, { Component, Children } from 'react';
import queryString from 'query-string';
import PropTypes from 'prop-types';

type QueryContainerProps = {
  history: Object,
  children: Children
}

export default class QueryContainer extends Component {

  listener: ?Function;

  components: Object = {};

  initialParsedQuery: Object;

  isTransitioning: boolean = false;

  constructor(props: QueryContainerProps) {
    super(props);
    this.initialParsedQuery = queryString.parse(global.location.search);
  }

  componentDidMount() {
    const { history } = this.props;
    history.replace(global.location, { componentState: this.currentComponentState(), isInitial: true });
    this.listener = history.listen((location, action) => {
      if (action !== 'POP' || !(location.state && location.state.componentState)) {
        return;
      }
      this.isTransitioning = true;
      Object.keys(location.state.componentState).map(key => {
        if (this.components[key]) {
          Object.keys(location.state.componentState[key]).map(propKey => {
            this.components[key].options[propKey].fromHistory(
              location.state.componentState[key][propKey], this.components[key].props);
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
    return Object.keys(this.components).map(key => {
      return queryString.stringify(this.components[key].serialized);
    }).join('&');
  }

  getChildContext() {
    return {
      queryManager: {
        pushChanges: (namespace: string, props: Object) => {
          const options = this.components[namespace].options;
          this.components[namespace] = Object.keys(options).reduce((initial, key) => {
            const value = props[key];
            if (value !== undefined) {
              return {
                props: initial.props,
                options: initial.options,
                state: { ...initial.state, [key]: value },
                serialized: (!options[key].skip || !options[key].skip(value)) ?
                  { ...initial.serialized, [`${namespace}.${key}`]: options[key].toQueryString(value) } : {}
              };
            }
            return initial;
          }, {
            props: this.components[namespace].props,
            options: this.components[namespace].options,
            state: {},
            serialized: {}
          });
          this.props.history.push(
            { pathname: location.pathname, search: this.calculateQueryString() },
            { componentState: this.currentComponentState() }
          );
        },
        register: (namespace: string, options: Object, props: Object) => {
          if (!this.components[namespace]) {
            this.components[namespace] = {};
          } else {
            throw new Error(`connectQueryToProps: Namespace '${namespace}' already registered.`);
          }
          const initialState = {};
          const state = Object.keys(options).reduce((initial, key) => {
            const initialQueryValue = this.initialParsedQuery[`${namespace}.${key}`];
            if (props[key] !== undefined) {
              initialState[key] = props[key];
            }
            if (initialQueryValue !== undefined) {
              const value = options[key].fromQueryString(initialQueryValue, props);
              initialState[key] = value;
              return { ...initial, [key]: value }
            }
            return initial;
          }, props);

          this.components[namespace] = { options, props, state: initialState };
          return state;
        },
        unregister: (namespace:string) => {
          delete this.components[namespace];
        },
        isTransitioning: () => this.isTransitioning
      }
    }
  }

  componentWillUnmount() {
    if (this.listener) {
      this.listener();
    }
    this.components = {};
    this.isTransitioning = false;
  }

  render() {
    return React.Children.only(this.props.children)
  }
}