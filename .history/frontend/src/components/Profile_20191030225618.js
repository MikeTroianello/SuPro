import React, { Component } from 'react';
import axios from 'axios';

export default class Profile extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        This is {this.props.user.username}'s profile page: It will show previous
        sunlogs, perhaps an overall trend, and your average level of happiness
      </div>
    );
  }
}
