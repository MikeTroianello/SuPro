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
    username: null,
    message: 'Not logged in'
  };

  componentDidMount() {
    console.log(
      'TESTING LOCAL STORAGE',
      JSON.parse(localStorage.getItem('user'))
    );

    console.log('XXXXXXXX', JSON.parse(localStorage.getItem('user')).gender);

    let storedUser = JSON.parse(localStorage.getItem('user'));

    if (storedUser) {
      this.setState({
        username: storedUser.username,
        message: `Hello ${storedUser.username}`
      });
    }
    this.login(storedUser);
  }

  login = storedUser => {
    console.log('LOGIN');
    axios
      .get(`http://localhost:5000/isLoggedIn/${storedUser._id}`)
      .then(result => {
        console.log(result.data);
        // if (result.data.user) {
        this.setState(
          {
            user: result.data.user || null,
            message: result.data.message
          },
          () => {
            console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-', this.state);
          }
        );
      });
  };

  logout = e => {
    e.preventDefault();
    console.log('LOGGING OUT');

    this.setState({
      username: null
    });
    localStorage.removeItem('user');
  };

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div className='App'>
          <Navbar info={this.state} logout={this.logout} />
          <h1>FRONTEND</h1>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/signup' component={Signup} />
          <Route exact path='/login' render={props => <Login {...props} />} />
          <Route exact path='/create' component={Create} />
          <Route exact path='/view' component={View} />
        </Switch>
      </Router>
    );
  }
}

export default App;
