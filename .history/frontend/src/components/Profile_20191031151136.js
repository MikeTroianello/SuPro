import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  state = {
    user: null,
    logs: null,
    moodAvg: [],
    mood: 0
  };

  reducer = (accumulator, currentValue) => accumulator + currentValue;

  service = new AuthService();

  componentDidMount() {
    this.service
      .profile()
      .then(results => {
        console.log('RESULTS', results);
        this.setState({
          logs: results
        });
      })
      .catch(err => {
        console.log(err);
      });
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
      let theLogs = this.state.logs.map((log, key) => {
        this.state.moodAvg.push(log.mood);
        return (
          <div key={key} className='log'>
            {/* <h1>User's name: {lo}</h1> */}
            <h2>Weather: {log.weatherType}</h2>
            <h2>
              Location: {log.county}, {log.state}
            </h2>
            <h3>Mood: {log.mood}</h3>
            <h3>Productivity: {log.productivity}</h3>
            <h3>Log: {log.journal}</h3>
          </div>
        );
      });
      console.log('-=-=-=-=-', this.state.moodAvg);
      console.log(
        this.state.moodAvg.reduce(this.reducer) / this.state.moodAvg.length
      );
      return theLogs;
    }
  };

  render() {
    return (
      <div>
        {/* This is {this.props.user.username}'s profile page: It will show previous */}
        This is the profile page: It will show previous sunlogs, perhaps an
        overall trend, and your average level of happiness
        <h2>Overall Happiness:</h2>
        {this.state.moodAvg.length > 0 &&
          this.state.moodAvg.reduce(this.reducer) / this.state.moodAvg.length}
        <br></br>
        {this.state.logs && this.showLogs()}
      </div>
    );
  }
}