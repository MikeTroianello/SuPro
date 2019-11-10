import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  return (
    <div>
      <div className='navbar'>
        <div>
          <Link to='/'>Home</Link>
        </div>
        {!props.info.loggedInUser && (
          <div>
            <Link to='/login'>Login</Link>
          </div>
        )}
        {!props.info.loggedInUser && (
          <div>
            <Link to='/signup'>Signup</Link>
          </div>
        )}
        {props.info.loggedInUser && (
          <div>
            <Link to='/profile'>Profile</Link>
          </div>
        )}
        {props.info.loggedInUser && !props.info.createdLogToday && (
          <div>
            <Link to='/create'>Create</Link>
          </div>
        )}
        <div>
          <Link to='/view'>View</Link>
        </div>
        {props.info.loggedInUser && <Link to='/logout'>Logout</Link>}
      </div>
      <h2>{props.info.message}</h2>
    </div>
  );
}
