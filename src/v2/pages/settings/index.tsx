import React from 'react'
import { Query } from 'react-apollo'
import styled from 'styled-components'
import Helmet from 'react-helmet-async'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import LoadingIndicator from 'v2/components/UI/LoadingIndicator'
import Tabs, { Label } from 'v2/components/UI/LinkTabs'
import Box from 'v2/components/UI/Box'
import AvatarUploader from 'v2/components/AvatarUploader'
import CustomBadgeUploader from 'v2/components/CustomBadgeUploader'

import SettingsPath from 'v2/pages/settings/components/SettingsPath'
import UserSettings from 'v2/components/UserSettings'
import Billing from 'v2/components/Billing'
import GroupBilling from 'v2/components/Billing/components/GroupBilling'

import { SettingsPage as SettingsPageQueryType } from '__generated__/SettingsPage'

import SettingsQuery from 'v2/pages/settings/queries/settingsPage'
import Perks from 'v2/pages/settings/components/Perks'

const TabContent = styled(Box).attrs({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  pt: 8,
})``

const Avatars = styled(Box).attrs({
  flexDirection: ['column', 'row'],
  display: 'flex',
  justifyContent: 'space-around',
  py: 8,
  width: ['auto', '30em'],
  alignItems: 'center',
})``

const PremiumLabel = styled(Label)`
  color: ${x => x.theme.colors.state.premium};
`

interface SettingsPageProps {
  tab: 'general' | 'billing' | 'group_billing' | 'perks'
}

const UserSettingsComponent: React.FC = () => {
  return (
    <>
      <Avatars>
        <AvatarUploader />
        <CustomBadgeUploader />
      </Avatars>
      <UserSettings />
    </>
  )
}

const SettingsPage: React.FC<SettingsPageProps> = ({ tab }) => {
  return (
    <>
      <Helmet>
        <script src="https://js.stripe.com/v3/" />
      </Helmet>
      <TopBarLayout>
        <Constrain>
          <Query<SettingsPageQueryType> query={SettingsQuery}>
            {({ data, loading, error }) => {
              if (error) {
                return <ErrorAlert>{error.message}</ErrorAlert>
              }

              if (loading) return <LoadingIndicator mt={6} f={8} />

              const tabs = [
                {
                  url: '/settings',
                  label: 'General',
                  active: tab === 'general',
                  LabelComponent: null,
                },
                {
                  url: '/settings/billing',
                  label: 'Billing',
                  active: tab === 'billing',
                  LabelComponent: null,
                },
              ]

              if (data.me.groups.length > 0) {
                tabs.push({
                  url: '/settings/group_billing',
                  label: 'Group Billing',
                  active: tab === 'group_billing',
                  LabelComponent: null,
                })
              }

              tabs.push({
                url: '/settings/perks',
                label: 'Perks',
                active: tab === 'perks',
                LabelComponent: PremiumLabel,
              })

              const ContentComponent = {
                general: UserSettingsComponent,
                billing: Billing,
                group_billing: GroupBilling,
                perks: Perks,
              }[tab]

              return (
                <>
                  <SettingsPath />
                  <Tabs tabs={tabs}>
                    <TabContent>
                      <ContentComponent
                        isPremium={data.me.is_premium}
                        isSupporter={data.me.is_supporter}
                        isInvestor={data.me.is_investor}
                      />
                    </TabContent>
                  </Tabs>
                </>
              )
            }}
          </Query>
        </Constrain>
      </TopBarLayout>
    </>
  )
}

export default SettingsPage
