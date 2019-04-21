import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import serializedMeQuery from 'v2/hocs/WithSerializedMe/queries/serializedMe';

const withSerializedMe = WrappedComponent => {
  class WithSerializedMe extends Component {
    static propTypes = {
      data: PropTypes.shape({
        serializedMe: PropTypes.shape({
          __typename: PropTypes.string.isRequired,
          id: PropTypes.number.isRequired,
          name: PropTypes.string,
          initials: PropTypes.string,
          avatar: PropTypes.string,
          authentication_token: PropTypes.string,
        }),
      }),
    };

    static defaultProps = {
      data: {
        serailizedMe: null,
      },
    };

    render() {
      const {
        data: { serializedMe },
        ...rest
      } = this.props;

      return <WrappedComponent serializedMe={serializedMe} {...rest} />;
    }
  }

  return graphql(serializedMeQuery)(WithSerializedMe);
};

export default withSerializedMe;
