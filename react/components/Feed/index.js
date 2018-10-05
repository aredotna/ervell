import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import feedQuery from 'react/components/Feed/queries/feedQuery';

import Text from 'react/components/UI/Text';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import FeedGroups from 'react/components/Feed/components/FeedGroups/index';
import CenteringBox from 'react/components/UI/CenteringBox';

const LoadingContainer = styled(CenteringBox)`
  margin-top: -250px; // Hack for now
`;

export default class Feed extends Component {
  static propTypes = {
    onCompleted: PropTypes.func,
  }

  static defaultProps = {
    onCompleted: () => {},
  }

  render() {
    const { onCompleted } = this.props;

    return (
      <Query query={feedQuery} variables={{ limit: 20 }} onCompleted={onCompleted}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <LoadingContainer>
                <LoadingIndicator p={6} frames={['🌏', '🌍', '🌎']} />
              </LoadingContainer>
            );
          }

          if (error) {
            return (
              <Text color="state.alert" f={2} p={6}>
                {error.message}
              </Text>
            );
          }

          const { me: { feed: { groups } } } = data;

          return (
            <FeedGroups groups={groups} />
          );
        }}
      </Query>
    );
  }
}
