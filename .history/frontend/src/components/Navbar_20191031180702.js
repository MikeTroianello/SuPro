import React from 'react';
import { Link } from 'react-router-dom';
import AuthService from './auth/auth-service';

export default function Navbar(props) {
  console.log('NAVBAR CONSOLE LOG', props.info);

  let service = new AuthService();

  let logout = () => {
    service.logout().then(results => {
      props.logout();
      props.history.push('/');
    });
  };

  //props.logout

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
        {props.info.loggedInUser && (
          <div>
            <Link to='/create'>Create</Link>
          </div>
        )}
        <div>
          <Link to='/view'>View</Link>
        </div>
        {props.info.loggedInUser && (
          <Link to='/' onClick={this.logout}>
            Logout
          </Link>
        )}
      </div>
      <h2>{props.info.message}</h2>
    </div>
  );
}
