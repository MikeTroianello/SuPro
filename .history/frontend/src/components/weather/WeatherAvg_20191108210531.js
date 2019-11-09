import React from 'react';

export default function WeatherAvg(props) {
  console.log('WEATHER AVERAGE PROPS', props);
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  let mood;
  if (props.logs.length > 0) {
    mood =
      Math.round(100 * (props.logs.reduce(reducer) / props.logs.length)) / 100;
  } else {
    mood = 0;
  }

  return (
    <div>
      {props.weather}: {mood}
    </div>
  );

  return <div>{avg}</div>;
}
