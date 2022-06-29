import React from 'react'
import { useParams } from 'react-router'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { EmbeddedChannel } from './components/EmbeddedChannel'

const EmbeddedChannelPage: React.FC = () => {
  const params = useParams()
  const { id, per } = params || {}
  return (
    <BlankLayout>
      <EmbeddedChannel id={id} per={parseInt(per)} />
    </BlankLayout>
  )
}

export default EmbeddedChannelPage
