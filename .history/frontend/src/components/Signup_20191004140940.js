import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    return (
      <div>
        This is the Signup Page
        <form onSubmit={this.handleSubmit}>
          <label for='name'>Enter Your Name:</label>
          <input name='name' placeholder='Your name...' />
          <label for='password'>Enter Your password:</label>
          <input name='password' placeholder='Your password...' />
          <label for='gender'>What is your gender?</label>
          <list>male, female, nonbinary</list>
        </form>
      </div>
    );
  }
}
