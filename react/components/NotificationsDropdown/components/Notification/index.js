import React, { Component } from 'react';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import NotificationObjectLink from 'react/components/NotificationsDropdown/components/Notification/components/NotificationObjectLink';

import notificationSentenceFragment from 'react/components/NotificationsDropdown/components/Notification/fragments/notificationSentence';

const RelativeTime = styled(Text).attrs({
  f: 0,
  color: 'gray.medium',
  mt: 2,
})`
  text-transform: uppercase;
`;

const Label = styled(Text).attrs({
  f: 1,
  display: 'inline',
})`
`;

const Container = styled(Box).attrs({
  my: 3,
})`
  ${x => x.isUnread && `
    border-left: 2px solid ${x.theme.colors.state.alert};
    padding-left: ${x.theme.space[4]};
  `}
`;

export default class Notification extends Component {
  static propTypes = {
    notification: propType(notificationSentenceFragment).isRequired,
  }

  render() {
    const {
      notification: {
        is_read,
        user,
        action,
        item,
        connector,
        target,
        created_at,
      },
    } = this.props;

    return (
      <Container my={3} pr={6} isUnread={!is_read}>
        <div>
          <NotificationObjectLink {...user} />

          {item.__typename === 'Comment' &&
            <Label>
              {' '}
              <a href={target.href}>
                {item.body}
              </a>
            </Label>
          }

          {item.__typename !== 'Comment' &&
            <span>
              <Label>
                {` ${action} `}
              </Label>

              <NotificationObjectLink {...item} />

              {connector &&
                <Label>
                  {` ${connector} `}
                </Label>
              }

              {target &&
                <NotificationObjectLink {...target} />
              }
            </span>
          }
        </div>

        <RelativeTime>
          {created_at}
        </RelativeTime>
      </Container>
    );
  }
}
