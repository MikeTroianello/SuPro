import React from 'react';

export default function StateFilter(props) {
  return (
    <div>
      This is the dropdown for states
      <select name='state' onChange={props.filter}>
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
