/**
 * @flow
 */

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import type { Todo } from '../../../../jquery/model.js';
import randomColor from '../../../../lib/color';

type Props = {
  /** the TODO item */
    todo: Todo,
  /** simulate always render on changes */
    forceUpdate?: boolean,
  /** callback when the checkbox is clicked */
    onRemoveTodo: (todo: Todo) => void,
  /** callback when the text changes */
    onInputChange: (todo: Todo, value:string) => void
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

  onChange = (e:Event) => {
    // $FlowFixMe: unkown
    this.props.onInputChange(this.props.todo, e.target.value);
  }

  onRemove = () => {
    this.props.onRemoveTodo(this.props.todo);
  }

  render() {
    const { todo, onRemoveTodo, onInputChange } = this.props;
    return (
      <li style={{ display: "flex", alignItems: 'center' }}>
      { /* important: do not create new function with bind for listeners, they will be recreated on each render*/ }
        <input tabIndex="-1" onChange={this.onRemove} type="checkbox" value={todo.done}/>
        {!todo.done && <input tabIndex="1" onChange={this.onChange} type="text" value={todo.name}/>}
        {todo.done && <span style={{ textDecoration: 'line-through' }}>{todo.name}</span>}
        <span style={{
          border: '1px solid black',
          backgroundColor: randomColor(),
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
