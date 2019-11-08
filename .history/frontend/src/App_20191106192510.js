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
    createdLogToday: false
  };

  service = new AuthService();

  componentDidMount() {
    if (!this.state.loggedInUser) {
      this.service
        .loggedin()
        .then(response => {
          // console.log('RESPONSE:', response);
          this.setState({
            loggedInUser: response,
            message: `Hello, ${response.username}!`
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

  createdLogToday = () => {
    this.setState({
      createdLogToday: true
    });
  };

  // login = storedUser => {
  //   console.log('LOGIN');
  //   axios
  //     .get(`http://localhost:5000/login`, {
  //       theUser: storedUser,
  //       withCredentials: true
  //     })
  //     .then(result => {
  //       console.log(result.data);
  //       // if (result.data.user) {
  //       this.setState(
  //         {
  //           user: result.data.user || null,
  //           message: result.data.message
  //         },
  //         () => {
  //           console.log('-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-', this.state);
  //         }
  //       );
  //     });
  // };

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
        message: `Hello, ${userObj.username}!`
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
            createdLogToday={this.state.createdLogToday}
          />
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
              <Create {...props} createdLogToday={this.state.createdLogToday} />
            )}
          />
          <Route exact path='/view' render={props => <View {...props} />} />
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