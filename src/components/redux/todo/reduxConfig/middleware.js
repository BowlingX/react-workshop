/* eslint-disable no-console */
/**
 * @flow
 */

// Simple middleware that logs our action
const middleware = (store:Object) => (next: (action: Object) => Object) => (action: Object) => { // eslint-disable-line
  console.group(action.type);
  console.log(action);
  console.groupEnd();
  return next(action);
};

export default middleware;
