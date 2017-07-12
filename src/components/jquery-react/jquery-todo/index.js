/**
 * @flow
 */

import React from 'react';
import $ from 'jquery';
import '../../../jquery/app';

type Props = {
  onSave: Function
}

/**
 * React-Component that renders our jQuery Widget
 */
export default class JQueryTodo extends React.Component {
  element: HTMLElement;

  props: Props;

  componentDidMount() {
    // $FlowFixMe: ignore
    const app = $(this.element).todo();
    app.bind('todosave', (event, model) => {
      this.props.onSave(model);
    });
  }

  componentWillUnmount() {
    // $FlowFixMe: ignore
    $(this.element).todo('destroy');
  }

  render() {
    return (
      <div ref={(element) => {
        this.element = element;
      }}
      />
    );
  }
}
