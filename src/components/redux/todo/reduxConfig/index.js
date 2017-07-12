/**
 * @flow
 */
import update from 'immutability-helper';

export const ADD_TODO = 'ADD_TODO';
export const SET_AS_DONE = 'SET_AS_DONE';
export const REMOVE_DONE = 'REMOVE_DONE';
export const CHANGE_TODO = 'CHANGE_TODO';

let globalTodoId = 500;

const todoReducer = (todos: Array<Object> = [], action: Object) => {
  switch (action.type) {
    case ADD_TODO:
      return update(todos, { $push: [{ name: action.name, done: false, id: (globalTodoId += 1) }] });
    case REMOVE_DONE:
      return todos.filter(el => !el.done);
    case SET_AS_DONE:
      return update(todos, {
        [todos.indexOf(action.todo)]: { $apply: todo => ({ ...todo, name: todo.name, done: !todo.done }) }
      });
    case CHANGE_TODO:
      return update(todos, { [todos.indexOf(action.todo)]: { $merge: { name: action.text } } });

    default:
      return todos;
  }
};

export default todoReducer;
