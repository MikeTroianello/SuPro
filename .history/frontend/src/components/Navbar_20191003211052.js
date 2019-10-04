import React from 'react';

export default function Navbar() {
  return (
    <div>
      <ol>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
        <li>
          <Link to='/signup'>Signup</Link>
        </li>
        <li>
          <Link to='/create'>Create</Link>
        </li>
        <li>
          <Link to='/view'>View</Link>
        </li>
      </ol>
    </div>
  );
}
