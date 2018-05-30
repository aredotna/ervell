import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import isLoggedInQuery from 'react/hocs/WithLoginStatus/queries/isLoggedIn';

const withLoginStatus = (WrappedComponent) => {
  class WithLoginStatus extends Component {
    static propTypes = {
      data: PropTypes.shape({
        loginStatus: PropTypes.shape({
          isLoggedIn: PropTypes.bool.isRequired,
        }).isRequired,
      }).isRequired,
    }

    render() {
      const { data: { loginStatus: { isLoggedIn } }, ...rest } = this.props;

      return (
        <WrappedComponent isLoggedIn={isLoggedIn} {...rest} />
      );
    }
  }

  return graphql(isLoggedInQuery)(WithLoginStatus);
};

export default withLoginStatus;
