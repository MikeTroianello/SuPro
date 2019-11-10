import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import WeatherAudit from './weather/WeatherAudit';

export default class ViewProfile extends Component {
  state = {
    user: null,
    rawLogs: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    name: null
  };

  service = new AuthService();

  componentDidMount() {
    this.service
      .seeUser(this.props.match.params.id)
      .then(results => {
        if (results.length < 1) {
          this.setState({
            logs: <div>They haven't created any logs...</div>
          });
        } else {
          const reducer = (accumulator, currentValue) =>
            accumulator + currentValue;
          let moodArr = [];
          let name;
          let theLogs = results.map((log, key) => {
            let weatherString;
            if (!name) name = log.creatorId.username;
            moodArr.push(log.mood);
            if (log.weatherIcon) {
              weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
                0,
                -1
              )}d@2x.png`;
              console.log('WEATHER STRING', weatherString);
            } else weatherString = '';
            return (
              <div key={key} className='log'>
                <h2>
                  Weather: {log.weatherType}
                  <span>
                    <img
                      className='weather-icon'
                      src={weatherString}
                      alt={log.weatherType}
                    />
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

          this.setState({
            rawLogs: results,
            logs: theLogs,
            mood: mood,
            name: name
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        This is {this.state.name}'s page
        <h2>
          {this.state.name}'s Overall Happiness: {this.state.mood}
        </h2>
        {this.state.logs && <WeatherAudit logs={this.state.rawLogs} />}
        <br></br>
        {this.state.logs}
      </div>
    );
  }
}
