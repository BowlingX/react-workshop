/**
* @flow
*/
import React from 'react';
import { hoverBtn } from './HoverButton.scss';

const HoverButton = (props:Object) => {
  return (
    <button className={hoverBtn} {...props} />
  );
};

export default HoverButton;
