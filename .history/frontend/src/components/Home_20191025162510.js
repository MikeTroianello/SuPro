import React, { Component } from 'react';
import axios from 'axios';
import AuthService from './auth/auth-service';

export default class Home extends Component {
  constructor(props){
    super(props)
    this.service = new AuthService()
  }


  checkIfLoggedIn = () => {
    this.service.loggedin()
      .then(results=>{
        console.log(results)
      })
    )
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
      </div>
    );
  }
}
