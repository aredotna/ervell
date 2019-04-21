import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'v2/components/UI/Box';
import Overlay from 'v2/components/UI/Overlay';
import UserAvatar from 'v2/components/UserAvatar';
import UserDropdown from 'v2/components/UserDropdown';

const Container = styled(Box)`
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    opacity: 0.5;
  }
`;

export default class MyRepresentation extends PureComponent {
  static propTypes = {
    me: PropTypes.shape({
      initials: PropTypes.string.isRequired,
      avatar: PropTypes.string,
    }).isRequired,
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

  render() {
    const { mode } = this.state;
    const { me } = this.props;

    return (
      <React.Fragment>
        <Container {...this.props} onClick={this.handleClick} ref={this.containerRef}>
          <UserAvatar size={30} user={{ ...me, href: null }} />
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
            <UserDropdown />
          </Overlay>
        }
      </React.Fragment>
    );
  }
}
