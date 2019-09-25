import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';

import axios from 'axios';
import './App.css';

class App extends Component() {
  state = {
    user: {}
  };

  // componentWillMount() {}

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <h1>This is the beginning of the React App</h1>
        </div>
        <Route exact path='/' component={Home} />
        <Route path='/' component={Home} />
        <Route exact path='/' component={Home} />
      </Router>
    );
  }
}

export default App;
