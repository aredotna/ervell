import React, { Component } from 'react';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Specimen from 'react/stories/__components__/Specimen';
import Overlay from 'react/components/UI/Overlay';
import UserDropdown from 'react/components/UserDropdown';

const RelativeWrapper = styled.div`
  position: relative;
  border: 2px dashed red;
  overflow: hidden;
`;

class OverlaidUserDropdown extends Component {
  state = {
    open: false,
  }

  open = () =>
    this.setState({ open: true });

  close = () =>
    this.setState({ open: false });

  render() {
    const { open } = this.state;

    return (
      <RelativeWrapper>
        {!open &&
          <button onClick={this.open}>Open</button>
        }

        {open &&
          <div>
            <button ref={(el) => { this.target = el; }} onClick={this.close}>
              Close
            </button>

            <Overlay onClose={this.close} targetEl={() => this.target}>
              <UserDropdown />
            </Overlay>
          </div>
        }
      </RelativeWrapper>
    );
  }
}

storiesOf('UserDropdown', module)
  .add('default', () => (
    <Specimen>
      <UserDropdown />
    </Specimen>
  ))
  .add('overlay', () => (
    <Specimen>
      <OverlaidUserDropdown />
      <div>
        Content underneath
      </div>
    </Specimen>
  ));
