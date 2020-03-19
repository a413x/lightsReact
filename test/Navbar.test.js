import React from 'react';
import { shallow, mount } from 'enzyme';
import { createMemoryHistory } from "history";
import { Router } from "react-router";

import Navbar from '../src/components/Navbar.js';

describe('Tests for Navbar component',()=>{
  const mockOnSetClick = jest.fn();
  const mockOnLinkClick = jest.fn();

  const props = {
    colors : [
      {id:0,color:'red'},
      {id:1,color:'yellow'},
      {id:2,color:'green'},
    ],
    times : [5, 4, 7],
    onSetClick: mockOnSetClick,
    onLinkClick: mockOnLinkClick
  };

  const initialState = {
    inputsVal: props.times
  };

  const container = shallow(<Navbar {...props} />);

  describe('Navbar initial',()=>{
    it('renders properly',()=>{
      expect(container).toMatchSnapshot();
    });
    it('initialize with initial state',()=>{
      expect(container.state()).toEqual(initialState);
    });
  });

  describe('Navbar links',()=>{
    let history = createMemoryHistory();
    const routerContainer = mount(
      <Router history = {history}>
        <Navbar {...props} />
      </Router>,
    );
    for(let i = 0; i < props.colors.length; i++){
      let color = '/' + props.colors[i].color;
      it('clicked on link ' + color,()=>{
        routerContainer.find('Link').filter({to:color}).simulate('click',{ button: 0 });
        expect(mockOnLinkClick).toHaveBeenCalledWith(i);
        expect(history.location.pathname).toBe(color);
      });
    }
    afterAll(()=>{
      routerContainer.unmount();
    })
  });

  describe('Navbar inputs',()=>{
    it('simulate change on a first input with right value',()=>{
      container.find('input').first().simulate('change',{
        target:{value:'12'}
      });
      expect(container.state().inputsVal[0]).toBe(12);
    });
    it('simulate change on a last input with wrong value',()=>{
      container.find('input').last().simulate('change',{
        target:{value:'abc'}
      });
      expect(container.state().inputsVal[2]).toBe(props.times[2]);
    });
  });

  describe('Navbar buttons',()=>{
    for(let i = 0; i < props.colors.length; i++){
      it('onSetClick called when clicked on button next to ' + props.colors[i].color,()=>{
        container.find('button').at(i).simulate('click');
        expect(mockOnSetClick).toHaveBeenCalledWith(container.state().inputsVal);
      });
    }
  });

  afterAll(()=>{
    container.setState(initialState);
  });
});
