import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Signup extends Component {
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
    console.log(this.state);
    axios.post('http://localhost:5000/signup', this.state).then(results => {
      this.setState({
        user: results.data.username
      });
    });
  };

  render() {
    if (this.state.user) {
      return <Redirect to='/' />;
    }
    return (
      <div>
        This is the Signup Page
        <form onSubmit={this.handleSubmit}>
          <div className='form-piece'>
            <label htmlFor='name'>Enter Your Name:</label>
            <input
              name='username'
              placeholder='Your name...'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-piece'>
            <label htmlFor='password'>Enter Your password:</label>
            <input
              name='password'
              placeholder='Your password...'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-piece'>
            <label htmlFor='gender'>What is your gender?</label>
            <p>look this up later when you have internet</p>
            {/* <input>male, female, nonbinary</input> */}
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
