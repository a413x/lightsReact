import React, { Component } from "react";
import { Link } from 'react-router-dom';

import '../styles/nav.css';

class Navbar extends Component{
  constructor(props){
    super(props);
    this.state = {
      inputsVal: this.props.times
    };
  }
  inputChange(e,ind){
    const val = parseInt(e.target.value);
    if(!val || val > 99 || val < 0) return;
    const nextTimes = [...this.state.inputsVal];
    nextTimes[ind] = val;
    this.setState({inputsVal:nextTimes});
  }
  onSetClick(){
    this.props.onSetClick([...this.state.inputsVal]);
  }
  render(){
    const colors = this.props.colors;
    return <div className = 'nav'>
      {colors.map((el,ind)=>
        <div key={el.id}>
          <Link to={'/'+el.color} onClick={()=>this.props.onLinkClick(ind)}>
            {el.color.charAt(0).toUpperCase() + el.color.slice(1)}
          </Link>
          <input type='number' min = '0' max = '100'
            value = {this.state.inputsVal[ind]} onChange = {(e)=>{this.inputChange(e,ind)}}/>
          <button onClick = {()=>this.onSetClick()}>Set</button>
        </div>
      )}
    </div>
  }
}

export default Navbar;
