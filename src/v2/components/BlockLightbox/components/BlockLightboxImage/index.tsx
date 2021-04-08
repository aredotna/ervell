import React, { useState } from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import { BlockLightboxImage_Image } from '__generated__/BlockLightboxImage'

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
`

const ImageOverlay = styled(Image)`
  opacity: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`

interface BlockLightboxImageProps {
  block: BlockLightboxImage_Image
  layout: 'DEFAULT' | 'FULLSCREEN'
}

export const BlockLightboxImage: React.FC<BlockLightboxImageProps> = ({
  block,
  layout,
}) => {
  const [src, setSrc] = useState<null | string>(null)
  const onMouseDown = () => {
    setSrc(block.original_image_url)
  }

  return (
    <Link
      width="90%"
      height="95%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      href={block.original_image_url}
      target="_blank"
      rel="nofollow noopener"
      p={6}
    >
      <Image src={block.image_url} alt={block.title} title={block.title} />
      <ImageOverlay
        src={src}
        alt={block.title}
        title={block.title}
        onMouseDown={onMouseDown}
      />

      {layout === 'FULLSCREEN' && block.title && (
        <Text
          mt={6}
          f={5}
          lineHeight={2}
          color="gray.hint"
          fontWeight="bold"
          textAlign="center"
        >
          {block.title}
        </Text>
      )}
    </Link>
  )
}

export default BlockLightboxImage
