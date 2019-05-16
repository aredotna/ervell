import React from 'react'
import { Query } from 'react-apollo'

import { SharedChannelPage } from '__generated__/SharedChannelPage'

import sharedChannelPageQuery from 'v2/pages/channel/SharedChannelPage/queries/sharedChannelPage'

import Constrain from 'v2/components/UI/Constrain'
import { BlankTopBarLayout } from 'v2/components/UI/Layouts/BlankTopBarLayout'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import ChannelMetadata from 'v2/components/ChannelMetadata'
import ChannelContents from 'v2/components/ChannelContents'

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
                <ChannelMetadata channel={channel} />

                <ChannelContents channel={channel} />

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
