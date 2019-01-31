import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import sharify from 'sharify';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Overlay from 'react/components/UI/Overlay';
import NotificationsDropdown from 'react/components/NotificationsDropdown';

const Container = styled(Box)`
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Badge = styled(Box).attrs({
  bg: 'gray.regular',
  px: 3,
  py: 1,
})`
  border-radius: 0.25em;

  ${props => props.amount > 0 && `
    background-color: ${props.theme.colors.state.alert};
  `}
`;

export default class NotificationCount extends PureComponent {
  static propTypes = {
    me: PropTypes.shape({
      authentication_token: PropTypes.string,
    }).isRequired,
  }

  state = {
    mode: 'resting',
    count: 0,
  }

  componentDidMount() {
    const { me: { authentication_token } } = this.props;
    const { data: { API_URL } } = sharify;

    axios({
      method: 'GET',
      url: `${API_URL}/notifications/unread_count`,
      headers: { 'X-AUTH-TOKEN': authentication_token },
    }).then(({ data: { unread_count } }) => {
      this.setState({ count: unread_count });
    });
  }

  containerRef = React.createRef();

  handleClick = () => {
    if (this.state.mode === 'closing') return;
    this.setState({ mode: 'open' });
  }

  handleClose = () => {
    this.setState({ mode: 'closing' });

    // TODO: Fix this hack?
    setTimeout(() => {
      this.setState({ mode: 'resting' });
    }, 100);
  }

  markAsRead = () => {
    this.setState({ count: 0 });

    const { me: { authentication_token } } = this.props;
    const { data: { API_URL } } = sharify;

    return axios({
      method: 'POST',
      url: `${API_URL}/notifications/clear`,
      headers: { 'X-AUTH-TOKEN': authentication_token },
    });
  }

  render() {
    const { mode, count } = this.state;

    return (
      <React.Fragment>
        <Container {...this.props} ref={this.containerRef} onClick={this.handleClick} role="button" tabIndex={0}>
          <Badge amount={count}>
            <Text f={2} color="white" fontWeight="bold">
              {count}
            </Text>
          </Badge>
        </Container>

        {mode === 'open' &&
          <Overlay
            onClose={this.handleClose}
            targetEl={() => this.containerRef.current}
            alignToY="bottom"
            alignToX="right"
            anchorY="top"
            anchorX="right"
            offsetY={10}
            offsetX={10}
          >
            <NotificationsDropdown onCompleted={this.markAsRead} />
          </Overlay>
        }
      </React.Fragment>
    );
  }
}
