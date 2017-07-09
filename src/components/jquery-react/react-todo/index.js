/**
 * @flow
 */

import React, { Component } from 'react';
import Model from '../../../jquery/model.js';
import type { Todo } from '../../../jquery/model.js';

type State = {
  todos: Array<Todo>
};

type Props = {
  onSave?: (todos: Array<Todo>) => void
}

/**
 * All-In-One TODO Application component
 */
export default class ReactTodo extends Component {

  model: Model;

  props: Props;

  state: State = {
    todos: []
  };

  constructor(props: Object) {
    super(props);

    this.model = new Model();
    this.state = {
      todos: this.model.todos
    };
  }

  onRemoveTodo = (index: number) => (e: Event) => {
    this.setState({
      todos: this.model.remove(index)
    });
  };

  onInputChange = (index: number) => (e: Event) => {
    this.setState({
      // $FlowFixMe: value unknown
      todos: this.model.update(index, e.target.value)
    });
  };

  onAddTodo = (e: Event) => {
    const value = window.prompt('What do you want TODO?', '');
    if (value) {
      this.setState({
        todos: this.model.create(value)
      });
    }
  };

  removeAllDone = (e: Event) => {
    this.setState({
      todos: this.model.removeAllDone()
    });
  };

  onSave = (e: Event) => {
    if (this.props.onSave) {
      this.props.onSave(this.state.todos);
    }
  };

  renderTodo(todo: Todo, key: number) {
    return (
      <li key={todo.id}>
        {/* this here will create a new function on each render, better separate the component or use an identifier on the target*/}
        <input tabIndex="-1" onChange={this.onRemoveTodo(key)} type="checkbox" value={todo.done}/>
        {!todo.done && <input tabIndex="1" onChange={this.onInputChange(key)} type="text" value={todo.name}/>}
        {todo.done && <span style={{ textDecoration: 'line-through' }}>{todo.name}</span>}
      </li>
    );
  }

  render() {
    const { todos } = this.state;
    return (
      <div>
        <h1>My Travel Bucket-List</h1>
        <p>A simple TODO Application</p>
        <button onClick={this.onAddTodo}>add TODO</button>
        <button onClick={this.removeAllDone}>remove done items</button>
        <ul>
          {todos.map(todo => this.renderTodo(todo, todos.indexOf(todo)))}
          {todos.length === 0 && <li>Nothing TODO :)</li>}
        </ul>
        <button onClick={this.onSave}>save</button>
      </div>
    );
  }
}
