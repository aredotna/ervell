import React from 'react'
import { useParams } from 'react-router'
import { useSearchParams } from 'react-router-dom'

import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import { EmbeddedChannel } from './components/EmbeddedChannel'

const EmbeddedChannelPage: React.FC = () => {
  const params = useParams()
  const { id } = params || {}
  const [searchParams] = useSearchParams()
  const per = parseInt(searchParams.get('per'), 10) || 20
  return (
    <BlankLayout>
      <EmbeddedChannel id={id} per={per} />
    </BlankLayout>
  )
}

export default EmbeddedChannelPage
