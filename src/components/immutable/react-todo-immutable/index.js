/**
 * @flow
 */

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Model, { MutableModel } from '../../../jquery/model';
import type { Todo } from '../../../jquery/model';
import SingleTodo from './lib/SingleTodo';

type State = {
  todos: Array<Todo>
};

type Props = {
  onSave: (todos: Array<Todo>) => void,
  useMutableModel: boolean,
  forceUpdate: boolean
}

/**
 * An optimized Immutable version of ReactTodo
 */
export default class ReactImmutableTodo extends Component {
  model: Model|MutableModel;

  props: Props;

  state: State = {
    todos: []
  };

  shouldComponentUpdate(nextProps:Props, nextState:State) {
    if (nextProps.useMutableModel && nextProps.forceUpdate) {
      return true;
    }

    return shallowCompare(this, nextProps, nextState);
  }

  constructor(props: Object) {
    super(props);

    this.model = props.useMutableModel ? new MutableModel() : new Model();
    this.state = {
      todos: this.model.todos
    };
  }

  componentWillReceiveProps(nextProps:Props) {
    if (nextProps.useMutableModel === this.props.useMutableModel) {
      return;
    }
    if (nextProps.useMutableModel) {
      this.model = new MutableModel();
    } else {
      this.model = new Model();
    }
    this.setState({ todos: this.model.todos });
  }

  onRemoveTodo = (todo: Todo) => {
    this.setState({
      todos: this.model.remove(this.model.todos.indexOf(todo))
    });
  };

  onInputChange = (todo: Todo, value:string) => {
    this.setState({
      todos: this.model.update(this.model.todos.indexOf(todo), value)
    });
  };

  onAddTodo = () => {
    const value = window.prompt('What do you want TODO?', ''); // eslint-disable-line
    if (value) {
      this.setState({
        todos: this.model.create(value)
      });
    }
  };

  removeAllDone = () => {
    this.setState({
      todos: this.model.removeAllDone()
    });
  };

  onSave = () => {
    if (this.props.onSave) {
      this.props.onSave(this.state.todos);
    }
  };

  renderTodo(todo: Todo) {
    return (
      <SingleTodo
        forceUpdate={this.props.forceUpdate}
        todo={todo}
        key={todo.id}
        onRemoveTodo={this.onRemoveTodo}
        onInputChange={this.onInputChange}
      />
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
          {todos.map(todo => this.renderTodo(todo))}
          {todos.length === 0 && <li key="nothing">Nothing TODO :)</li>}
        </ul>
        <button onClick={this.onSave}>save</button>
      </div>
    );
  }
}
