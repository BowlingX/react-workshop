/**
 * @flow
 */

/* global describe, it, expect */
import React from 'react';
import { mount } from 'enzyme';
import Statefull from '../Statefull';


describe('<Statefull/>', () => {
  it('must render initial color', () => {
    const button = mount(<Statefull initialColor="black" />);
    // it's possibe to render to html
    expect(button.html()).toEqual('<button style="background-color: black; color: white;">click me</button>');
    // you can inspect the props
    expect(button.props().initialColor).toEqual('black');
  });

  it('must change the color after click', () => {
    const button = mount(<Statefull initialColor="black" />);
    expect(button.state().color).toEqual('black');
    button.simulate('click');
    expect(button.state().color).not.toEqual('black');
  });
});
