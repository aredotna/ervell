import React from 'react'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { EmbeddedChannel } from './components/EmbeddedChannel'

interface Props {
  id: string
  per: number
}

const EmbeddedChannelPage: React.FC<Props> = ({ id, per }) => {
  return (
    <BlankLayout>
      <EmbeddedChannel id={id} per={per} />
    </BlankLayout>
  )
}

export default EmbeddedChannelPage
