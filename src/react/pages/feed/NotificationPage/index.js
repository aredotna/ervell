import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';

import clearNotificationsMutation from 'react/pages/feed/NotificationPage/mutations/clearNotificationsMutation';

import TopBarLayout from 'react/components/UI/Layouts/TopBarLayout';
import Constrain from 'react/components/UI/Constrain';

import ErrorBoundary from 'react/components/UI/ErrorBoundary';
import Title from 'react/components/UI/Head/components/Title';

import FeedMetadata from 'react/components/FeedMetadata';
import Feed from 'react/components/Feed';

class NotificationPage extends Component {
  static propTypes = {
    clearNotifications: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.clearNotifications();
  }

  render() {
    return (
      <ErrorBoundary>

        <Title>Notifications</Title>

        <TopBarLayout>
          <Constrain>
            <FeedMetadata />
            <Feed type="Notification" />
          </Constrain>
        </TopBarLayout>
      </ErrorBoundary>
    );
  }
}

export default graphql(clearNotificationsMutation, {
  name: 'clearNotifications',
})(NotificationPage);

