import $ from 'jquery';
import 'jquery-ui';
import view from './view.hbs';
import Model from './model';

/**
 * A (Horrible) example of a TODO-Application in simple jQuery
 */
$.widget('bowlingx.todo', {

  _create() {
    // The Application Model
    this.model = new Model();

    const getIndex = item => $(item).parents('[data-container]').index();

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
      const value = window.prompt('What do you want TODO?', ''); // eslint-disable-line
      if (value) {
        this.model.create(value);
        this.render();
      }
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
      this._trigger('save', null, [this.model.todos]);
    });

    // render the model
    this.render();
  },
  render() {
    $(this.element).html(view(this.model));
  },
  _destroy() {
    // unregister events, cleanup
    $(this.element).off();
  }
});
