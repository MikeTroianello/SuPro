import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import axios from 'axios';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Create from './components/Create';
import View from './components/View';
import Navbar from './components/Navbar';

import './App.css';

class App extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <h1>FRONTEND</h1>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/view' component={View} />
        </Switch>
      </Router>
    );
  }
}

export default App;
