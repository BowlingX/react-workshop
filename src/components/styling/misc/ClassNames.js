/**
 * @flow
 */

import React, { PureComponent } from 'react';
import classNames from 'classnames';
import { AnimatedButton } from './ClassNames.scss';

type State = {
  shouldAnimate:boolean,
  isTransitioning:boolean,
  catched:number
}

export default class ClassNames extends PureComponent {

  state: State = {
    shouldAnimate: false,
    isTransitioning: false,
    catched: 0
  };

  onButtonClick = () => {
    let catched = this.state.catched;
    if(this.state.isTransitioning) {
      catched++;
    }
    this.setState({ shouldAnimate: !this.state.shouldAnimate, isTransitioning: true, catched });
  };

  onTransitionEnd = (e:Event) => {
    // $FlowFixMe:
    if(e.propertyName === 'transform') {
      this.setState({ isTransitioning: false});
    }
  }

  render() {
    const { shouldAnimate, isTransitioning, catched } = this.state;
    return (
      <div>
      <button
        onClick={this.onButtonClick}
        onTransitionEnd={this.onTransitionEnd}
        className={
          classNames(AnimatedButton, {
            animate: shouldAnimate,
            isTransitioning
          })
        }
      >
        {this.state.isTransitioning && 'catch me' || 'click me'}
      </button>
      <p>You catched the button {catched} time(s)</p>
      </div>
    );
  }
}
