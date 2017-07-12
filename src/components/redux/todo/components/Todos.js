/**
 * @flow
 */

import React from 'react';
import SingleTodo from '../../../immutable/react-todo-immutable/lib/SingleTodo';

type Props = {
  todos: Array<Object>,
  onRemoveTodo: (todo:Object) => void,
  onInputChange: (todo:Object, text:string) => void
}

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
