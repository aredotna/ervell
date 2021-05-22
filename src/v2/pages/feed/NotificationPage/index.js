import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { graphql } from '@apollo/client/react/hoc'

import clearNotificationsMutation from 'v2/pages/feed/NotificationPage/mutations/clearNotificationsMutation'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import Title from 'v2/components/UI/Head/components/Title'

import { FeedMetadata } from 'v2/components/FeedMetadata'
import Feed from 'v2/components/Feed'

class NotificationPage extends Component {
  static propTypes = {
    clearNotifications: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.clearNotifications()
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
    )
  }
}

export default graphql(clearNotificationsMutation, {
  name: 'clearNotifications',
})(NotificationPage)
