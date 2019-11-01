import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  state = {
    user: null,
    logs: null
  };

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
      return this.state.logs.map((log, key) => {
        return (
          <div key={key}>
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
    }
  };

  render() {
    return (
      <div>
        {/* This is {this.props.user.username}'s profile page: It will show previous */}
        This is the profile page: It will show previous sunlogs, perhaps an
        overall trend, and your average level of happiness
      </div>
    );
  }
}
