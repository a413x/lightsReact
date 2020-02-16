import React, { Component } from "react";
import { Link } from 'react-router-dom';

import '../styles/nav.css';

class Light extends Component{
  constructor(props){
    super(props);
    this.inputRef = [];
    this.fillInputs = this.fillInputs.bind(this);
    this.buttonSetClick = this.buttonSetClick.bind(this);
  }
  componentDidMount(){
    this.fillInputs();
  }
  buttonSetClick(ind) {
    let value = this.inputRef[ind].value;
    if(!value || value < 0) value = 0;
    this.props.onSetClick(value,ind);
  }
  onLinkClick(ind){
    this.props.setTime(ind);
  }
  fillInputs(){
    for(let i = 0; i < this.inputRef.length; i++){
      this.inputRef[i].value = this.props.times[i];
    }
  }
  inputKeyDown(e){
    e.preventDefault();
  }
  render(){
    const times = this.props.times;
    const colors = this.props.colors;
    return <div className = 'nav'>
      {colors.map((el,ind)=>
        <div key={el.id}>
          <Link to={'/'+el.color} onClick={this.onLinkClick.bind(this,ind)}>
            {el.color.charAt(0).toUpperCase() + el.color.slice(1)}
          </Link>
          <input type='number' min = '0' max = '100'
            ref={el => this.inputRef[ind] = el}
            onKeyDown = {this.inputKeyDown} />
          <button onClick = {this.buttonSetClick.bind(this,ind)}>Set</button>
        </div>
      )}
    </div>
  }
}

export default Light;
