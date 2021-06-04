import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'
import styled from 'styled-components'

import blockLightboxEmbedFragment from 'v2/components/BlockLightbox/components/BlockLightboxEmbed/fragments/blockLightboxEmbed'

import Box from 'v2/components/UI/Box'

const Embed = styled(Box)`
  position: relative;
  height: 0;
  overflow: hidden;

  ${props => {
    const ratio = props.embedHeight / props.embedWidth

    let size = 100

    if (ratio > 0.6) size = 75
    if (ratio > 1.0) size = 50

    return `
      width: ${size}%;
      padding-bottom: ${ratio * size}%;
    `
  }}

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    vertical-align: bottom;
  }
`

export default class BlockLightboxEmbed extends PureComponent {
  static propTypes = {
    block: propType(blockLightboxEmbedFragment).isRequired,
    layout: PropTypes.oneOf(['DEFAULT', 'FULLSCREEN']).isRequired,
  }

  render() {
    const { layout, block } = this.props

    return (
      <Box
        width={{ DEFAULT: '90%', FULLSCREEN: '75%' }[layout]}
        height="90%"
        p={6}
        display="flex"
        alignItems="center"
        justifyContent="center"
        overflow="hidden"
      >
        <Embed
          bg={{ DEFAULT: 'gray.hint', FULLSCREEN: 'transparent' }[layout]}
          embedWidth={block.embed_width}
          embedHeight={block.embed_height}
          dangerouslySetInnerHTML={{ __html: block.embed_html }}
        />
      </Box>
    )
  }
}
