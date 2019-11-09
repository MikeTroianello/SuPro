import React from 'react';
import WeatherAvg from './WeatherAvg';

export default function WeatherAudit(props) {
  clear = [];
  clouds = [];
  rain = [];
  snow = [];
  outlier = [];
  // start = false;

  console.log('WEATHER AUDIT PROPS', props);
  props.logs.map(log => {
    console.log('LOG TYPE', log.weatherType);
    switch (log.weatherType) {
      case 'Clear':
        clear.push(log.mood);
        break;
      case 'Clouds':
        clouds.push(log.mood);
        break;
      case 'Snow':
        snow.push(log.mood);
        break;
      case 'Rain':
      case 'Drizzle':
      case 'Thunderstorm':
        rain.push(log.mood);
        break;
      default:
        outlier.push(log.mood);
        break;
    }
  });
  if (
    clear.length > 0 ||
    clouds.length > 0 ||
    rain.length > 0 ||
    snow.length > 0 ||
    outlier.length > 0
  ) {
    start = true;
  }

  return (
    <div className='weather-audit'>
      <div className='header'>
        <span>Weather</span>
        <span>Mood Average</span>
        <span>Productivity Average</span>
        {start && (
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
