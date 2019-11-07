import React from 'react';

export default function StateFilter(props) {
  console.log('STATEFILTER', props.states);

  const selected = e => {
    return <h1>You have selected {e.target.value}</h1>;
  };
  return (
    <div>
      This is the dropdown for states
      <select name='theState' onSelect={selected}>
        {props.states.map((state, key) => {
          return <option value={state}>{state}</option>;
        })}
      </select>
    </div>
  );
}
