import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class Home extends Component {
  state = {
    date: new Date(),
    message: 'This is the Home Page',
    err: false
  };

  service = new AuthService();

  componentDidMount() {
    if (this.props.err && !this.state.err) {
      this.setState({
        message: 'You already created a log today!',
        err: true
      });
    }
    this.props.setError(null);

    return <div>this.state.message</div>;
  }

  checkIfLoggedIn = () => {
    this.service
      .loggedin()
      .then(results => {})
      .catch(error => console.log(error));
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        Home Page
        <button onClick={this.checkIfLoggedIn}>Check if logged in</button>
      </div>
    );
  }
}
