import React from 'react';
import { connect } from 'react-redux';
import Todos from './Todos';
import TodoButton from '../components/TodoButton';
import { ADD_TODO, REMOVE_DONE } from '../reduxConfig';

type Props = {
  onAddTodo: (text: string) => void,
  onRemoveAllDone: () => void
}

class Root extends React.Component {
  props: Props;

  onAddTodo = () => {
    const value = window.prompt('What do you want TODO?', ''); // eslint-disable-line
    if (value) {
      this.props.onAddTodo(value);
    }
  };

  onRemoveAllDone = () => {
    this.props.onRemoveAllDone();
  };

  render() {
    return (
      <div>
        <h1>A TODO Application in redux</h1>
        <p>A simple TODO Application with redux</p>
        <TodoButton primary onClick={this.onAddTodo}>add TODO</TodoButton>
        <TodoButton onClick={this.onRemoveAllDone}>remove done items</TodoButton>
        <Todos />
      </div>
    );
  }
}

export default connect(null, (dispatch: (action: Object) => any) => {
  return {
    onAddTodo: (name: string) => {
      dispatch({ type: ADD_TODO, name });
    },
    onRemoveAllDone: () => {
      dispatch({ type: REMOVE_DONE });
    }
  };
})(Root);
