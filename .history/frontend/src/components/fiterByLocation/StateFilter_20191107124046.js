import React from 'react';

export default function StateFilter(props) {
  console.log('STATEFILTER', props.states);

  const selected = e => {
    console.log('AHHHHHHHHHHHHHH');
    return <h1>You have selected {e.target.value}</h1>;
  };

  return (
    <div>
      This is the dropdown for states
      <select name='theState' onChange={selected}>
        <option selected disabled>
          Filter by State:
        </option>
        {props.states.map((state, key) => {
          return (
            <option key={key} value={state}>
              {state}
            </option>
          );
        })}
      </select>
    </div>
  );
}
