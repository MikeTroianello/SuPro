import React from 'react';

export default function CountyFilter(props) {
  return (
    <div>
      This is the dropdown for counties
      <select name='county' onChange={props.chosenCounty}>
        <option selected disabled>
          Filter by County:
        </option>
        {props.counties.map((county, key) => {
          return (
            <option key={key} value={county}>
              {county}
            </option>
          );
        })}
      </select>
    </div>
  );
}
