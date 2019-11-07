import React from 'react';

export default function StateFilter(props) {
  console.log('STATEFILTER', props.states);
  return (
    <div>
      This is the dropdown for states
      <select name='theState'>
        {props.states.map(state => {
          return <option value={state}>{state}</option>;
        })}
      </select>
    </div>
  );
}
