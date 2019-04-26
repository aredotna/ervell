import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'graphql-anywhere'
import styled from 'styled-components'

import constants from 'v2/styles/constants'

import blockLightboxFragment from 'v2/components/BlockLightbox/fragments/blockLightbox'

import Box from 'v2/components/UI/Box'
import Title from 'v2/components/UI/Head/components/Title'
import BlockLightboxContentPane from 'v2/components/BlockLightbox/components/BlockLightboxContentPane'
import BlockLightboxMetadataPane from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane'

const Container = styled(Box).attrs({
  flexDirection: ['column', 'row', 'row'],
  height: ['unset', '100%', '100%'],
  display: ['block', 'flex', 'flex'],
})``

export default class BlockLightbox extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxFragment).isRequired,
    context: PropTypes.oneOf(['MODAL', 'PAGE']),
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']),
    children: PropTypes.node,
  }

  static defaultProps = {
    layout: 'DEFAULT',
    context: 'PAGE',
    children: null,
  }

  render() {
    const { block, layout, context, children, ...rest } = this.props

    return (
      <Container {...rest}>
        {block.title && <Title>{block.title}</Title>}

        <BlockLightboxContentPane block={block} layout={layout}>
          {children}
        </BlockLightboxContentPane>

        {layout === 'DEFAULT' && (
          <BlockLightboxMetadataPane
            block={block}
            pt={context === 'MODAL' ? constants.topBarHeight : undefined}
          />
        )}
      </Container>
    )
  }
}
