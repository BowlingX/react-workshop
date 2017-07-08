/**
 * @flow
 */

import React from 'react';

type Props = {
  text: string
}

const NoState = (props: Props) => {
  const { text } = props;
  return (
    <p>{text}</p>
  )
};

export default NoState;
