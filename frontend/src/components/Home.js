import React, { Component, Fragment } from 'react';
import AuthService from './auth/auth-service';

import Login from './account/Login';
import Signup from './account/Signup';

import Log from './view-logs/Log';

// import video from './video/Pexels Videos 1893623.mp4';

import '../css/homepage.css';

export default class Home extends Component {
  state = {
    date: new Date(),
    message: 'This is the Home Page',
    err: false,
    signup: false,
    testLog: {
      id: '1335',
      genderIcon: 'female',
      weatherType: 'Clear',
      weatherIcon: '01n',
      hideCreator: false,
      state: 'Washington',
      county: 'King',
      mood: '4',
      productivity: '3',
      journal:
        'Overall, today felt like a good day. I was able to get most of what I wanted done. Enjoyed the bright skies!',
      privateJournal: false,
      creatorId: {
        username: 'Jane Doe',
        gender: 'female',
        _id: null
      },
      demo: true
    }
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

  backToTop = () => {
    console.log('SCROLLING TO TOP');
    window.scrollTo(0, 0);
  };

  render() {
    let toggle;
    let thing;
    this.state.signup
      ? (toggle = 'Go back to Login')
      : (toggle = 'New? Create an Account Now!');
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
            <p>How much does weather affect your life?</p>
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
        <div className='homepage-sad'>
          <h2>Did you know:</h2>
          <h4>
            Over 3 MILLION Americans suffer from Seasonal Affective Disorder, or
            SAD, every year
          </h4>
          <p>
            SAD can affect nearly every aspect of a person's life, from work, to
            relationships, to personal health. It was this reason that Sunlogs
            was created
          </p>
        </div>
        <div className='homepage-sunlog'>
          <div className='sunlog-description'>
            <h2>What is Sunlog?</h2>
            <p>
              Sunlog is a way to record your daily mood and how productive you
              thought you were, as well as any feelings you might want to jot
              down. These logs are then tied to the weather in your county, and
              will compare correlate mood respectively
            </p>
          </div>
          <div className='sunlog-example'>
            <Log log={this.state.testLog} />
            <h4>(Your logs can be as private as you want them to be)</h4>
          </div>
        </div>
        <div>
          <h1>SOMETHING ELSE WILL GO HERE</h1>
          <div className='footer'>
            <div>
              <button onClick={this.backToTop}>Back to Top</button>
            </div>
            <div className='footer-contact'>
              <p>Created by Mike Troianello</p>
              <p>Have any questions/ concerns about the website?</p>
              <p>
                Contact me at{' '}
                <a href='mailto:mike@troianello.co'> mike@troianello.co</a>
              </p>
              <p>
                Visit my personal website{' '}
                <a
                  href='http://troianello.co'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  troianello.co
                </a>
              </p>
            </div>
            <div className='footer-logo'>
              <h1 className='mt-logo'>Mt</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
