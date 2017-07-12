/**
 * @flow
 */

import { connect } from 'react-redux';
import Todos from '../components/Todos';

export default connect(state => ({ todos: state.todos }), (dispatch:(action:Object) => any) => {
  return {
    onRemoveTodo: (todo:Object) => {},
    onInputChange: (todo:Object, text:string) => {}
  };
})(Todos);
