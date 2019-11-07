import React, { Component } from 'react';
import Calendar from 'react-calendar';
import AuthService from './auth/auth-service';

export default class Home extends Component {
  // constructor(props) {
  //   super(props);
  //   this.service = new AuthService();
  // }

  service = new AuthService();

  checkIfLoggedIn = () => {
    this.service
      .loggedin()
      .then(results => {
        console.log(results);
      })
      .catch(error => console.log(error));
  };
  // checkIfLoggedIn = () => {
  //   axios.get('http://localhost:5000/isLoggedIn').then(results => {
  //     console.log('this is what came back:', results);
  //   });
  // };

  render() {
    return (
      <div>
        Home Page
        <button onClick={this.checkIfLoggedIn}>Check if logged in</button>
        <div>
          <Calendar />
        </div>
      </div>
    );
  }
}
