import React from 'react'

import {
  ChannelContents_initial_contents,
  ChannelContents_initial_contents_Image,
  ChannelContents_initial_contents_Link,
  ChannelContents_initial_contents_Embed,
  ChannelContents_initial_contents_Attachment,
} from '__generated__/ChannelContents'
import Image from 'v2/components/UI/Head/components/Image'

interface Props {
  initialContents: ChannelContents_initial_contents[]
}
type ChannelContentsThumbnail =
  | ChannelContents_initial_contents_Image
  | ChannelContents_initial_contents_Link
  | ChannelContents_initial_contents_Embed
  | ChannelContents_initial_contents_Attachment

const isChannelContentsThumbnail = (
  connectable: ChannelContents_initial_contents
): connectable is ChannelContentsThumbnail => {
  return (connectable as ChannelContentsThumbnail).meta_image !== undefined
}

export const ChannelContentsThumbnail: React.FC<Props> = ({
  initialContents,
}) => {
  const { meta_image } = initialContents.filter(isChannelContentsThumbnail)[0]

  return <Image>{meta_image}</Image>
}
