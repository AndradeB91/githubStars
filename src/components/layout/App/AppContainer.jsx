import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Router } from 'react-router-dom';
import Dispenser from '../../pages/Dispenser';
import { getHistory } from '../../../utils';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={getHistory()}>
          <Switch>
            <Route exact path="/" component={Dispenser} />
            <Route exact path="/profile" component={Dispenser} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
