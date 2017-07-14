/**
 * @flow
 */

import React, { PureComponent, Children } from 'react';
import classNames from 'classnames';
import { AnimatedButton } from './ClassNames.scss';

type State = {
  isToggled:boolean
}

type Props = {
  children:Children
}

export default class ToggleClass extends PureComponent {

  props:Props;

  state: State = {
    isToggled: false
  };

  onButtonClick = () => {
    this.setState({ isToggled: !this.state.isToggled });
  };


  render() {
    const { isToggled } = this.state;

    return (
      <div>
        <button
          onClick={this.onButtonClick}
          className={
            classNames(AnimatedButton, {
              isToggled
            })
          }
        >
          {isToggled && 'is toggled'}
          {this.props.children}
        </button>

        <p style={{ display: isToggled ? 'block' : 'none' }}>Ein Text</p>
      </div>
    );
  }
}
