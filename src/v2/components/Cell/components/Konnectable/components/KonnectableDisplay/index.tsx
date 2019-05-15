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
  return {
    Attachment: () => (
      <KonnectableAttachment attachment={konnectable} mode={mode} />
    ),
    Channel: () => (
      // @ts-ignore
      <KonnectableChannel channel={konnectable} mode={mode} />
    ),
    Embed: () => <KonnectableEmbed embed={konnectable} mode={mode} />,
    Image: () => <KonnectableImage image={konnectable} mode={mode} />,
    Link: () => <KonnectableLink link={konnectable} mode={mode} />,
    Text: () => (
      // @ts-ignore
      <KonnectableText text={konnectable} mode={mode} />
    ),
    PendingBlock: () => <KonnectablePendingBlock mode={mode} />,
  }[konnectable.__typename]()
}
