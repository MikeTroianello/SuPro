import React, { Component } from 'react';

export default class Test extends Component {
  checkIfLoggedIn = () => {
    this.service
      .loggedin()
      .then(results => {
        console.log(results);
      })
      .catch(error => console.log(error));
  };

  render() {
    return <div></div>;
  }
}
