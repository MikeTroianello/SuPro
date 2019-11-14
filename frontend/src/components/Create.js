import React, { Component } from 'react';
import AuthService from '../components/auth/auth-service';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFrown as frown,
  faLaugh as happiest,
  faSmile as smile,
  faMeh as middlin,
  faSadTear as crying,
  faGrin as grin
} from '@fortawesome/free-solid-svg-icons';

export default class Create extends Component {
  state = {
    mood: null,
    moodEmoji: null,
    productivity: null,
    journal: null,
    privateJournal: false,
    hideCreator: false,
    latitude: null,
    longitude: null,
    err: null,
    message: null
  };

  service = new AuthService();

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.innerText || e.target.value
    });
  };

  setMood = num => {
    console.log('SETTING MOOD', num);
    let emoji;
    switch (num) {
      case 1:
        emoji = <FontAwesomeIcon icon={crying} />;
        break;
      case 2:
        emoji = <FontAwesomeIcon icon={frown} />;
        break;
      case 3:
        emoji = <FontAwesomeIcon icon={middlin} />;
        break;
      case 4:
        emoji = <FontAwesomeIcon icon={smile} />;
        break;
      case 5:
        emoji = <FontAwesomeIcon icon={happiest} />;
        break;
    }

    this.setState(
      {
        mood: num,
        moodEmoji: emoji
      },
      () => console.log(this.state)
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
    }
    if (!this.state.mood) {
      this.setState({
        message: `You didn't select your mood`
      });
    } else if (!this.state.productivity) {
      this.setState({
        message: `You didn't select your productivity`
      });
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
      <div className='create-log'>
        <h1>Create a Mood Log</h1>
        <div className='create-mood-box'>
          <label htmlFor='mood'>
            What is your mood? {this.state.moodEmoji}
          </label>
          <br />
          <div className='one-through-five'>
            <FontAwesomeIcon
              id='mood'
              className='emotion'
              icon={crying}
              size='2x'
              onClick={() => this.setMood(1)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={frown}
              size='2x'
              onClick={() => this.setMood(2)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={middlin}
              size='2x'
              onClick={() => this.setMood(3)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={smile}
              size='2x'
              onClick={() => this.setMood(4)}
            />
            <FontAwesomeIcon
              id='mood'
              icon={happiest}
              size='2x'
              onClick={() => this.setMood(5)}
            />
          </div>
        </div>
        <div className='create-productivity-box'>
          <label htmlFor='productivity'>
            How productive do you think you were today?{' '}
            <span className='one-through-five-box'>
              {this.state.productivity}
            </span>
          </label>
          <br />
          <div className='one-through-five' onClick={this.handleChange}>
            <span id='productivity'>1</span>
            <span id='productivity'>2</span>
            <span id='productivity'>3</span>
            <span id='productivity'>4</span>
            <span id='productivity'>5</span>
          </div>
        </div>
        <div>
          <label htmlFor='journal'>
            What were some of your thoughts about today?
          </label>
          <textarea
            type='textbox'
            name='journal'
            id='journal'
            rows='6'
            cols='48'
            maxLength='250'
            placeholder='max length 250 characters'
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
        <button className='create-button' onClick={this.handleSubmit}>
          Log It
        </button>
        <br></br>
        <b className='signup-message'>{this.state.message}</b>
      </div>
    );
  }
}
