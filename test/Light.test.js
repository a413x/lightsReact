import React from 'react'
import { shallow } from 'enzyme'

import Light from '../src/components/Light.js';

describe('Tests for Light component',()=>{

  const props = {
    isActive: false,
    blink: false,
    color:'red',
  };

  describe('Light initial',()=>{
    const light = shallow(<Light {...props} />);
    it('renders properly',()=>{
      expect(light).toMatchSnapshot();
    });
  });

  describe('Light active state',()=>{
    const nextProps = {
      isActive: true,
      blink: false,
      color:'yellow',
    };

    const light = shallow(<Light {...nextProps} />);
    it('renders properly',()=>{
      expect(light).toMatchSnapshot();
    });
  });

  describe('Light blink state',()=>{
    const nextProps = {
      isActive: true,
      blink: true,
      color:'green',
    };

    const light = shallow(<Light {...nextProps} />);
    it('renders properly',()=>{
      expect(light).toMatchSnapshot();
    });
  });

});
