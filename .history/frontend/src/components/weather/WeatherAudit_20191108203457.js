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
          this.clear.push(log);
          break;
        case 'Clouds':
          this.clouds.push(log);
          break;
        case 'Snow':
          this.snow.push(log);
          break;
        case 'Rain':
        case 'Drizzle':
        case 'Thunderstorm':
          this.rain.push(log);
          break;
        default:
          this.outlier.push(log);
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
