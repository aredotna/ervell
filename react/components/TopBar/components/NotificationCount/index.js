import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { graphql } from 'react-apollo';

import clearNotificationsMutation from 'react/components/TopBar/components/NotificationCount/mutations/clearNotifications';

import Box from 'react/components/UI/Box';
import { baseMixin as baseTextMixin } from 'react/components/UI/Text';
import Overlay from 'react/components/UI/Overlay';
import NotificationsDropdown from 'react/components/NotificationsDropdown';

const Container = styled(Box)`
  display: flex;
  align-items: center;
  user-select: none;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

const Badge = styled(Box).attrs({
  bg: 'gray.regular',
  f: 3,
  px: '0.4em',
  py: '0.2em',
  color: 'white',
})`
  ${baseTextMixin}
  line-height: 1;
  border-radius: ${props => props.theme.radii.subtle};
  font-weight: bold;

  ${props => props.amount > 0 && `
    background-color: ${props.theme.colors.state.alert};
  `}
`;

class NotificationCount extends PureComponent {
  static propTypes = {
    count: PropTypes.number,
    clearNotifications: PropTypes.func.isRequired,
  }

  static defaultProps = {
    count: 0,
  }

  state = {
    mode: 'resting',
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
    const { clearNotifications } = this.props;

    return clearNotifications();
  }

  render() {
    const { count } = this.props;
    const { mode } = this.state;

    return (
      <React.Fragment>
        <Container {...this.props} ref={this.containerRef} onClick={this.handleClick} role="button" tabIndex={0}>
          <Badge amount={count}>
            {count}
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
            offsetY={0}
            offsetX={10}
            marginY={10}
          >
            <NotificationsDropdown onCompleted={this.markAsRead} />
          </Overlay>
        }
      </React.Fragment>
    );
  }
}

export default graphql(clearNotificationsMutation, {
  name: 'clearNotifications',
})(NotificationCount);
