import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProfileChannelIndex extends Component {
  static propTypes = {
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }

  render() {
    const { id } = this.props;

    return <div>Index for {id}</div>;
  }
}
