import React from 'react';

export default function WeatherAvg(props) {
  const avg = () => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    let mood =
      Math.round(100 * (moodArr.reduce(reducer) / moodArr.length)) / 100;

    return (
      <div>
        {props.weather}: {mood}
      </div>
    );
  };

  return (
    <div>
      <h1>DONT MOVE</h1>
    </div>
  );
}
