import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import styled from 'styled-components';

import notificationsDropdownQuery from 'react/components/NotificationsDropdown/queries/notificationsDropdown';

import BorderedBox from 'react/components/UI/BorderedBox';
import Text from 'react/components/UI/Text';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import Notifications from 'react/components/NotificationsDropdown/components/Notifications';

const Container = styled(BorderedBox).attrs({
  width: '20em',
})`
  height: 100%;
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
              <Container>
                <LoadingIndicator p={6} />
              </Container>
            );
          }

          if (error) {
            return (
              <Container>
                <Text color="state.alert" f={2} p={6}>
                  {error.message}
                </Text>
              </Container>
            );
          }

          const { me: { feed: { notifications } } } = data;

          return (
            <Container>
              <Notifications notifications={notifications} />
            </Container>
          );
        }}
      </Query>
    );
  }
}
