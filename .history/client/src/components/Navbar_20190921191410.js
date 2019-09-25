import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render(props) {
    return;
    <div>
      <Link to='/'>Home</Link>
      <Link to='/'>Login</Link>
      <Link to='/'>Sign Up</Link>
      <Link to='/'>Create</Link>
      <Link to='/'>Something</Link>
    </div>;
  }
}
