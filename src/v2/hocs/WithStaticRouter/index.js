import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StaticRouter } from 'react-router';

import WithCurrentRoute from 'v2/hocs/WithCurrentRoute';

const withStaticRouter = WrappedComponent => {
  class WithStaticRouter extends Component {
    static propTypes = {
      currentRoute: PropTypes.shape({
        href: PropTypes.string.isRequired,
      }).isRequired,
    };

    render() {
      const {
        currentRoute: { href },
        ...rest
      } = this.props;
      const context = {};

      return (
        <StaticRouter location={href} context={context}>
          <WrappedComponent {...rest} />
        </StaticRouter>
      );
    }
  }

  return WithCurrentRoute(WithStaticRouter);
};

export default withStaticRouter;
