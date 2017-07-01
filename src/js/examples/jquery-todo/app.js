import $ from 'jquery';
import 'jquery-ui';
import view from './view.hbs';

/**
 * A (Horrible) example of a TODO-Application in simple jQuery
 */
$.widget('bowlingx.todo', {

  _create: function () {

    // The Application Model
    this.model = {
      todos: [
        { name: 'Trousers', done: false },
        { name: '10 T-Shirts', done: false },
        { name: '10 pair of socks', done: false },
        { name: 'Laptop', done: false }
      ],
      create: () => {
        this.model.todos.push({ name: '', done: false });
      },
      update: (index, text) => {
        this.model.todos[index].name = text;
      },
      remove: (index) => {
        this.model.todos[index].done = !this.model.todos[index].done;
      },
      removeAllDone: () => {
        this.model.todos = this.model.todos.filter(el => !el.done);
      }
    };

    const getIndex = (item) => $(item).parents('[data-container]').index();

    /**
     * Method called when the value of the input field changes
     */
    this.onInputChange = (event) => {
      this.model.update(getIndex(event.target), event.target.value);
    };

    /**
     * Method called when the user requests to add a new item
     */
    this.onAddTodo = () => {
      this.model.create();
      this.render();
    };

    /**
     * Method called when the user requests to remove an item
     */
    this.onRemoveTodo = (event) => {
      this.model.remove(getIndex(event.target));
      this.render();
    };

    this.removeAllDone = () => {
      this.model.removeAllDone();
      this.render();
    };

    // register events
    $(this.element).on('input', '[data-input]', this.onInputChange);
    $(this.element).on('click', '[data-add-button]', this.onAddTodo);
    $(this.element).on('click', '[data-remove-done-button]', this.removeAllDone);
    $(this.element).on('click', '[data-checkbox]', this.onRemoveTodo);


    $(this.element).on('click', '[data-save]', () => {
      this._trigger('save', null, this.model.todos);
    });

    // render the model
    this.render();
  },
  render: function () {
    $(this.element).html(view(this.model));
  },
  _destroy: function () {
    // unregister events, cleanup
    $(this.element).off();
  }
});