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
  state = {
    user: null,
    message: null
  };

  componentDidMount() {
    console.log('TESTING LOCAL STORAGE', localStorage.getItem('user'));
    let x = localStorage.getItem('user');
    console.log('XXXXXXXX', x);
    this.login();
  }

  login = () => {
    axios.get('http://localhost:5000/isLoggedIn').then(result => {
      console.log(result.data);
      // if (result.data.user) {
      this.setState(
        {
          user: result.data.user || null,
          message: result.data.message
        },
        () => {
          console.log(this.state);
        }
      );
    });
  };

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div className='App'>
          <Navbar info={this.state} />
          <h1>FRONTEND</h1>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route
            exact
            path='/login'
            render={props => <Login {...props} login={this.login} />}
          />
          <Route exact path='/create' component={Create} />
          <Route exact path='/view' component={View} />
        </Switch>
      </Router>
    );
  }
}

export default App;
