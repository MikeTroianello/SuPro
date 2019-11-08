import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import ProtectedRoute from './components/auth/protected-route';

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
          console.log('RESPONSE:', response);
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

  setError = err => {
    this.setState({
      errMessage: err
    });
  };

  logCreated = () => {
    console.log('THE LOG HAS BEEN CREATED');
    this.setState(
      {
        createdLogToday: true
      },
      () => console.log('Have created a log!', this.state.createdLogToday)
    );
  };

  logout = () => {
    this.setState(
      {
        loggedInUser: null,
        message: 'Have a great day!'
      },
      () => {
        console.log('WE Have Logged out! ', this.state);
      }
    );
    localStorage.removeItem('user');
  };

  getTheUser = userObj => {
    this.setState(
      {
        loggedInUser: userObj,
        message: `Hello, ${userObj.username}!`,
        createdLogToday: userObj.createdToday
      },
      () => {
        console.log(this.state);
      }
    );
  };

  render() {
    // console.log(this.state.user);
    return (
      <Router>
        <div className='App'>
          <Navbar
            info={this.state}
            logout={this.logout}
            history={this.history}
          />
          {this.state.errMessage}
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
                createdLogToday={this.state.createdLogToday}
                setError={this.setError}
              />
            )}
          />

          {/* <Route exact path='/view' component={View} /> */}
          <Route
            path='/view'
            render={props => (
              <View {...props} createdToday={this.state.createdLogToday} />
            )}
          />
          <Route
            path='/view-profile/:id'
            render={props => <ViewProfile {...props} setUser={this.setUser} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
