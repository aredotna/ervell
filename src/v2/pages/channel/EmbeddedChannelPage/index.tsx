import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'

import { EmbeddedChannelPage as EmbeddedChannelPageData } from '__generated__/EmbeddedChannelPage'

import embeddedChannelPageQuery from 'v2/pages/channel/EmbeddedChannelPage/queries/embeddedChannelPage'

import Box from 'v2/components/UI/Box'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import { EmbeddedChannelHeader } from './components/EmbeddedChannelHeader'
import { EmbeddedChannelContents } from './components/EmbeddedChannelContents'
import { EmbeddedChannelCTA } from './components/EmbeddedChannelCTA'

const Container = styled(Box).attrs({
  border: '2px solid',
  borderColor: 'gray.light',
  borderRadius: '0.5em',
})`
  position: relative;
  height: 100vh;
  overflow: hidden;
`

export default ({ id }) => {
  return (
    <BlankLayout>
      <Container>
        <Query<EmbeddedChannelPageData>
          query={embeddedChannelPageQuery}
          variables={{ id }}
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
    </BlankLayout>
  )
}
