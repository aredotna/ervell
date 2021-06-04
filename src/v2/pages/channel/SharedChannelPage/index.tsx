import React from 'react'
import { Query } from '@apollo/client/react/components'

import { SharedChannelPage } from '__generated__/SharedChannelPage'

import sharedChannelPageQuery from 'v2/pages/channel/SharedChannelPage/queries/sharedChannelPage'

import Constrain from 'v2/components/UI/Constrain'
import { BlankTopBarLayout } from 'v2/components/UI/Layouts/BlankTopBarLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import ChannelMetadata from 'v2/components/ChannelMetadata'
import { ChannelContentsWithData } from 'v2/pages/channel/components/ChannelContentsWithData'
import { ChannelPageMetaTags } from 'v2/pages/channel/components/ChannelPageMetaTags'

export default ({ token }) => {
  return (
    <BlankTopBarLayout>
      <Constrain>
        <Query<SharedChannelPage>
          query={sharedChannelPageQuery}
          variables={{ token }}
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
                <ChannelPageMetaTags channel={channel} />

                <ChannelMetadata channel={channel} />

                <ChannelContentsWithData channel={channel} />

                <Box my={9} textAlign="center">
                  <a href="https://www.are.na">
                    <Icons name="ArenaMark" size={7} color="gray.medium" />
                  </a>
                </Box>
              </>
            )
          }}
        </Query>
      </Constrain>
    </BlankTopBarLayout>
  )
}
