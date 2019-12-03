import React from 'react'
import { RouteProps } from 'react-router'

import Constrain from 'v2/components/UI/Constrain'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Tabs from 'v2/components/UI/LinkTabs'
import SettingsPath from 'v2/pages/settings/components/SettingsPath'
import UserSettings from 'v2/components/UserSettings'

const SettingsPage: React.FC<RouteProps> = () => {
  const tabs = [
    { url: '/settings', label: 'General', active: true },
    { url: '/settings/billing', label: 'Billing' },
    { url: '/settings/group_billing', label: 'Group Billing' },
  ]
  return (
    <TopBarLayout>
      <Constrain>
        <SettingsPath />
        <Tabs tabs={tabs}>
          <UserSettings />
        </Tabs>
      </Constrain>
    </TopBarLayout>
  )
}

export default SettingsPage
