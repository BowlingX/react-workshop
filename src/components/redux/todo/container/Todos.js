/**
 * @flow
 */

import { connect } from 'react-redux';
import Todos from '../components/Todos';
import { CHANGE_TODO, SET_AS_DONE } from '../reduxConfig';

export default connect(state => ({ todos: state.todos }), (dispatch:(action:Object) => any) => {
  return {
    onRemoveTodo: (todo:Object) => {
      dispatch({ type: SET_AS_DONE, todo });
    },
    onInputChange: (todo:Object, text:string) => {
      dispatch({ type: CHANGE_TODO, text, todo });
    }
  };
})(Todos);
