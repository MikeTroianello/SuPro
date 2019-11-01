import React, { Component } from 'react';
import AuthService from '../components/auth/auth-service';

export default class Create extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     mood: null,
  //     productivity: null,
  //     journal: null,
  //     privateJournal: false,
  //     hideCreator: false,
  //     latitude: null,
  //     longitude: null
  //   };
  //   this.service = new AuthService();
  // }

  state = {
    mood: null,
    productivity: null,
    journal: null,
    privateJournal: false,
    hideCreator: false,
    latitude: null,
    longitude: null
  };

  service = new AuthService();

  handleChange = e => {
    console.log('E', e.target.value);
    this.setState(
      {
        [e.target.name]: e.target.value
      },
      () => {
        console.log('THE NEW STATE', this.state);
      }
    );
  };

  // handleSubmit = e => {
  //   e.preventDefault();
  //   console.log('SUBMITTING');
  //   let info = this.state;
  //   axios
  //     .post('http://localhost:5000/log/create', {
  //       info
  //     })
  //     .then(results => {
  //       console.log(results);
  //       this.props.history.push('/');
  //     });
  // };

  handleSubmit = e => {
    e.preventDefault();
    console.log('SUBMITTING');
    let info = this.state;
    this.service.create(info).then(results => {
      console.log('WE DID IT', results);
      this.props.history.push('/');
    });
  };

  render() {
    //THIS FINDS LATITUDE AND LONGITUDE

    if ('geolocation' in navigator) {
      console.log('Geolocation is available');
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        // document.getElementById('lat').textContent = latitude;
        // document.getElementById('lon').textContent = longitude;

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
            rows='7'
            cols='80'
            maxLength='500'
            placeholder='max length 500 characters'
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
        {/* <input type='hidden' value={latitude} name='latitude' />
        <input type='hidden' value={longitude} name='longitude' /> */}
        <button onClick={this.handleSubmit}>Log It</button>
        <div id='lat'>lat</div>
        <div id='lon'>lon</div>
      </div>
    );
  }
}
