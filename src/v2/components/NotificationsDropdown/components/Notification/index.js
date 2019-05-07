import React, { Component } from 'react'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import NotificationObjectLink from 'v2/components/NotificationsDropdown/components/Notification/components/NotificationObjectLink'

import notificationSentenceFragment from 'v2/components/NotificationsDropdown/components/Notification/fragments/notificationSentence'

const RelativeTime = styled(Text).attrs({
  f: 0,
  color: 'gray.medium',
  mt: 2,
})`
  text-transform: uppercase;
`

const Label = styled(Text).attrs({
  f: 1,
  display: 'inline',
})``

const Container = styled(Box).attrs({
  my: 3,
})`
  ${x =>
    x.isUnread &&
    `
    border-left: 2px solid ${x.theme.colors.state.alert};
    padding-left: ${x.theme.space[4]};
  `}
`

export default class Notification extends Component {
  static propTypes = {
    notification: propType(notificationSentenceFragment).isRequired,
  }

  render() {
    const {
      notification: {
        is_read,
        owner,
        action,
        item,
        connector,
        target,
        created_at,
        item_title,
      },
    } = this.props

    return (
      <Container my={3} pr={6} isUnread={!is_read}>
        <div>
          <NotificationObjectLink {...owner} />

          {item.__typename === 'Comment' && (
            <span>
              <Label>
                {' said '}
                “
                <a
                  href={target.href}
                  dangerouslySetInnerHTML={{ __html: item.body }}
                />
                ”{' on '}
              </Label>

              <NotificationObjectLink {...target} />
            </span>
          )}

          {item.__typename !== 'Comment' && (
            <span>
              <Label>{` ${action} `}</Label>

              <NotificationObjectLink {...item} label={item_title} />

              {connector && <Label>{` ${connector} `}</Label>}

              {target && <NotificationObjectLink {...target} />}
            </span>
          )}
        </div>

        <RelativeTime>{created_at}</RelativeTime>
      </Container>
    )
  }
}
