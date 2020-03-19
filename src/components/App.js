import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Traffic from './Traffic.js'

class App extends Component {
    constructor(props){
      super(props);
      this.lightsState = [[1,0,0],[0,1,0],[0,0,1]];
    }
    render() {
        return (
          <Router>
            <div>
              <Switch>
                <Route path = '/red' render = {(props) => <Traffic {...props} lightsState = {this.lightsState[0]} />} />
                <Route path = '/yellow' render = {(props) => <Traffic {...props} lightsState = {this.lightsState[1]} />} />
                <Route path = '/green' render = {(props) => <Traffic {...props} lightsState = {this.lightsState[2]} />} />
                <Redirect from='/' to='/red' />
              </Switch>
            </div>
          </Router>
        );
    }
}

export default App;
