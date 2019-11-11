import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.service = new AuthService();
  // }

  state = {
    date: new Date(),
    testArr: ['a', 'be', 's', 'w'],
    message: 'This is the Home Page',
    err: false
  };

  service = new AuthService();

  checkIfLoggedIn = () => {
    this.service
      .loggedin()
      .then(results => {
        console.log(results);
      })
      .catch(error => console.log(error));
  };

  render() {
    console.log(this.props.err);

    if (this.props.err && !this.state.err) {
      this.setState({
        message: 'You already created a log today!',
        err: true
      });
    }
    return (
      <div>
        <h1>{this.state.message}</h1>
        Home Page
        <button onClick={this.checkIfLoggedIn}>Check if logged in</button>
      </div>
    );
  }
}