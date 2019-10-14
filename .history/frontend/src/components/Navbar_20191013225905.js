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
        <div>
          <Link to='/login'>Login</Link>
        </div>
        <div>
          <Link to='/signup'>Signup</Link>
        </div>
        <div>
          <Link to='/create'>Create</Link>
        </div>
        <div>
          <Link to='/view'>View</Link>
        </div>
      </div>
      <h2>{props.info.message}</h2>
    </div>
  );
}
