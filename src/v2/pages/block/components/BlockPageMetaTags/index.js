import React from 'react'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import blockPageMetaTagsFragment from 'v2/pages/block/components/BlockPageMetaTags/fragments/blockPageMetaTags'

import Title from 'v2/components/UI/Head/components/Title'
import Description from 'v2/components/UI/Head/components/Description'
import Canonical from 'v2/components/UI/Head/components/Canonical'
import Image from 'v2/components/UI/Head/components/Image'

const BlockPageMetaTags = ({ block }) => (
  <React.Fragment>
    {block.meta_title && <Title>{block.meta_title}</Title>}

    {block.meta_description && (
      <Description>{block.meta_description}</Description>
    )}

    {block.meta_image && !block.is_nsfw && <Image>{block.meta_image}</Image>}

    <Canonical>{block.canonical}</Canonical>
  </React.Fragment>
)

BlockPageMetaTags.propTypes = {
  block: propType(blockPageMetaTagsFragment).isRequired,
}

export default BlockPageMetaTags
