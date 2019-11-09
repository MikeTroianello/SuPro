import React, { Component } from 'react';
import WeatherAvg from './WeatherAvg';

export default class WeatherAudit extends Component {
  clear = [];
  clouds = [];
  rain = [];
  snow = [];
  outlier = [];

  componentDidMount() {
    console.log('WEATHER AUDIT PROPS', this.props);
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
        <div className='header'>
          <span>Weather</span>
          <span>Mood Average</span>
          <span>Productivity Average</span>
        </div>
        <div className='weatherAvg'>
          <WeatherAvg weather={'Clear'} logs={this.clear} />
          <WeatherAvg weather={'Clouds'} logs={this.clouds} />
          <WeatherAvg weather={'Rain'} logs={this.rain} />
          <WeatherAvg weather={'Snow'} logs={this.snow} />
        </div>
      </div>
    );
  }
}
