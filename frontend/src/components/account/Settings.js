import React, { Component } from 'react';

export default class Settings extends Component {
  state = {
    hideProfile: false,
    privateJournalDefault: false,
    hideCreatorDefault: false,
    phone: null,
    email: null,
    oldPass: null,
    newPass: null,
    deleteConfirmation: null
  };

  toggle = e => {
    console.log('TOGGLED', e.target.name);
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

  handleSubmit = type => {
    // YOU NEED TO IMPORT SERVICE FOR THIS
  };

  render() {
    console.log('THE NEW STATE', this.state);
    return (
      <div className='top-push settings'>
        <h1>Your Settings</h1>
        <div className='settings-change-preferences'>
          <h1>Preferences</h1>
          <div>
            <h3>Hide your profile</h3>
            <p>This makes sure people will not be able to view your profile.</p>
            <p>
              (They still can see your name on your logs, if you choose to not
              hide them)
            </p>
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
        </div>
        <div className='settings-change-info'>
          <h1>Change your Account Info</h1>
          <div>
            <span>Change Phone #</span>
            <input
              type='tel'
              name='phone'
              placeholder='+3(141)592-6535'
              onChange={this.handleChange}
            />
          </div>
          <div>
            <span>Change email</span>
            <input
              type='email'
              name='email'
              placeholder='name@email.com'
              onChange={this.handleChange}
            />
          </div>
          <button onClick={() => this.handleSubmit('phone-email')}>
            Change Info
          </button>
          <div>
            <h3>Change Password</h3>
            <span>Old Password</span>
            <input
              type='password'
              name='password'
              placeholder='********'
              onChange={this.handleChange}
            />
            <br />
            <span>New Password</span>
            <input
              type='password'
              name='password'
              onChange={this.handleChange}
            />
            <button onClick={() => this.handleSubmit('password')}>
              Change Password
            </button>
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
          <button onClick={this.delete}>I UNDERSTAND, DELETE IT!</button>
        </div>
      </div>
    );
  }
}
