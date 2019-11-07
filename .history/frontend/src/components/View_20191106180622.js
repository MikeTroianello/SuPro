import React, { Component } from 'react';
import AuthService from './auth/auth-service';
import { Link } from 'react-router-dom';
import DatePicker from 'react-date-picker';

export default class View extends Component {
  state = {
    today: new Date(),
    date: new Date(),
    logs: null,
    yours: false,
    id: null,
    day: null,
    year: null
  };

  service = new AuthService();

  //NEW WAY
  componentDidMount() {
    console.log('TODAY', this.state.today);

    this.sanitizeDate(this.state.today);
  }

  sanitizeDate = (dateToLookFor, message) => {
    console.log(message, dateToLookFor);
    var start = new Date(dateToLookFor.getFullYear(), 0, 0);
    var diff =
      dateToLookFor -
      start +
      (start.getTimezoneOffset() - dateToLookFor.getTimezoneOffset()) *
        60 *
        1000;
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    let a = dateToLookFor.toString().split(' ');
    let year = a[3];

    this.service
      .getDate(year, day)
      .then(results => {
        this.setState({
          logs: results.specificDay,
          yours: results.yours,
          id: results.id
        });
      })
      .catch(error => console.log(error));
  };

  showLogs = () => {
    if (this.state.logs.length < 1) {
      return (
        <div>
          No one has created a log today.{' '}
          {this.state.today == new Date() && (
            <Link to='/create'>Why not be the first?</Link>
          )}
        </div>
      );
    } else {
      return this.state.logs.map((log, key) => {
        let weatherString;
        //AS OF NOW, THE ICONS WILL ONLY SHOW THE DAYTIME IMAGES, FOR SIMPLICITY. THIS CAN BE CHANGED AT THE WEATHERSTRING VARIABLE
        if (log.weatherIcon) {
          weatherString = `http://openweathermap.org/img/wn/${log.weatherIcon.slice(
            0,
            -1
          )}d@2x.png`;
          // console.log('WEATHER STRING', weatherString);
        } else weatherString = '';
        let theTag = (
          <Link to={`/view-profile/${log.creatorId._id}`}>
            {log.creatorId.username}
          </Link>
        );
        if (
          log.creatorId.username ===
            'This user has decided to keep their name private' ||
          this.state.id === log.creatorId._id
        ) {
          theTag = log.creatorId.username;
        }

        return (
          <div className='log' key={key}>
            <span>
              <h2>
                {/* <Link to={`/view-profile/${log.creatorId._id}`}>
                  {log.creatorId.username}
                </Link> */}
                {theTag}
              </h2>
              {log.creatorId.username !==
                'This user has decided to keep their name private' &&
                log.hideCreator && (
                  <i>You have hidden your name for this log</i>
                )}
            </span>
            <h2>
              Weather: {log.weatherType}
              <span>
                <img src={weatherString} alt='CHANGE THIS LATER' />
              </span>
            </h2>
            <h2>
              Location: {log.county}, {log.state}
            </h2>
            <h3>Mood: {log.mood}</h3>
            <h3>Productivity: {log.productivity}</h3>
            <h3>Log: {log.journal}</h3>
            {log.journal !== 'This log is set to private' &&
              log.privateJournal && <i>You made this log private</i>}
          </div>
        );
      });
    }
  };

  onChange = date => {
    this.setState(
      { date },
      () => console.log(this.state.date),
      this.sanitizeDate(date, 'NEW DATE')
    );
  };

  render() {
    return (
      <div>
        <h1>PRELIMINARY: THESE ARE TODAYS LOGS:</h1>

        <div>
          <DatePicker onChange={this.onChange} value={this.state.date} />
        </div>
        {!this.state.yours && this.state.today == new Date() && (
          <div>
            You haven't created a log today.{' '}
            <Link to='/create'>Make one now!</Link>
          </div>
        )}
        {this.state.logs && this.showLogs()}
      </div>
    );
  }
}
