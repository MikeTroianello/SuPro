import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/auth/protected-route';
import axios from 'axios';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Create from './components/Create';
import View from './components/View';
import Profile from './components/Profile';
import Navbar from './components/Navbar';

import AuthService from './components/auth/auth-service';

import './App.css';

class App extends React.Component {
  state = {
    loggedInUser: null,
    message: 'Not logged in'
  };

  service = new AuthService();

  componentDidMount() {
    if (!this.state.loggedInUser) {
      this.service
        .loggedin()
        .then(response => {
          console.log('RESPONSE:', response);
          this.setState({
            loggedInUser: response,
            message: `Welcome back, ${response.username}`
          });
        })
        .catch(err => {
          this.setState({
            loggedInUser: false
          });
        });
    }
  }

  setUser = () => {
    console.log('SETTING USER');
    let storedUser = JSON.parse(localStorage.getItem('user'));
    console.log('LOCAL STORAGE: ', storedUser);
    this.setState(
      {
        username: storedUser.username,
        message: `Hello ${storedUser.username}`
      },
      () => {
        console.log(this.state);
      }
    );
  };

  login = storedUser => {
    console.log('LOGIN');
    axios
      .get(`http://localhost:5000/login`, {
        theUser: storedUser,
        withCredentials: true
      })
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
    axios.post('http://localhost:5000/logout').then(result => {
      console.log(result);
      this.setState({
        username: null,
        message: result.data.message
      });
      localStorage.removeItem('user');
    });
  };

  getTheUser = userObj => {
    this.setState(
      {
        loggedInUser: userObj,
        message: `Hello, ${userObj.username}!`
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    console.log(this.state.user);
    return (
      <Router>
        <div className='App'>
          <Navbar info={this.state} logout={this.logout} />
          <h1 className='frontend'>THIS IS THE FRONTEND</h1>
        </div>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route
            exact
            path='/signup'
            render={props => <Signup {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path='/login'
            render={props => <Login {...props} getUser={this.getTheUser} />}
          />
          <Route
            exact
            path='/profile'
            render={props => (
              <Profile {...props} users={this.state.loggedInUser} />
            )}
          />
          <Route exact path='/create' render={props => <Create {...props} />} />
          <Route exact path='/view' component={View} />
        </Switch>
      </Router>
    );
  }
}

export default App;
