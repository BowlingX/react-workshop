/**
 * @flow
 */

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import type { Todo } from '../../../../jquery/model.js';

type Props = {
  /** the TODO item */
    todo: Todo,
  /** simulate Component */
    forceUpdate?: boolean,
  /** callback when the checkbox is clicked */
    onRemoveTodo: (todo: Todo) => (e: Event) => void,
  /** callback when the text changes */
    onInputChange: (todo: Todo) => (e: Event) => void
}

export default class SingleTodo extends Component {

  props: Props;

  state: Object;

  shouldComponentUpdate(nextProps: Props, nextState: Object) {
    if (nextProps.forceUpdate) {
      return true;
    }
    return shallowCompare(this, nextProps, nextState);
  }

  static randomColor() {
    // 16777215 == ffffff in decimal
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  render() {
    const { todo, onRemoveTodo, onInputChange } = this.props;
    return (
      <li style={{ display: "flex", alignItems: 'center' }}>
        <input tabIndex="-1" onChange={onRemoveTodo(todo)} type="checkbox" value={todo.done}/>
        {!todo.done && <input tabIndex="1" onChange={onInputChange(todo)} type="text" value={todo.name}/>}
        {todo.done && <span style={{ textDecoration: 'line-through' }}>{todo.name}</span>}
        <span style={{
          border: '1px solid black',
          backgroundColor: SingleTodo.randomColor(),
          marginLeft: '5px',
          display: 'block',
          width: '10px',
          height: '10px'
        }}
        />
      </li>
    );
  }
}
