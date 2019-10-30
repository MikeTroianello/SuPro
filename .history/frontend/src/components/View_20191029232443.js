import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './auth/auth-service';

export default class View extends Component {
  state = {
    logs: null
  };

  service = new AuthService();

  componentDidMount() {
    let today = new Date();
    axios.get(`http://localhost:5000/${today}`);
  }

  render() {
    return <div>This is the view page. It may need to be expanded.</div>;
  }
}
