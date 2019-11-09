import React, { Component } from 'react';

export default class WeatherAudit extends Component {
  state = {
    sunny: [],
    cloudy: [],
    rainy: [],
    snowing: [],
    outlier: []
  };

  componentDidMount() {
    this.props.logs.map(log => {});
  }

  render() {
    return (
      <div className='weather-audit'>
        <span>Mood Average</span>
        <span>Productivity Average</span>
        <img src='' />
        <p>
          Sunny: <span>0</span>
          <span>0</span>
        </p>
        <img src='' />
        <p>
          Cloudy: <span>0</span>
          <span>0</span>
        </p>
        <img src='' />
        <p>
          Rainy: <span>0</span>
          <span>0</span>
        </p>
        <img src='' />
        <p>
          Snowing: <span>0</span>
          <span>0</span>
        </p>
      </div>
    );
  }
}
