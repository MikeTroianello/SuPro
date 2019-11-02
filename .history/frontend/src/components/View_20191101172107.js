import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';

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
    if (this.state.logs.length < 1) {
      return (
        <div>
          No one has created a log today.{' '}
          <Link to='/create'>Why not be the first?</Link>
        </div>
      );
    } else {
      return this.state.logs.map((log, key) => {
        if (log.weatherIcon)
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon}@2x.png`;
        else var weatherString = '';
        return (
          <div className='log' key={key}>
            {/* <h1>User's name: {lo}</h1> */}
            <h2>
              Weather: {log.weatherType}
              <span>
                <i src={weatherString} />
              </span>
            </h2>
            <h2>
              Location: {log.county}, {log.state}
            </h2>
            <h3>Mood: {log.mood}</h3>
            <h3>Productivity: {log.productivity}</h3>
            <h3>Log: {log.journal}</h3>
          </div>
        );
      });
    }
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
