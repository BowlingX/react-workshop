/**
 * @flow
 */

import React, { Component } from 'react';
import shallowCompare from 'react-addons-shallow-compare';
import Model, { MutableModel } from '../../../jquery/model.js';
import type { Todo } from '../../../jquery/model.js';
import SingleTodo from './lib/SingleTodo';
type State = {
  todos: Array<Todo>
};

type Props = {
  onSave: (todos: Array<Todo>) => void,
  useMutableModel?: boolean,
  forceUpdate?: boolean
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
    if(nextProps.useMutableModel && nextProps.forceUpdate) {
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
    if(nextProps.useMutableModel === this.props.useMutableModel) {
      return;
    }
    if(nextProps.useMutableModel) {
      this.model = new MutableModel();
    } else {
      this.model = new Model();
    }
    this.setState({ todos: this.model.todos });
  }

  onRemoveTodo = (todo: Todo) => (e: Event) => {
    this.setState({
      todos: this.model.remove(this.model.todos.indexOf(todo))
    });
  };

  onInputChange = (todo: Todo) => (e: Event) => {
    this.setState({
      // $FlowFixMe: value unknown
      todos: this.model.update(this.model.todos.indexOf(todo), e.target.value)
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
      <SingleTodo
        forceUpdate={this.props.forceUpdate}
        todo={todo}
        key={key}
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
          {todos.map(todo => this.renderTodo(todo, todos.indexOf(todo)))}
          {todos.length === 0 && <li>Nothing TODO :)</li>}
        </ul>
        <button onClick={this.onSave}>save</button>
      </div>
    );
  }
}
