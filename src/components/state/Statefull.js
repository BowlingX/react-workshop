/**
 * @flow
 */

import React, { Component } from 'react';
import randomColor from '../../lib/color';

type State = {
  color: string
}

export default class Statefull extends Component {

  state: State = {
    color: randomColor()
  };

  onButtonClick = () => {
    this.setState({ color: randomColor() });
  };

  render() {
    return <button onClick={this.onButtonClick} style={{ backgroundColor: this.state.color }}>click me</button>
  }
}
