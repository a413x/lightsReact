import React from 'react'
import { shallow, mount } from 'enzyme';

import App from '../src/components/App.js';
import Traffic from '../src/components/Traffic.js';

describe('Tests for Traffic component',()=>{
  const initialLight = 0;
  const colors = [
    {id:0,color:'red'},
    {id:1,color:'yellow'},
    {id:2,color:'green'},
  ];
  const times= [5, 4, 7];
  const initialState = {
    timeCount: times[initialLight],
  };

  let container, traffic, instance;

  beforeEach(()=>{
    jest.useFakeTimers();
    container = mount(<App />);
    traffic = container.find('Traffic');
    instance = traffic.instance();
  });

  it('renders properly',()=>{
    const props = {
      lightsState: [1,0,0],
      location:{pathname:'/red'},
      history:{push:()=>{}}
    }
    const shallowContainer = shallow(
      <Traffic {...props} />
    );
    expect(shallowContainer).toMatchSnapshot();
  });

  it('initialize with initial state',()=>{
    expect(traffic.state()).toEqual(initialState);
  });

  describe('setTimeCount called, should call mainCycle and set timeCount',()=>{
    it('called with 0',()=>{
      jest.spyOn(instance,'mainCycle');
      instance.setTimeCount(0);
      expect(instance.mainCycle).toHaveBeenCalled();
      expect(traffic.state().timeCount).toBe(times[0]);
    });
    it('called with 2',()=>{
      jest.spyOn(instance,'mainCycle');
      instance.setTimeCount(2);
      expect(instance.mainCycle).toHaveBeenCalled();
      expect(traffic.state().timeCount).toBe(times[2]);
    });
  });

  describe('mainCycle function should work correctly',()=>{
    it('initial state',()=>{
      jest.spyOn(instance,'incCount');
      expect(setInterval).toHaveBeenCalled();
      expect(instance.incCount).not.toHaveBeenCalled();
      expect(traffic.state().timeCount).toBe(times[initialLight]);
    });
    it('after 1s delay',()=>{
      jest.spyOn(instance,'incCount');
      jest.advanceTimersByTime(1000);
      expect(instance.incCount).toHaveBeenCalledTimes(1);
      expect(traffic.state().timeCount).toBe(times[initialLight]-1);
    });
  });

  it('incCount should call goNext when counter<=0',()=>{
    jest.spyOn(instance,'goNext');
    traffic.setState({timeCount:0});
    jest.advanceTimersByTime(1000);
    expect(instance.goNext).toHaveBeenCalledTimes(1);
  });

  describe('componentDidUpdate should save previous path',()=>{
    it('pathnames are different',()=>{
      jest.spyOn(instance,'componentDidUpdate');
      const initPath = '/yellow';
      instance.props.history.push({pathname: initPath});
      instance.props.history.push({pathname: '/red'});
      expect(instance.componentDidUpdate).toHaveBeenCalledTimes(2);
      expect(instance.prevPath).toBe(initPath);
    });
    it('pathnames are same',()=>{
      jest.spyOn(instance,'componentDidUpdate');
      const initPath = '/red';
      instance.props.history.push({pathname: initPath});
      instance.props.history.push({pathname: '/green'});
      instance.props.history.push({pathname: '/green'});
      expect(instance.componentDidUpdate).toHaveBeenCalledTimes(3);
      expect(instance.prevPath).toBe(initPath);
    });
  });

  describe('test for goNext function',()=>{
    it('from /red should go to /yellow',()=>{
      instance.props.history.push({pathname: '/red'});
      instance.goNext();
      expect(instance.props.location.pathname).toBe('/yellow');
    });
    it('from /green should go to /yellow',()=>{
      instance.props.history.push({pathname: '/green'});
      instance.goNext();
      expect(instance.props.location.pathname).toBe('/yellow');
    });
    it('from /yellow should go to /green if previous path was /red',()=>{
      instance.props.history.push({pathname: '/red'});
      instance.goNext();
      instance.goNext();
      expect(instance.props.location.pathname).toBe('/green');
    });
    it('from /yellow should go to /red if previous path was /green',()=>{
      instance.props.history.push({pathname: '/green'});
      instance.goNext();
      instance.goNext();
      expect(instance.props.location.pathname).toBe('/red');
    });
  });

  it('overall logic',()=>{
    instance.props.history.push({pathname: '/red'});
    traffic.setState({timeCount:2});
    instance.times = [2,1,2];
    jest.advanceTimersByTime(3000);
    expect(instance.props.location.pathname).toBe('/yellow');
    jest.advanceTimersByTime(2000);
    expect(instance.props.location.pathname).toBe('/green');
    jest.advanceTimersByTime(3000);
    expect(instance.props.location.pathname).toBe('/yellow');
    jest.advanceTimersByTime(2000);
    expect(instance.props.location.pathname).toBe('/red');
    jest.advanceTimersByTime(5000);
    expect(instance.props.location.pathname).toBe('/green');
  });

  afterAll(()=>{
    traffic.setState(initialState);
    container.unmount();
  });
});
