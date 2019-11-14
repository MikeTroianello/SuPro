import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';
import WeatherAudit from './weather/WeatherAudit';

export default class Profile extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    notToday: false,
    block: false
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

    let a = today.toString().split(' ');
    let year = a[3];

    this.service
      .profile()
      .then(results => {
        console.log('-=-=-=-=-=-=-=-=-=-', results);
        if (results.length < 1) {
          this.setState(
            {
              logs: (
                <div>
                  You haven't created a log yet!{' '}
                  <Link to='/create'>Make one now!</Link>
                </div>
              ),
              block: true
            },
            () => console.log('LOOKING FOR THIS!!!', this.state.logs.length)
          );
        } else {
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          let moodArr = [];
          let theLogs = results.map((log, key) => {
            moodArr.push(log.mood);
            let weatherString;
            if (log.weatherIcon) {
              weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
                0,
                -1
              )}d@2x.png`;
            } else weatherString = '';
            return (
              <div key={key} className='log'>
                <div className='profile-log-head'>
                  <div>
                    <h2>
                      {log.county}, {log.state}
                    </h2>
                  </div>
                  <div className='weather-box weather-box-profile'>
                    <span>
                      <img
                        className='weather-icon'
                        src={weatherString}
                        alt={log.weatherType}
                      />
                    </span>
                    <p> {log.weatherType}</p>
                  </div>
                </div>

                <div className='mood-and-productivity'>
                  <h3>
                    Mood: <p>{log.mood}</p>
                  </h3>
                  <h3>
                    Productivity: <p>{log.productivity}</p>
                  </h3>
                </div>
                <h3>Log: {log.journal}</h3>
                {log.hideCreator && (
                  <i>You have hidden your name for this log</i>
                )}
                <br />
                {log.privateJournal && (
                  <i>You have hidden this journal from public viewing</i>
                )}
              </div>
            );
          });
          let mood =
            Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

          this.setState({
            rawLogs: results,
            logs: theLogs,
            mood: mood
          });
          let dailyLog = results.filter(log => {
            return log.dayOfYear === day && log.year === Number(year);
          });
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
    return (
      <div>
        <h1>Your Profile Page</h1>
        {this.state.notToday && (
          <h1>
            <b>
              You have not created a mood log today!{' '}
              <Link to='/create'>Create one now!</Link>
            </b>
          </h1>
        )}
        <h2>Overall Happiness: {this.state.mood}</h2>
        {this.state.logs && !this.state.block && (
          <WeatherAudit logs={this.state.rawLogs} />
        )}
        <br></br>
        <div className='log-box'>{this.state.logs}</div>
      </div>
    );
  }
}
