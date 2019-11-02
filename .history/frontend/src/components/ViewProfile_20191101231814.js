import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class ViewProfile extends Component {
  state = {
    user: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    notToday: false
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
      .profile()
      .then(results => {
        console.log('RESULTS', results);
        if (results.length < 1) {
          this.setState({
            logs: <div>They haven't created any logs...</div>
          });
        } else {
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          let moodArr = [];
          let theLogs = results.map((log, key) => {
            moodArr.push(log.mood);
            if (log.weatherIcon) {
              weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
                0,
                -1
              )}d@2x.png`;
              console.log('WEATHER STRING', weatherString);
            } else var weatherString = '';
            return (
              <div key={key} className='log'>
                {/* <h1>User's name: {lo}</h1> */}
                <h2>
                  Weather: {log.weatherType}
                  <span>
                    <img src={weatherString} />
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
          let mood =
            Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;
          console.log('MOOD', mood);
          // return theLogs;
          this.setState(
            {
              logs: theLogs,
              mood: mood
            },
            () => {
              console.log('THE LOGS:', this.state.logs);
              console.log('MOOD:', this.state.mood);
            }
          );
          let dailyLog = results.filter(log => {
            return log.dayOfYear == day && log.year == year;
          });
          console.log('DAILY LOG:', dailyLog);
          if (dailyLog.length < 1) {
            this.setState({
              notToday: true
            });
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return <div>WE MADE IT</div>;
  }
}
