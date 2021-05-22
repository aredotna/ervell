import React from 'react'
import { Query } from '@apollo/client/react/components'
import styled from 'styled-components'

import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Tabs from 'v2/components/UI/LinkTabs'
import Box from 'v2/components/UI/Box'

import ToolsPath from 'v2/pages/tools/components/ToolsPath'
import { ExtensionTab } from 'v2/pages/tools/components/ExtensionTab'
import { FindFriendsTab } from 'v2/pages/tools/components/FindFriendsTab'
import { AddViaEmailTab } from 'v2/pages/tools/components/AddViaEmailTab'
import { SendInviteTab } from 'v2/pages/tools/components/SendInviteTab'

import { ToolsPage as ToolsPageQueryType } from '__generated__/ToolsPage'
import ToolsQuery from 'v2/pages/tools/queries/toolsPage'

const TabContent = styled(Box).attrs({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pt: 8,
})``

interface ToolsPageProps {
  tab: 'bookmarklet' | 'find-friends' | 'add-via-email' | 'send-invitation'
}

export const ToolsPage: React.FC<ToolsPageProps> = ({ tab }) => {
  return (
    <TopBarLayout>
      <Constrain>
        <Query<ToolsPageQueryType> query={ToolsQuery}>
          {({ data, loading, error }) => {
            if (error) {
              return <ErrorAlert>{error.message}</ErrorAlert>
            }

            if (loading) return <LoadingIndicator mt={6} f={8} />

            const tabs = [
              {
                url: '/tools',
                label: 'Extension',
                active: tab === 'bookmarklet',
                LabelComponent: null,
              },
              {
                url: '/tools/find-friends',
                label: 'Find Friends',
                active: tab === 'find-friends',
                LabelComponent: null,
              },
              {
                url: '/tools/add-via-email',
                label: 'Add via Email',
                active: tab === 'add-via-email',
                LabelComponent: null,
              },
              {
                url: '/tools/send-invitation',
                label: 'Invite a friend',
                active: tab === 'send-invitation',
                LabelComponent: null,
              },
            ]

            const ContentComponent = {
              bookmarklet: ExtensionTab,
              'find-friends': FindFriendsTab,
              'add-via-email': AddViaEmailTab,
              'send-invitation': SendInviteTab,
            }[tab]

            return (
              <>
                <ToolsPath />
                <Tabs tabs={tabs}>
                  <TabContent>
                    <ContentComponent me={data.me} />
                  </TabContent>
                </Tabs>
              </>
            )
          }}
        </Query>
      </Constrain>
    </TopBarLayout>
  )
}
