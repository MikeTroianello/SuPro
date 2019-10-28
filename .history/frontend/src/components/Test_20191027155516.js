import React, { Component } from 'react';

export default class Test extends Component {
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
        <button onClick={this.checkIfLoggedIn}>
          Check if logged in Without CONSTRUCTOR
        </button>
      </div>
    );
  }
}
