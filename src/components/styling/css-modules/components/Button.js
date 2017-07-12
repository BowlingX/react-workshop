/**
* @flow
*/
import React from 'react';
import { btn } from './Button.scss';

const Button = (props:Object) => {
  return (
    <button className={btn} {...props} />
  );
};

export default Button;
