import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { MODES, SORTS } from 'react/components/Home/config';

import HomeMetadata from 'react/components/HomeMetadata';

export default class Home extends Component {
  static propTypes = {
    mode: PropTypes.oneOf(MODES),
    sort: PropTypes.oneOf(SORTS),
  }

  static defaultProps = {
    mode: null,
    sort: null,
  }

  render() {
    const { mode, sort } = this.props;

    return (
      <div>
        <HomeMetadata mode={mode} sort={sort} />
      </div>
    );
  }
}
