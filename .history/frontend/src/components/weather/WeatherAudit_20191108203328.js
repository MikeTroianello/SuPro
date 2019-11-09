import React, { Component } from 'react';
import WeatherAvg from './WeatherAvg';

export default class WeatherAudit extends Component {
  clear = [];
  clouds = [];
  rain = [];
  snow = [];
  outlier = [];

  componentDidMount() {
    this.props.logs.map(log => {
      console.log('LOG TYPE', log.weatherType);
      switch (log.weatherType) {
        case 'Clear':
          this.sunny.push(log);
          break;
        case 'Snow':
          this.sunny.push(log);
          break;
      }
    });
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
