import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar(props) {
  console.log('NAVBAR CONSOLE LOG', props.info);
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
            <Link to='/create'>Create</Link>
          </div>
        )}
        <div>
          <Link to='/view'>View</Link>
        </div>
        {props.info.loggedInUser && (
          <Link to='/' onClick={props.logout}>
            Logout
          </Link>
        )}
      </div>
      <h2>{props.info.message}</h2>
    </div>
  );
}
