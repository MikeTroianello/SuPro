import React, { Component } from 'react';
import axios from 'axios';

export default class View extends Component {
  componentDidMount() {
    axios.get('http://localhost:5000');
  }

  render() {
    return <div>This is the view page. It may need to be expanded.</div>;
  }
}
