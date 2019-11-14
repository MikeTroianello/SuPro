import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Signup from './components/Signup';
import Create from './components/Create';
import View from './components/View';
import Profile from './components/Profile';
import ViewProfile from './components/ViewProfile';
import Navbar from './components/Navbar';

import AuthService from './components/auth/auth-service';

import './App.css';

class App extends React.Component {
  state = {
    loggedInUser: null,
    message: 'Not logged in',
    createdLogToday: false,
    errMessage: null
  };

  service = new AuthService();

  componentDidMount() {
    if (!this.state.loggedInUser) {
      this.service
        .loggedin()
        .then(response => {
          this.setState({
            loggedInUser: response,
            message: `Hello, ${response.username}!`,
            createdLogToday: response.createdToday
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
    let storedUser = JSON.parse(localStorage.getItem('user'));
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

  setError = err => {
    this.setState({
      errMessage: err
    });
  };

  logCreated = () => {
    this.setState({
      createdLogToday: true
    });
  };

  logout = () => {
    this.setState({
      loggedInUser: null,
      message: 'Have a great day!'
    });
    localStorage.removeItem('user');
  };

  getTheUser = userObj => {
    this.setState({
      loggedInUser: userObj,
      message: `Hello, ${userObj.username}!`,
      createdLogToday: userObj.createdToday
    });
  };

  render() {
    // if (this.state.loggedInUser) {
    //   return <Redirect to='/profile' />;
    // }
    return (
      <div>
        <div className='App'>
          <Navbar
            info={this.state}
            logout={this.logout}
            history={this.history}
          />
        </div>
        <Switch>
          <Route
            exact
            path='/'
            render={props => (
              <Home
                {...props}
                err={this.state.errMessage}
                setError={this.setError}
                getUser={this.getTheUser}
              />
            )}
          />
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
              <Profile {...props} user={this.state.loggedInUser} />
            )}
          />
          <Route
            exact
            path='/logout'
            render={props => (
              <Logout
                {...props}
                logout={this.logout}
                user={this.state.loggedInUser}
              />
            )}
          />
          <Route
            exact
            path='/create'
            render={props => (
              <Create
                {...props}
                logCreated={this.logCreated}
                createdToday={this.state.createdLogToday}
                setError={this.setError}
              />
            )}
          />
          <Route
            path='/view'
            render={props => (
              <View
                {...props}
                createdToday={this.state.createdLogToday}
                loggedInUser={this.state.loggedInUser}
              />
            )}
          />
          <Route
            path='/view-profile/:id'
            render={props => <ViewProfile {...props} setUser={this.setUser} />}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
