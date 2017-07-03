/**
 * @flow
 */

import React, { Component } from 'react';
import Model from '../jquery-todo/model.js';
import type { Todo } from '../jquery-todo/model.js';

type State = {
  todos: Array<Todo>
};

type Props = {
  onSave?: (todos: Array<Todo>) => void
}

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

  onRemoveTodo: (index: number) => (e: Event) => void = (index: number) => (e: Event) => {
    this.setState({
      // $FlowFixMe: value unknown
      todos: this.model.remove(index)
    });
  };

  onInputChange: (index: number) => (e: Event) => void = (index: number) => (e: Event) => {
    this.setState({
      // $FlowFixMe: value unknown
      todos: this.model.update(index, e.target.value)
    });
  };

  onAddTodo: (e: Event) => void = (e: Event) => {
    const value = window.prompt('What do you want TODO?', '');
    if (value) {
      this.setState({
        todos: this.model.create(value)
      });
    }
  };

  removeAllDone: (e: Event) => void = (e: Event) => {
    this.setState({
      todos: this.model.removeAllDone()
    });
  };

  onSave: (e: Event) => void = (e: Event) => {
    if (this.props.onSave) {
      this.props.onSave(this.state.todos);
    }
  };

  renderTodo(todo: Todo, key: number) {
    return (
      <li key={key}>
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
        <h1>My Travel-TODOs</h1>
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
