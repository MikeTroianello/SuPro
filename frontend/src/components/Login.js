import React, { Component } from 'react';
import AuthService from '../components/auth/auth-service';

export default class Login extends Component {
  state = {
    message: null,
    user: '',
    username: '',
    password: ''
  };
  service = new AuthService();

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
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
    } else {
      this.service
        .login(username, password)
        .then(results => {
          this.setState({ username: '', password: '' });

          this.props.getUser(results);
          localStorage.setItem('user', JSON.stringify(results));

          this.props.history.push('/');
        })
        .catch(error => {
          console.log(error);
          this.setState({
            message: `Incorrect Username or Password`
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div className='signup'>
          <span className='signup-header'>This is the Login Page</span>
          <form onSubmit={this.handleSubmit}>
            <div className='form-piece login-form-piece'>
              <label htmlFor='username'>Username:</label>
              <input
                type='text'
                style={{ 'font-size': '1em', width: '55%' }}
                name='username'
                placeholder='Your name...'
                onChange={this.handleChange}
              />
            </div>
            <div className='form-piece login-form-piece'>
              <label htmlFor='password'>Password:</label>
              <input
                name='password'
                style={{ 'font-size': '1em', width: '55%' }}
                placeholder='******'
                type='password'
                onChange={this.handleChange}
              />
            </div>
            <div className='login-button'>
              <button className=''>Submit</button>
            </div>
          </form>
          <b className='signup-message'>{this.state.message}</b>
        </div>
        <div className='switch-button'>
          <button className=''>Click to Create an Account</button>
        </div>
      </div>
    );
  }
}
