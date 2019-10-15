import React, { Component } from 'react';

export default class Create extends Component {
  state = {
    mood: null,
    productivity: null,
    journal: null,
    privateJournal: false,
    hideCreator: false
  };

  handleChange = () => {};

  render() {
    return (
      <div>
        <div>
          <label for='mood'>What is your mood?</label>
          <input type='number' name='mood' />
        </div>
        <div>
          <label for='productivity'>
            How productive do you think you were today?
          </label>
          <input type='number' name='productivity' />
        </div>
        <div>
          <label for='journal'>
            What were some of your thoughts about today? (max length 500
            characters)
          </label>
          <textarea
            type='textbox'
            name='journal'
            rows='6'
            cols='80'
            maxLength='500'
          />
        </div>
        <div>
          <label for='privateJournal'>Make this a private Log:</label>
          <input type='checkbox' name='privateJournal' />
        </div>
        <div>
          <label for='hideCreator'>Hide your status as creator:</label>
          <input type='checkbox' name='hideCreator' />
          <p>
            (Note: people will still see the contents of this log, they just
            will be unable to know you created it)
          </p>
        </div>
        {/* <input type='hidden' value={latitude} name='latitude' />
        <input type='hidden' value={longitude} name='longitude' /> */}
        <button>Log It</button>
      </div>
    );
  }
}
