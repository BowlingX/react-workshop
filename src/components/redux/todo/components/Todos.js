/**
 * @flow
 */

import React from 'react';
import SingleTodo from '../../../immutable/react-todo-immutable/lib/SingleTodo';

type Props = {
  /** list of todos */
  todos: Array<Object>,
  /** handler when a todo is marked as done */
  onRemoveTodo: (todo:Object) => void,
  /** handle when the text of a todo items changes */
  onInputChange: (todo:Object, text:string) => void
}

/**
 * Represents a list of TODO items.
 */
const Todos = (props: Props) => {
  const { todos, onRemoveTodo, onInputChange } = props;
  return (
    <ul>
      {todos.map(todo => (<SingleTodo
        forceUpdate={false}
        todo={todo}
        key={todo.id}
        onRemoveTodo={onRemoveTodo}
        onInputChange={onInputChange}
      />))}
      {todos.length === 0 && <li key="nothing">Nothing TODO :)</li>}
    </ul>
  );
};

export default Todos;
