import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class Logout extends Component {
  service = new AuthService();

  componentDidMount() {
    this.service.logout().then(results => {
      this.props.logout();
      this.props.history.push('/');
    });
  }

  render() {
    console.log(this.props.user);
    return <div>Have a great day!</div>;
  }
}
