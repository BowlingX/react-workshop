/**
 * @flow
 */

import React, { Component } from 'react';

type Todo = {
  name: string,
  done: boolean
}

type State = {
  todos: Array<Todo>
};

export default class ReactTodo extends Component {

  state: State;

  constructor(props: Object) {
    super(props);
    this.state = {
      todos: []
    };
  }

  renderTodos(todo: Todo) {
    return (
      <li>{todo.name}</li>
    );
  }

  render() {
    const { todos } = this.state;

    return (
      <div>
        <h1>A simple TODO todo Application</h1>
        <button>Add TODO</button>
        <button>remove done items</button>
        <ul>
          {todos.map(todo => this.renderTodos(todo))}
        </ul>
      </div>
    );
  }
}