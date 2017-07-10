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

type Props = {
  enableBadTransition: boolean
}

export default class ClassNames extends PureComponent {

  props:Props;

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
    // see https://developer.mozilla.org/de/docs/Web/Events/transitionend
    if(e.propertyName === 'transform' || e.propertyName === 'left') {
      this.setState({ isTransitioning: false});
    }
  };

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
            isTransitioning,
            badTransition: this.props.enableBadTransition
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
