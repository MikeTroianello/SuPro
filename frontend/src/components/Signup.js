import React, { Component } from 'react';
import AuthService from './auth/auth-service';

export default class Signup extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: ''
  };

  service = new AuthService();

  handleChange = e => {
    e.preventDefault();
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => console.log(this.state)
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log('THE STATE:', this.state);
    const { username, password, gender } = this.state;
    if (!username) {
      console.log('NO username');
      this.setState({
        message: `You must include a username`
      });
    } else if (!password) {
      console.log('NO PASSWORD');
      this.setState({
        message: `You must include a password`
      });
    } else if (!gender) {
      console.log('NO GENDER');
      this.setState({
        message: `You must include a gender`
      });
    } else {
      const state = this.state;
      this.service.signup(state).then(results => {
        this.props.logIt(results);
      });
    }
  };

  render() {
    return (
      <div>
        <div className='signup'>
          <span className='signup-header'>This is the Signup Page</span>
          <form className='signup-form' onSubmit={this.handleSubmit}>
            <div className='form-pieces'>
              <div className='form-piece'>
                <label htmlFor='name'>Your Username:</label>
                <input
                  name='username'
                  maxLength='20'
                  placeholder='Your name...'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='password'>Password:</label>
                <input
                  name='password'
                  type='password'
                  placeholder='Your password...'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='email'>Email: (optional)</label>
                <input
                  name='email'
                  type='email'
                  placeholder='Your email...'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='phone'>Phone: (optional)</label>
                <input
                  name='phone'
                  type='number'
                  placeholder='867-5309'
                  onChange={this.handleChange}
                />
              </div>
              <div className='form-piece'>
                <label htmlFor='gender'>What is your gender?</label>
                <select name='gender' onChange={this.handleChange}>
                  <option selected disabled>
                    Choose:
                  </option>
                  <option value='male'>Male</option>
                  <option value='female'>Female</option>
                  <option value='non-binary'>Non-binary</option>
                </select>
              </div>
            </div>
            <div className='signup-button'>
              <button className=''>Submit</button>
            </div>
          </form>
          <b className='signup-message'>{this.state.message}</b>
        </div>
        <div className='switch-button'>
          {/* <button className=''>Click to Create an Account</button> */}
        </div>
      </div>
    );
  }
}
