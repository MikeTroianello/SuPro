import React, { Component } from 'react';
import axios from 'axios';
import AuthService from '../components/auth/auth-service';

export default class Login extends Component {
  state = {
    user: '',
    username: '',
    password: ''
  };

  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    axios
    const username = this.state.username;
    const password = this.state.password;
    this.service
      .login(username, password)
      .then(response => {
        this.setState({ username: '', password: '' });
        // this.props.getUser(response);
        localStorage.setItem('user', JSON.stringify(results.data));
        this.props.setUser();
        this.props.history.push('/');
      })
      .catch(error => console.log(error));
        // );
      });
  };

  render() {
    return (
      <div>
        This is the Login Page
        <form onSubmit={this.handleSubmit}>
          <div className='form-piece'>
            <label htmlFor='username'>Username:</label>
            <input
              name='username'
              placeholder='Your name...'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-piece'>
            <label htmlFor='password'>Password:</label>
            <input
              name='password'
              placeholder='******'
              type='password'
              onChange={this.handleChange}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
