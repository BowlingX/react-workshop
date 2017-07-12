/**
 * @flow
 */

import React, { Component } from 'react';
import randomColor from '../../../lib/color';

type State = {
  color: string
}

type Props = {
  /** the initial color */
  initialColor: string
}

export default class Statefull extends Component {
  state: State;

  props:Props;

  constructor(props:Props) {
    super(props);
    this.state = { color: props.initialColor };
  }

  onButtonClick = () => {
    this.setState({ color: randomColor() });
  };

  render() {
    return (
      <button
        onClick={this.onButtonClick}
        style={{ backgroundColor: this.state.color, color: 'white' }}
      >
        click me
      </button>
    );
  }
}
