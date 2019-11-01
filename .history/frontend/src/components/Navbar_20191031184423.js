import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';

import React, { Component } from 'react';

export default class Navbar extends Component {
  service = new AuthService();

  logout = () => {
    service.logout().then(results => {
      props.logout();
      console.log('HISTPRY', props);
      console.log('HISTORY', props.history);
      // props.history.push('/');
    });
  };

  //props.logout
  render() {
    return (
      <div>
        <div className='navbar'>
          <div>
            <Link to='/'>Home</Link>
          </div>
          {!props.info.loggedInUser && (
            <div>
              <Link to='/login'>Login</Link>
            </div>
          )}
          {!props.info.loggedInUser && (
            <div>
              <Link to='/signup'>Signup</Link>
            </div>
          )}
          {props.info.loggedInUser && (
            <div>
              <Link to='/profile'>Profile</Link>
            </div>
          )}
          {props.info.loggedInUser && (
            <div>
              <Link to='/create'>Create</Link>
            </div>
          )}
          <div>
            <Link to='/view'>View</Link>
          </div>
          {props.info.loggedInUser && (
            <Link to='/' onClick={logout}>
              Logout
            </Link>
          )}
        </div>
        <h2>{props.info.message}</h2>
      </div>
    );
  }
}