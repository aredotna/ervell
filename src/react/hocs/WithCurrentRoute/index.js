import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import currentRouteQuery from 'react/hocs/WithCurrentRoute/queries/currentRoute';

const withCurrentRoute = (WrappedComponent) => {
  class WithCurrentRoute extends Component {
    static propTypes = {
      data: PropTypes.shape({
        currentRoute: PropTypes.shape({
          protocol: PropTypes.string,
          slashes: PropTypes.string,
          auth: PropTypes.string,
          host: PropTypes.string,
          port: PropTypes.string,
          hostname: PropTypes.string,
          hash: PropTypes.string,
          search: PropTypes.string,
          query: PropTypes.string,
          pathname: PropTypes.string.isRequired,
          path: PropTypes.string.isRequired,
          href: PropTypes.string.isRequired,
        }).isRequired,
      }).isRequired,
    }

    render() {
      const { data: { currentRoute }, ...rest } = this.props;

      return (
        <WrappedComponent currentRoute={currentRoute} {...rest} />
      );
    }
  }

  return graphql(currentRouteQuery)(WithCurrentRoute);
};

export default withCurrentRoute;
