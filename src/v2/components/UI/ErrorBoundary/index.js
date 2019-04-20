import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ErrorAlert from 'v2/components/UI/ErrorAlert';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    isReloadable: PropTypes.bool,
  };

  static defaultProps = {
    isReloadable: true,
  };

  static getDerivedStateFromError() {
    return { mode: 'error' };
  }

  state = {
    mode: 'resting',
  };

  // eslint-disable-next-line
  componentDidCatch(error, info) {
    console.error(error, info);
  }

  render() {
    const { mode } = this.state;
    const { children, isReloadable } = this.props;

    if (mode === 'error') {
      return (
        <ErrorAlert isReloadable={isReloadable}>
          Something went wrong.
        </ErrorAlert>
      );
    }

    return children;
  }
}
