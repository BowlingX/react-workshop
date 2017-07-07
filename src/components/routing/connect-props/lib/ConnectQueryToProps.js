/**
 * @flow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shallowEqual from 'fbjs/lib/shallowEqual';

const connectQueryToProps = (namespace: string, options: Object) => (InnerComponent: ReactClass<any> | Function) => {
  return class extends Component {

    static contextTypes = {
      queryManager: PropTypes.object
    };

    state: Object;

    context: Object;

    componentWillMount() {
      const state = this.context.queryManager.register(namespace, options, this.props);
      this.setState(state)
    }

    shouldComponentUpdate(nextProps: Object, nextState: Object) {
      return !shallowEqual(this.state, nextState);
    }

    componentDidUpdate() {
      if (this.context.queryManager.isTransitioning()) {
        return;
      }
      this.context.queryManager.pushChanges(namespace, this.props);
    }

    componentWillReceiveProps(props) {
      this.setState(props);
    }

    componentWillUnmount() {
      if (this.context.queryManager) {
        this.context.queryManager.unregister(namespace);
      }
    }

    render() {
      return <InnerComponent {...this.state}/>
    }
  }
};

export default connectQueryToProps;
