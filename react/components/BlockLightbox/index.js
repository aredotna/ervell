import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import styled from 'styled-components';

import constants from 'react/styles/constants';

import blockLightboxFragment from 'react/components/BlockLightbox/fragments/blockLightbox';

import Box from 'react/components/UI/Box';
import Title from 'react/components/UI/Head/components/Title';
import BlockLightboxContentPane from 'react/components/BlockLightbox/components/BlockLightboxContentPane';
import BlockLightboxMetadataPane from 'react/components/BlockLightbox/components/BlockLightboxMetadataPane';

const Container = styled(Box).attrs({
  flexDirection: ['column', 'row', 'row'],
  height: ['unset', '100%', '100%'],
  display: ['block', 'flex', 'flex'],
})`
`;

export default class BlockLightbox extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxFragment).isRequired,
    context: PropTypes.oneOf(['MODAL', 'PAGE']),
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']),
    children: PropTypes.node,
    onClose: PropTypes.func,
  }

  static defaultProps = {
    layout: 'DEFAULT',
    context: 'PAGE',
    children: null,
    onClose: () => null,
  }

  render() {
    const {
      block,
      layout,
      context,
      children,
      onClose,
      ...rest
    } = this.props;

    return (
      <Container {...rest}>
        {block.title &&
          <Title>
            {block.title}
          </Title>
        }

        <BlockLightboxContentPane block={block} layout={layout}>
          {children}
        </BlockLightboxContentPane>

        {layout === 'DEFAULT' &&
          <BlockLightboxMetadataPane
            block={block}
            onClose={onClose}
            pt={context === 'MODAL' ? constants.topBarHeight : undefined}
          />
        }
      </Container>
    );
  }
}
