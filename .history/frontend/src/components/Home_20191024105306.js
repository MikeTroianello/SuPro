import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {
  checkIfLoggedIn = () => {
    axios.get('http://localhost:5000/isLoggedIn').then(results => {
      console.log('this is what came back:', results);
    });
  };

  render() {
    return (
      <div>
        Home Page
        <button onClick={this.checkIfLoggedIn}></button>
      </div>
    );
  }
}
