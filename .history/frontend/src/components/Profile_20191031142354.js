import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './auth/auth-service';

export default class Profile extends Component {
  state = {
    user: null,
    logs: null
  };

  service = new AuthService();

  componentDidMount() {
    this.service
      .profile()
      .then(results => {
        console.log('RESULTS', results);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        {/* This is {this.props.user.username}'s profile page: It will show previous */}
        This is the profile page: It will show previous sunlogs, perhaps an
        overall trend, and your average level of happiness
      </div>
    );
  }
}
