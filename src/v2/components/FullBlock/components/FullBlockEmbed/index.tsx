import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { LightboxLayout } from 'v2/components/FullBlockLayout'
import { FullBlockEmbed_Embed } from '__generated__/FullBlockEmbed'

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

interface FullBlockEmbedProps {
  layout?: LightboxLayout
  block: FullBlockEmbed_Embed
}

export const FullBlockEmbed: React.FC<FullBlockEmbedProps> = ({
  layout = 'DEFAULT',
  block,
}) => {
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

export default FullBlockEmbed
