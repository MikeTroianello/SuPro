import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.service = new AuthService();
  // }

  state = {
    date: new Date()
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
    return (
      <div>
        Home Page
        <button onClick={this.checkIfLoggedIn}>Check if logged in</button>
      </div>
    );
  }
}
