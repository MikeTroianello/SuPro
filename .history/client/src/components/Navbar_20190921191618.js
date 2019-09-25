import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {
  render(props) {
    return;
    <div>
      <Link to='/'>Home</Link>
      {!props.loggedIn && <Link to='/'>Sign Up</Link>}
      {!props.loggedIn && <Link to='/'>Log In</Link>}
      {props.loggedIn && <Link to='/'>Create</Link>}
      <Link to='/'>See Posts</Link>
    </div>;
  }
}
