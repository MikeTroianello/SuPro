import React from 'react';

export default function StateFilter(props) {
  return (
    <div>
      This is the dropdown for states
      <select name='theState'>
        {this.props.state.map(state => {
          return <option value={state}>{state}</option>;
        })}
      </select>
    </div>
  );
}
