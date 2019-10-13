import React, { Component } from 'react';
import axios from 'axios';

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
      .post(
        'http://localhost:5000/login',
        { username: this.state.username },
        { password: this.state.password },
        (withCredentials: true)
      )
      .then(results => {
        console.log(results);
        this.setState(
          {
            user: results.data.username
          },
          () => {
            console.log(this.state);
          }
        );
        localStorage.setItem('user', JSON.stringify(results.data.username));
        this.props.login();
        this.props.history.push('/');
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
