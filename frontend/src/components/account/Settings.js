import React, { Component } from 'react';

import AuthService from '../auth/auth-service';

export default class Settings extends Component {
  state = {
    message: null,
    hideProfile: false,
    privateJournalDefault: false,
    hideCreatorDefault: false,
    oldPhone: null,
    phone: null,
    oldEmail: null,
    email: null,
    oldPass: null,
    newPass: null,
    confirmDelete: null,
    deletePassword: null,
    id: null
  };

  service = new AuthService();

  componentDidMount() {
    console.log(this.props.loggedInUser);
    if (this.props.loggedInUser) {
      const {
        email,
        hideCreatorDefault,
        hideProfile,
        phone,
        privateJournalDefault,
        id
      } = this.props.loggedInUser;

      this.setState({
        hideProfile: hideProfile,
        privateJournalDefault: privateJournalDefault,
        hideCreatorDefault: hideCreatorDefault,
        oldPhone: phone,
        oldEmail: email,
        id: id
      });
    } else {
      this.service.loggedin().then(response => {
        this.setState({
          hideProfile: response.hideProfile,
          privateJournalDefault: response.privateJournalDefault,
          hideCreatorDefault: response.hideCreatorDefault,
          oldPhone: response.phone,
          oldEmail: response.email,
          id: response.id
        });
      });
    }
  }

  toggle = e => {
    let statePiece = e.target.name;
    this.setState(prevState => ({
      [statePiece]: !prevState[statePiece]
    }));
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  changeInfo = () => {
    let state = this.state;
    this.service.changeInfo(state).then(results => {
      console.log(results.message);
      this.props.isLoggedIn(results);
      this.props.history.push('/profile');
    });
  };

  changePass = () => {
    this.service.changePass(this.state).then(results => {
      console.log(results.message);
      this.props.isLoggedIn(results);
      this.props.history.push('/');
    });
  };

  deleteUser = () => {
    this.service.deleteUser(this.state.confirmDelete).then(results => {
      console.log(results.message);
      this.props.history.push('/');
    });
  };

  render() {
    return (
      <div className='top-push settings'>
        <h1>Your Settings</h1>
        <i>
          Note: pressing any of the save buttons will update all fields you have
          changed. <br />
          They are placed in each section for convenience
        </i>
        <div className='settings-change-preferences'>
          <h1>Preferences</h1>
          <div>
            <h3>Hide your profile</h3>
            <p>This makes sure people will not be able to view your profile.</p>
            <p>
              (They still can see your name on your logs, if you choose to not
              hide them)
            </p>
            <h3>{this.state.hideProfile}</h3>
            <h4 className={this.state.hideProfile ? 'red' : 'green'}>
              You currently{' '}
              {this.state.hideProfile === true && <span>DO NOT </span>}
              allow others to view your profile
            </h4>
            <button name='hideProfile' onClick={this.toggle}>
              {this.state.hideProfile ? 'Show' : 'Hide'} profile
            </button>
          </div>
          <div>
            <h3>Make Journals Private by Default</h3>
            <h4 className={this.state.privateJournalDefault ? 'red' : 'green'}>
              Your Journals are{' '}
              {this.state.privateJournalDefault ? 'HIDDEN' : 'shown'} by default
            </h4>
            <button name='privateJournalDefault' onClick={this.toggle}>
              {this.state.privateJournalDefault ? 'Show' : 'Hide'} by Default
            </button>
          </div>
          <div>
            <h3>Hide your name by Default</h3>
            <h4 className={this.state.hideCreatorDefault ? 'red' : 'green'}>
              Your Journals are{' '}
              {this.state.hideCreatorDefault ? 'HIDDEN' : 'shown'} by default
            </h4>
            <button name='hideCreatorDefault' onClick={this.toggle}>
              {this.state.hideCreatorDefault ? 'Show' : 'Hide'} by Default
            </button>
          </div>
          <button onClick={() => this.changeInfo()}>Change Preferences</button>
        </div>
        <div className='settings-change-info'>
          <h1>Change your Account Info</h1>
          <div>
            <h3>Your old phone number: {this.state.oldPhone}</h3>
            <span>Change Phone #</span>
            <input
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              name='phone'
              placeholder='+3(141)592-6535'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <h3>Your old email: {this.state.oldEmail}</h3>
            <span>Change email</span>
            <input
              type='email'
              name='email'
              placeholder='name@email.com'
              onChange={this.handleChange}
            />
          </div>
          <button onClick={() => this.changeInfo()}>Change Info</button>
          <div>
            <h3>Change Password</h3>
            <span>New Password</span>
            <input
              type='password'
              name='oldPass'
              placeholder='********'
              onChange={this.handleChange}
            />
            <br />
            <span>Confirm Password</span>
            <input
              type='password'
              name='newPass'
              placeholder='********'
              onChange={this.handleChange}
            />
            <br />
            <button onClick={() => this.changeInfo()}>Change Password</button>
          </div>
        </div>
        <div className='settings-delete'>
          <h1>Delete Profile</h1>
          <h4>WARNING: If you delete your profile, this cannot be undone!</h4>
          <p>
            Note: if you choose to delete your account, your logs will stay
            intact, for mood aggregation purposes. <br />
            All of your journals will be erased, as will the names of the logs.{' '}
          </p>
          <span>Type in your Usename Before Deletion</span>
          <input
            type='password'
            name='confirmDelete'
            placeholder='make sure this is what you want'
            style={{ width: '175px' }}
            onChange={this.handleChange}
          />
          <br />
          <button onClick={this.deleteUser}>DELETE IT!</button>
        </div>
      </div>
    );
  }
}
