import React from 'react';

export default function StateFilter(props) {
  return (
    <div>
      <select name='theState'>
        {this.props.state.map(state => {
          return <option value={state}>{state}</option>;
        })}
      </select>
    </div>
  );
}
