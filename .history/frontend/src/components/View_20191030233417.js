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
      today -
      start +
      (start.getTimezoneOffset() - today.getTimezoneOffset()) * 60 * 1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);
    let a = today.toString().split(' ');
    let year = a[3];
    console.log('the year is ', year);

    this.service
      .getDate(year, day)
      .then(results => {
        console.log('RESULTS', results);
        this.setState({
          logs: results
        });
      })
      .catch(error => console.log(error));
  }

  showLogs = () => {
    return this.state.logs.map((log, key) => {
      return (
        <div key={key}>
          <h3>{log.journal}</h3>
        </div>
      );
    });
    // let theLogs = this.state.logs.map(log => {
    //   return <h3>{log.journal}</h3>;
    // });
    // return theLogs;
  };

  render() {
    return (
      <div>
        <h1>PRELIMINARY: THESE ARE TODAYS LOGS:</h1>
        {this.state.logs && this.showLogs()}
      </div>
    );
  }
}
