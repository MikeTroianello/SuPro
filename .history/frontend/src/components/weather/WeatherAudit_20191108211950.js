import React, { Component } from 'react';
import WeatherAvg from './WeatherAvg';

export default class WeatherAudit extends Component {
  state = {
    start: false
  };

  clear = [];
  clouds = [];
  rain = [];
  snow = [];
  outlier = [];
  // start = false;

  componentDidMount() {
    console.log('WEATHER AUDIT PROPS', this.props);
    if (this.props.logs.length > 0) {
      this.props.logs.map(log => {
        console.log('LOG TYPE', log.weatherType);
        switch (log.weatherType) {
          case 'Clear':
            this.clear.push(log.mood);
            break;
          case 'Clouds':
            this.clouds.push(log.mood);
            break;
          case 'Snow':
            this.snow.push(log.mood);
            break;
          case 'Rain':
          case 'Drizzle':
          case 'Thunderstorm':
            this.rain.push(log.mood);
            break;
          default:
            this.outlier.push(log.mood);
            break;
        }
      });
      if (
        this.clear.length > 0 ||
        this.clouds.length > 0 ||
        this.rain.length > 0 ||
        this.snow.length > 0 ||
        this.outlier.length > 0
      ) {
        this.setState({
          start: true
        });
      }
    }
  }

  render() {
    return (
      <div className='weather-audit'>
        <div className='header'>
          <span>Weather</span>
          <span>Mood Average</span>
          <span>Productivity Average</span>
          {this.state.start && (
            <div className='weatherAvg'>
              <WeatherAvg weather={'Clear'} logs={this.clear} />
              <WeatherAvg weather={'Clouds'} logs={this.clouds} />
              <WeatherAvg weather={'Rain'} logs={this.rain} />
              <WeatherAvg weather={'Snow'} logs={this.snow} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
