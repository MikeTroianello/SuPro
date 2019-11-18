import React, { Component } from 'react';
import AuthService from './auth/auth-service';

import Login from './account/Login';
import Signup from './account/Signup';

import video from './video/Pexels Videos 1893623.mp4';

import '../css/homepage.css';

export default class Home extends Component {
  state = {
    date: new Date(),
    message: 'This is the Home Page',
    err: false,
    signup: false
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

  logIt = results => {
    console.log('MOVING TO PROFILE');
    this.props.getUser(results);
    this.props.history.push('/profile');
  };

  toggle = () => {
    this.setState(prevState => ({
      signup: !prevState.signup
    }));
  };

  flip = () => {};

  render() {
    let toggle;
    let thing;
    this.state.signup
      ? (toggle = 'Go back to Login')
      : (toggle = 'Create an Account');
    this.state.signup ? (thing = 'card flipped') : (thing = 'card');

    console.log('THING', thing);
    return (
      <div>
        {/* <video autoplay muted loop id='myVideo'>
          <source src={video} type='video/mp4' />
        </video> */}
        {/* <h1>{this.state.message}</h1> */}
        <div className='homepage-top'>
          <div className='homepage-greet'>
            <h1>SUNLOGS</h1>
            <p>How much does the weather affect your life?</p>
          </div>
          <div className='signup-login-container'>
            <section class='container'>
              <div class={thing}>
                <div class='front card-div'>
                  {' '}
                  <Login logIt={this.logIt} />
                </div>
                <div class='back card-div'>
                  <Signup logIt={this.logIt} />
                </div>
              </div>
            </section>
            <button className='create-button' onClick={this.toggle}>
              {toggle}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
