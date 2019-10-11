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
    axios.post('http://localhost:5000/login', this.state).then(results => {
      console.log(results.data);
      this.setState(
        {
          user: results.data.username
        },
        () => {
          console.log(this.state);
        }
      );
      localStorage.setItem('user', JSON.stringify(results.data));
      this.props.loggedIn();
      this.props.history.push('/');
    });
  };

  render() {
    console.log('=-=-=-=-==-=-=-', this.props.info);
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
