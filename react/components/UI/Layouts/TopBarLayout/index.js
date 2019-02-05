import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import BlankLayout from 'react/components/UI/Layouts/BlankLayout';
import TopBar from 'react/components/TopBar';

const FixedWrapper = styled(Box)`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background-color: white;
  z-index: 1;
`;

export default class TopBarLayout extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired,
    scheme: PropTypes.oneOf(['DEFAULT', 'GROUP']),
  }

  static defaultProps = {
    scheme: 'DEFAULT',
  }

  render() {
    const { children, scheme, ...rest } = this.props;

    return (
      <BlankLayout {...rest}>
        <FixedWrapper>
          <TopBar scheme={scheme} />
        </FixedWrapper>

        {children}
      </BlankLayout>
    );
  }
}
