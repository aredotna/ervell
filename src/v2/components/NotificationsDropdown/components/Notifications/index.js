import React from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import notificationSentenceFragment from 'v2/components/NotificationsDropdown/components/Notification/fragments/notificationSentence'

import { mixin as dividerButtonMixin } from 'v2/components/UI/Buttons/components/DividerButton'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Notification from 'v2/components/NotificationsDropdown/components/Notification'

const Container = styled(Box)`
  position: relative;
  display: flex;
  flex-direction: column;
  max-height: 30em;
`

const Body = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`

const Button = styled.a`
  ${dividerButtonMixin}
`

const Notifications = ({ notifications }) => {
  if (notifications.length === 0) {
    return (
      <Container>
        <Body p={6}>
          <Text textAlign="center" f={3}>
            No notifications yet.
          </Text>
        </Body>
      </Container>
    )
  }

  return (
    <Container>
      <Body p={6}>
        {/* TODO: For some dumb reason notifications are reversed. Fix this in the API */}
        {notifications
          .slice()
          .reverse()
          .map(notification => (
            <Notification key={notification.id} notification={notification} />
          ))}
      </Body>

      <Box px={6}>
        <Button pt={6} href="/notifications">
          View all notifications
        </Button>
      </Box>
    </Container>
  )
}

Notifications.propTypes = {
  notifications: PropTypes.arrayOf(propType(notificationSentenceFragment))
    .isRequired,
}

export default Notifications
