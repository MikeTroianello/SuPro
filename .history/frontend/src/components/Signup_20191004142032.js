import React, { Component } from 'react';

export default class Signup extends Component {
  render() {
    handleSubmit = () => {
      console.log(this);
    };

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
            <p>look this up later when you have internet</p>
            {/* <input>male, female, nonbinary</input> */}
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
