import React from 'react';

import React, { Component } from 'react';

export default class Profile extends Component {
  render() {
    return (
      <div>
        This is {this.props.user.username}'s' profile page: It will show
        previous sunlogs, perhaps an overall trend, and your average level of
        happiness
      </div>
    );
  }
}
