import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        Home Page
        <button onClick={this.checkIfLoggedIn}></button>
      </div>
    );
  }
}
