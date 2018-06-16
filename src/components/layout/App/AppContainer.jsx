import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Router, Switch } from 'react-router-dom';
import SearchUser from '../../pages/SearchUser';

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchUser/>
      </div>
    );
  }
}

export default App;
