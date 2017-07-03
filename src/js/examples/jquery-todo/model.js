/**
 * @flow
 */

import update from 'immutability-helper';

export type Todo = {
  name: string,
  done: boolean
}

/**
 * A Immutable Version of a model
 */
export default class Model {

  todos: Array<Todo> = [
    { name: 'Trousers', done: false },
    { name: '10 T-Shirts', done: false },
    { name: '10 pair of socks', done: false },
    { name: 'Laptop', done: false }
  ];

  create(name: string) {
    this.todos = update(this.todos, { $push: [{ name, done: false }] });
    return this.todos;
  }

  update(index: number, text: string) {
    this.todos = update(this.todos, { [index]: { $merge: { name: text } } });
    return this.todos;
  }

  remove(index: number) {
    this.todos = update(this.todos, { [index]: { $apply: (todo) => ({ name: todo.name, done: !todo.done }) } });
    return this.todos;
  }

  removeAllDone() {
    this.todos = this.todos.filter(el => !el.done);
    return this.todos;
  }
}

/**
 * A Mutable version of Model
 */
export class MutableModel {

  todos: Array<Todo> = [
    { name: 'Trousers', done: false },
    { name: '10 T-Shirts', done: false },
    { name: '10 pair of socks', done: false },
    { name: 'Laptop', done: false }
  ];

  create(name: string) {
    this.todos.push({ name, done: false });
    return this.todos;
  }

  update(index: number, text: string) {
    this.todos[index].name = text;
    return this.todos;
  }

  remove(index: number) {
    this.todos[index].done = !this.todos[index].done;
    return this.todos;
  }

  removeAllDone() {
    this.todos = this.todos.filter(el => !el.done);
    return this.todos;
  }
}