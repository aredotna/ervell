import React, { useState } from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import Link from 'v2/components/UI/Link'
import { FullBlockImage_Image } from '__generated__/FullBlockImage'

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

interface FullBlockImageProps {
  block: FullBlockImage_Image
  layout: 'DEFAULT' | 'FULLSCREEN'
}

export const FullBlockImage: React.FC<FullBlockImageProps> = ({
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
      <Image
        src={block.image_url}
        alt={block.alt_text || block.title}
        title={block.title}
      />
      <ImageOverlay
        src={src}
        alt={block.alt_text}
        title={block.title}
        onMouseDown={onMouseDown}
      />

      {layout === 'FULLSCREEN' && block.title && (
        <Text
          mt={6}
          f={5}
          lineHeight={2}
          color="gray.regular"
          fontWeight="bold"
          textAlign="center"
        >
          {block.title}
        </Text>
      )}
    </Link>
  )
}

export default FullBlockImage
