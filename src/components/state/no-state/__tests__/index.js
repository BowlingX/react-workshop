/**
 * @flow
 */

/* global describe, it, expect */
import React from 'react';
import {shallow} from 'enzyme';
import NoState from '../NoState';

describe('<NoState/>', () => {
  it('should render some text', () => {
    // see https://github.com/airbnb/enzyme/blob/master/docs/api/shallow.md
    const wrapper = shallow(<NoState text="Example text"/>);
    expect(wrapper.text()).toEqual("Example text");
  });
});