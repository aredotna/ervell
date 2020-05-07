import React, { PureComponent } from 'react'
import styled from 'styled-components'
import { unescape } from 'underscore'

import constants from 'v2/styles/constants'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'

import Box from 'v2/components/UI/Box'
import Title from 'v2/components/UI/Head/components/Title'
import BlockLightboxContentPane from 'v2/components/BlockLightbox/components/BlockLightboxContentPane'
import BlockLightboxMetadataPane from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane'
import { SplitPane } from 'v2/components/UI/SplitPane'

const Container = styled(Box).attrs({
  flexDirection: ['column', 'row', 'row'],
  height: ['unset', '100%', '100%'],
  display: ['block', 'flex', 'flex'],
})``

export type LightboxContext = 'MODAL' | 'PAGE'
export type LightboxLayout = 'DEFAULT' | 'FULLSCREEN'

interface BlockLightboxProps {
  block: Block
  context: LightboxContext
  layout: LightboxLayout
  children: React.ReactNode
}

export default class BlockLightbox extends PureComponent<BlockLightboxProps> {
  static defaultProps = {
    layout: 'DEFAULT',
    context: 'PAGE',
    children: null,
  }

  render() {
    const { block, layout, context, children, ...rest } = this.props

    return (
      <>
        <Container {...rest}>
          {/* {block.title && <Title>{unescape(block.title)}</Title>} */}

          <SplitPane context={context} layout={layout}>
            <BlockLightboxContentPane block={block} layout={layout}>
              {children}
            </BlockLightboxContentPane>

            {layout === 'DEFAULT' && (
              <BlockLightboxMetadataPane
                block={block}
                pt={context === 'MODAL' ? constants.topBarHeight : undefined}
              />
            )}
          </SplitPane>
        </Container>
      </>
    )
  }
}
