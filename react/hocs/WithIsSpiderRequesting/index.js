import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import isSpiderRequestingQuery from 'react/hocs/WithIsSpiderRequesting/queries/isSpiderRequesting';

const withIsSpiderRequesting = (WrappedComponent) => {
  class WithIsSpiderRequesting extends Component {
    static propTypes = {
      data: PropTypes.shape({
        sharify: PropTypes.shape({
          isSpiderRequesting: PropTypes.bool,
        }),
      }).isRequired,
    }

    render() {
      const { data, data: { loading, error }, ...rest } = this.props;

      if (loading || error) {
        return <WrappedComponent {...rest} />;
      }

      const { sharify: { isSpiderRequesting } } = data;

      return (
        <WrappedComponent isSpiderRequesting={isSpiderRequesting} {...rest} />
      );
    }
  }

  return graphql(isSpiderRequestingQuery)(WithIsSpiderRequesting);
};

export default withIsSpiderRequesting;
