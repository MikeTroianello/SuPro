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
    this.service
      .seeUser(this.props.match.params.id)
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
