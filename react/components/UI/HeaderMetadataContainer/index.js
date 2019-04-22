import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import constants from 'react/styles/constants';
import { multiply } from 'react/styles/functions';

import Box from 'react/components/UI/Box';

const MARGIN_BOTTOM = '2em';

const Container = styled(Box)`
  position: relative;
`;

const Header = styled.div`
  display: flex;
  width: 100%;
  padding-right: ${multiply(constants.blockGutter, 2)}; // TODO: Remove

  ${constants.media.mobile`
    display: block;
  `}
`;

const Breadcrumb = styled.div`
  flex: 1;
  padding-right: 1em;
`;

const Actions = styled.div`
  ${constants.media.mobile`
    margin-bottom: ${MARGIN_BOTTOM};
    margin-right: ${constants.blockGutter}; // TODO: Remove
    margin-left: ${constants.blockGutter}; // TODO: Remove
  `}
`;

const Metadata = styled.div`
`;

export default class HeaderMetadataContainer extends Component {
  static propTypes = {
    breadcrumb: PropTypes.node.isRequired,
    actions: PropTypes.node,
    children: PropTypes.node,
  }

  static defaultProps = {
    actions: null,
    children: null,
  }

  render() {
    const {
      breadcrumb,
      actions,
      children,
      ...rest
    } = this.props;

    return (
      <Container
        mt={constants.containerOffset}
        mb={children ? 7 : null}
        mx="auto"
        {...rest}
      >
        <Header>
          <Breadcrumb>
            {breadcrumb}
          </Breadcrumb>

          {actions &&
            <Actions>
              {actions}
            </Actions>
          }
        </Header>

        {children &&
          <Metadata>
            {children}
          </Metadata>
        }
      </Container>
    );
  }
}
