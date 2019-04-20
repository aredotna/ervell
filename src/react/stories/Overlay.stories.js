import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';
import styled from 'styled-components';

import Specimen from 'react/stories/__components__/Specimen';
import Overlay from 'react/components/UI/Overlay';
import Pre from 'react/components/UI/Pre';
import UserDropdown from 'react/components/UserDropdown';

const RelativeWrapper = styled.div`
  position: relative;
  border: 2px dashed red;
  overflow: hidden;
  text-align: ${x => x.align};
  padding: 1em;
  margin: 1em;
`;

class OverlaidUserDropdown extends Component {
  static propTypes = {
    align: PropTypes.oneOf(['left', 'right']).isRequired,
    anchorX: PropTypes.oneOf(['left', 'right']),
    anchorY: PropTypes.oneOf(['top', 'bottom']),
    alignToX: PropTypes.oneOf(['left', 'right']),
    alignToY: PropTypes.oneOf(['top', 'bottom']),
  }

  static defaultProps = {
    anchorY: 'top',
    anchorX: 'left',
    alignToY: 'bottom',
    alignToX: 'left',
  }

  state = {
    open: false,
  }

  open = () =>
    this.setState({ open: true });

  close = () =>
    this.setState({ open: false });

  render() {
    const {
      align, anchorX, anchorY, alignToX, alignToY,
    } = this.props;
    const { open } = this.state;

    return (
      <RelativeWrapper align={align}>
        {!open &&
          <div>
            <button onClick={this.open}>Open</button>

            <Pre>{JSON.stringify(this.props, null, 2)}</Pre>
          </div>
        }

        {open &&
          <div>
            <button ref={(el) => { this.target = el; }} onClick={this.close}>
              Close
            </button>

            <Pre>{JSON.stringify(this.props, null, 2)}</Pre>

            <Overlay
              onClose={this.close}
              anchorX={anchorX}
              anchorY={anchorY}
              alignToX={alignToX}
              alignToY={alignToY}
              targetEl={() => this.target}
            >
              <UserDropdown />
            </Overlay>
          </div>
        }
      </RelativeWrapper>
    );
  }
}

storiesOf('Overlay', module)
  .add('configurations', () => (
    <Specimen>
      <OverlaidUserDropdown
        align="left"
        anchorX="left"
      />

      <OverlaidUserDropdown
        align="right"
        anchorX="right"
        alignToX="right"
      />

      <OverlaidUserDropdown
        align="left"
        anchorY="bottom"
        alignToY="top"
      />

      <OverlaidUserDropdown
        align="right"
        anchorX="right"
        anchorY="bottom"
        alignToX="right"
        alignToY="top"
      />
    </Specimen>
  ));
