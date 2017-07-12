/**
 * @flow
 */

import React from 'react';
import classNames from 'classnames';
import styles from './TodoButton.scss';

type Props = {
  primary?: boolean // eslint-disable-line
}
/**
 * A Simple Button for our TODO application
 */
const TodoButton = (props: Props) => {
  const { primary, ...rest } = props;
  return (
    <button className={classNames(styles.TodoButton, { primary })} {...rest} />
  );
};

export default TodoButton;
