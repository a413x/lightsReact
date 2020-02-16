import React, {Component} from "react";
import Light from './Light.js';
import { Link } from 'react-router-dom';

import Navbar from './Navbar.js';

import '../styles/traffic.css';

class Traffic extends Component {
  constructor(props) {
    super(props);
    this.colors = [
      {id:0,color:'red'},
      {id:1,color:'yellow'},
      {id:2,color:'green'},
    ];
    this.times= [5, 4, 7];
    this.state = {
      timeCount: 0,
    };

    this.mainCycle = this.mainCycle.bind(this);

    this.prevPath = '';
    this.goNext = this.goNext.bind(this);
    this.goTo = this.goTo.bind(this);

    this.incCount = this.incCount.bind(this);
    this.setTimeCount = this.setTimeCount.bind(this);

    this.onSetClick = this.onSetClick.bind(this);

    this.intervalId = null;
  }

  mainCycle(){
    this.intervalId = setInterval(() => {
      this.incCount();
    }, 1000);
  }

  componentDidMount() {
    this.setTimeCount(this.props.lightsState.indexOf(1));
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.prevPath = prevProps.location.pathname;
    }
  }
  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  incCount() {
    if (this.state.timeCount <= 0) {
      this.goNext();
    } else {
      this.setState({
        timeCount: this.state.timeCount - 1
      });
    }
  }
  setTimeCount(ind){
    this.setState({
      timeCount: this.times[ind]
    });
    clearInterval(this.intervalId);
    this.mainCycle();
  }

  goNext() {
    const lightsState = this.props.lightsState;
    if (lightsState[0]){
      this.setTimeCount(1);
      this.goTo('yellow');
    }
    else if (lightsState[1]) {
      if (this.prevPath === '/green'){
        this.setTimeCount(0);
        this.goTo('red');
      }
      else{
        this.setTimeCount(2);
        this.goTo('green');
      }
    } else if (lightsState[2]) {
      this.setTimeCount(1);
      this.goTo('yellow');
    }
  }
  goTo(path){
    this.props.history.push({
      pathname: path
    });
  }

  onSetClick(val,ind){
    this.times[ind] = val;
  }

  render() {
    const activeColor = this.props.lightsState;
    const doBlink = this.state.timeCount < 3;
    return (
      <div className = 'main-container'>

        <div className='traffic'>
          <div className = 'lights-container'>
            {this.colors.map((el,ind) =>
              <Light key = {el.id}
                isActive = {activeColor[ind]}
                blink = {doBlink && activeColor[ind]}
                color = {el.color}/>
            )}
          </div>
          <div className = 'time'> {this.state.timeCount} </div>
        </div>

        <Navbar times = {this.times} colors = {this.colors}
          onSetClick = {this.onSetClick}
          setTime = {this.setTimeCount} />

      </div>
    );
  }
}

export default Traffic;
