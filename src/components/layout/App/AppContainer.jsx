import React, { Component } from 'react';
import './App.css';
import { Switch, Route, Router } from 'react-router-dom';
import SearchUser from '../../pages/SearchUser';
import Profile from '../../pages/Profile';
import { getHistory } from '../../../utils';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router history={getHistory()}>
          <Switch>
            <Route exact path="/" component={SearchUser}/>
            <Route exact path="/profile" component={Profile}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
