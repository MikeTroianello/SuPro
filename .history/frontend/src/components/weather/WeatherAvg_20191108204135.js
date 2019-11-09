import React from 'react';

export default function WeatherAvg(props) {
  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const avg = () => {
    props.logs.map(log => {});
  };
  let mood = Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

  return (
    <div>
      <h1>DONT MOVE</h1>
    </div>
  );
}
