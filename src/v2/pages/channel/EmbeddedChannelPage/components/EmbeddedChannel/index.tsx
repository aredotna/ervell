import React from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import { EmbeddedChannel as EmbeddedChannelData } from '__generated__/EmbeddedChannel'

import embeddedChannelQuery from './queries/embeddedChannel'

import Box, { BoxProps } from 'v2/components/UI/Box'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import { EmbeddedChannelHeader } from '../../components/EmbeddedChannelHeader'
import { EmbeddedChannelContents } from '../../components/EmbeddedChannelContents'
import { EmbeddedChannelCTA } from '../../components/EmbeddedChannelCTA'

const Container = styled(Box).attrs({
  border: '2px solid',
  borderColor: 'gray.light',
  borderRadius: '0.5em',
  bg: 'white',
})`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`

interface Props extends BoxProps {
  id: string
  per: number
}

export const EmbeddedChannel: React.FC<Props> = ({ id, per, ...rest }) => (
  <Container height="100vh" {...rest}>
    <Query<EmbeddedChannelData>
      query={embeddedChannelQuery}
      variables={{ id, per }}
      ssr={false}
    >
      {({ data, loading, error }) => {
        if (loading) {
          return <LoadingIndicator />
        }

        if (error) {
          return <ErrorAlert isReloadable>{error.message}</ErrorAlert>
        }

        const { channel } = data

        return (
          <>
            <EmbeddedChannelHeader channel={channel} />

            <EmbeddedChannelContents channel={channel} />

            <EmbeddedChannelCTA channel={channel} />
          </>
        )
      }}
    </Query>
  </Container>
)
