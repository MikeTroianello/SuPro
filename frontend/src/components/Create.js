import React, { Component } from 'react';
import AuthService from '../components/auth/auth-service';
import { Redirect } from 'react-router-dom';

export default class Create extends Component {
  state = {
    mood: null,
    productivity: null,
    journal: null,
    privateJournal: false,
    hideCreator: false,
    latitude: null,
    longitude: null,
    err: null
  };

  service = new AuthService();

  handleChange = e => {
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log('THE NEW STATE', this.state);
      }
    );
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.props.createdToday !== false) {
      this.setState(
        {
          err: true
        },

        this.props.setError('You already created a log today!')
      );
    } else {
      let info = this.state;
      this.service.create(info).then(results => {
        this.props.logCreated();
        this.props.history.push('/view');
      });
    }
  };

  render() {
    //THIS FINDS LATITUDE AND LONGITUDE

    if (this.state.err) {
      return <Redirect to='/' />;
    }

    if ('geolocation' in navigator) {
      console.log('Geolocation is available');
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        this.setState({
          latitude: latitude,
          longitude: longitude
        });
      });
    } else {
      console.log('geolocation IS NOT available');
    }

    return (
      <div>
        <h1>Create a Mood Log</h1>
        <div>
          <label htmlFor='mood'>What is your mood?</label>
          <input
            type='number'
            name='mood'
            placeholder='1 to 5'
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='productivity'>
            How productive do you think you were today?
          </label>
          <input
            type='number'
            name='productivity'
            placeholder='1 to 5'
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='journal'>
            What were some of your thoughts about today?
          </label>
          <textarea
            type='textbox'
            name='journal'
            rows='6'
            cols='70'
            maxLength='300'
            placeholder='max length 300 characters'
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor='privateJournal'>Make this a private Log:</label>
          <input
            type='checkbox'
            name='privateJournal'
            onChange={() => {
              this.setState({
                privateJournal: !this.state.privateJournal
              });
            }}
          />
        </div>
        <div>
          <label htmlFor='hideCreator'>Hide your status as creator:</label>
          <input
            type='checkbox'
            name='hideCreator'
            onChange={() => {
              this.setState({
                hideCreator: !this.state.hideCreator
              });
            }}
          />
          <p>
            (Note: people will still see the contents of this log, they just
            will be unable to know you created it)
          </p>
        </div>
        <button onClick={this.handleSubmit}>Log It</button>
      </div>
    );
  }
}
