import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import notificationsDropdownQuery from 'react/components/NotificationsDropdown/queries/notificationsDropdown';

import { mixin as dividerButtonMixin } from 'react/components/UI/Buttons/components/DividerButton';

import BorderedBox from 'react/components/UI/BorderedBox';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import Notification from 'react/components/NotificationsDropdown/components/Notification';

const Container = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Body = styled(Box)`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

const Button = styled.a`
  ${dividerButtonMixin}
`;

export default class NotificationsDropdown extends Component {
  static propTypes = {
    onCompleted: PropTypes.func,
  }

  static defaultProps = {
    onCompleted: () => {},
  }

  render() {
    const { onCompleted } = this.props;

    return (
      <Query query={notificationsDropdownQuery} variables={{ limit: 20 }} onCompleted={onCompleted}>
        {({ loading, error, data }) => {
          if (loading) {
            return (
              <BorderedBox width="20em">
                <LoadingIndicator p={6} />
              </BorderedBox>
            );
          }

          if (error) {
            return (
              <BorderedBox width="20em">
                <Text color="state.alert" f={2} p={6}>
                  {error.message}
                </Text>
              </BorderedBox>
            );
          }

          const { me: { feed: { notifications } } } = data;

          return (
            <BorderedBox width="20em" height="30em">
              <Container>
                <Body p={6}>
                  {/* TODO: For some dumb reason notifications are reversed. Fix this in the API */}
                  {notifications.slice().reverse().map(notification => (
                    <Notification
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </Body>

                <Button pt={6} href="/notifications">
                  View all notifications
                </Button>
              </Container>
            </BorderedBox>
          );
        }}
      </Query>
    );
  }
}
