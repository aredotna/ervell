import React from 'react'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableDisplay as KonnectableDisplayData } from '__generated__/KonnectableDisplay'

import KonnectableAttachment from 'v2/components/Cell/components/Konnectable/components/KonnectableAttachment'
import KonnectableChannel from 'v2/components/Cell/components/Konnectable/components/KonnectableChannel'
import KonnectableEmbed from 'v2/components/Cell/components/Konnectable/components/KonnectableEmbed'
import KonnectableImage from 'v2/components/Cell/components/Konnectable/components/KonnectableImage'
import KonnectableLink from 'v2/components/Cell/components/Konnectable/components/KonnectableLink'
import KonnectableText from 'v2/components/Cell/components/Konnectable/components/KonnectableText'
import KonnectablePendingBlock from 'v2/components/Cell/components/Konnectable/components/KonnectablePendingBlock'

interface Props {
  konnectable: KonnectableDisplayData
  mode: Mode
}

export const KonnectableDisplay: React.FC<Props> = ({ konnectable, mode }) => {
  switch (konnectable.__typename) {
    case 'Channel':
      return <KonnectableChannel channel={konnectable} />
    case 'Attachment':
      return <KonnectableAttachment attachment={konnectable} />
    case 'Embed':
      return <KonnectableEmbed embed={konnectable} />
    case 'Image':
      return <KonnectableImage image={konnectable} />
    case 'Link':
      return <KonnectableLink link={konnectable} />
    case 'Text':
      return <KonnectableText text={konnectable} mode={mode} />
    case 'PendingBlock':
      return <KonnectablePendingBlock mode={mode} />
  }
}
