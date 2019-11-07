import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class ViewProfile extends Component {
  state = {
    user: null,
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
        console.log('RESULTS', results);
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
                {/* <h1>User's name: {lo}</h1> */}
                <h2>
                  Weather: {log.weatherType}
                  <span>
                    <img src={weatherString} alt='CHANGE THIS LATER' />
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
              mood: mood,
              name: name
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
    return (
      <div>
        This is {this.state.name}'s page
        <h2>
          {this.state.name}'s Overall Happiness: {this.state.mood}
        </h2>
        <br></br>
        {/* {this.state.logs && this.showLogs()} */}
        {this.state.logs}
      </div>
    );
  }
}
