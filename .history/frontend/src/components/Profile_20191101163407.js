import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';

export default class Profile extends Component {
  state = {
    user: null,
    logs: null,
    moodAvg: [],
    mood: 0,
    thing: <div className='log'>HELLO</div>
  };

  service = new AuthService();

  componentDidMount() {
    this.service
      .profile()
      .then(results => {
        console.log('RESULTS', results);
        if (results.userLogs.length < 1) {
          return (
            <div>
              No one has created a log today.{' '}
              <Link to='/create'>Why not be the first?</Link>
            </div>
          );
        } else {
          let theLogs = results.userLogs.map((log, key) => {
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
          // return theLogs;
          this.setState(
            {
              logs: theLogs
            },
            () => {
              console.log('THE LOGS:', this.state.logs);
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  //OLD WAY
  // componentDidMount() {
  //   this.service
  //     .profile()
  //     .then(results => {
  //       console.log('RESULTS', results);
  //       this.setState({
  //         logs: results.userLogs,
  //         mood: results.mood
  //       });
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  // showLogs = () => {
  //   if (this.state.logs.length < 1) {
  //     return (
  //       <div>
  //         No one has created a log today.{' '}
  //         <Link to='/create'>Why not be the first?</Link>
  //       </div>
  //     );
  //   } else {
  //     let theLogs = this.state.logs.map((log, key) => {
  //       this.state.moodAvg.push(log.mood);
  //       return (
  //         <div key={key} className='log'>
  //           {/* <h1>User's name: {lo}</h1> */}
  //           <h2>Weather: {log.weatherType}</h2>
  //           <h2>
  //             Location: {log.county}, {log.state}
  //           </h2>
  //           <h3>Mood: {log.mood}</h3>
  //           <h3>Productivity: {log.productivity}</h3>
  //           <h3>Log: {log.journal}</h3>
  //         </div>
  //       );
  //     });
  //     return theLogs;
  //   }
  // };

  render() {
    return (
      <div>
        {/* This is {this.props.user.username}'s profile page: It will show previous */}
        This is the profile page: It will show previous sunlogs, perhaps an
        overall trend, and your average level of happiness
        {this.state.thing}
        <h2>Overall Happiness: {this.state.mood}</h2>
        <br></br>
        {/* {this.state.logs && this.showLogs()} */}
        {this.state.logs}
      </div>
    );
  }
}
