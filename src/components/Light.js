import React, { Component } from "react";

import '../styles/light.css';

class Light extends Component{
  constructor(props){
    super(props);
  }
  render(){
    let className = 'light ';
    if(this.props.isActive) className += this.props.color + '-light';
    if(this.props.blink) className += ' blink';
    return <div className = {className} />
  }
}

export default Light;
