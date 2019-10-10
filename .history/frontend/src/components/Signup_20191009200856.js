import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Signup extends Component {
  state = {
    user: '',
    username: '',
    password: '',
    email: '',
    phone: '',
    gender: ''
  };

  handleChange = e => {
    e.preventDefault();
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
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
              type='password'
              placeholder='Your password...'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-piece'>
            <label htmlFor='email'>Enter Your email: (optional)</label>
            <input
              name='email'
              type='email'
              placeholder='Your email...'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-piece'>
            <label htmlFor='phone'>Enter Your phone: (optional)</label>
            <input
              name='phone'
              type='number'
              placeholder='867-5309'
              onChange={this.handleChange}
            />
          </div>
          <div className='form-piece'>
            <label htmlFor='gender'>What is your gender?</label>
            <select onChange={this.handleChange}>
              <option disabled selected>
                Choose:
              </option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
              <option value='non-binary'>Non-binary</option>
            </select>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
