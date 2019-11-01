import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import AuthService from './auth/auth-service';
import React from 'react';

export default function Navbar(props) {
  logout = () => {
    this.service.logout().then(results => {
      this.props.logout();
      this.setState({
        goHome: true
      });
    });
  };

  return (
    <div>
      <div className='navbar'>
        <div>
          <Link to='/'>Home</Link>
        </div>
        {!this.props.info.loggedInUser && (
          <div>
            <Link to='/login'>Login</Link>
          </div>
        )}
        {!this.props.info.loggedInUser && (
          <div>
            <Link to='/signup'>Signup</Link>
          </div>
        )}
        {this.props.info.loggedInUser && (
          <div>
            <Link to='/profile'>Profile</Link>
          </div>
        )}
        {this.props.info.loggedInUser && (
          <div>
            <Link to='/create'>Create</Link>
          </div>
        )}
        <div>
          <Link to='/view'>View</Link>
        </div>
        {this.props.info.loggedInUser && (
          <Link to='/' onClick={this.logout}>
            Logout
          </Link>
        )}
      </div>
      <h2>{this.props.info.message}</h2>
    </div>
  );
}
