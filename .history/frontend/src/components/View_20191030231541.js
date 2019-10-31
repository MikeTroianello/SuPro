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
    var start = new Date(today.getFullYear(), 0, 0);
    var diff =
      now -
      start +
      (start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);
    return day;
  }

  render() {
    return (
      <div>
        <h1>PRELIMINARY: THESE ARE TODAYS LOGS:</h1>
      </div>
    );
  }
}
