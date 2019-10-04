import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div>
        This is the Signup Page
        <form onSubmit={this.handleSubmit}>
          <div className='form-piece'>
            <label for='name'>Enter Your Name:</label>
            <input name='name' placeholder='Your name...' />
          </div>
          <div className='form-piece'>
            <label for='password'>Enter Your password:</label>
            <input name='password' placeholder='Your password...' />
          </div>
          <div className='form-piece'>
            <label for='gender'>What is your gender?</label>
            <input>male, female, nonbinary</input>
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
