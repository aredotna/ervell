import React from 'react'

import StripeContext from 'v2/components/StripeContext'
import MyGroup from 'v2/components/Billing/components/MyGroups/components/MyGroup'

import {
  GroupBilling_me,
  GroupBilling_me_groups,
} from '__generated__/GroupBilling'

interface MyGroupsProps {
  groups: GroupBilling_me_groups[]
  me: GroupBilling_me
}

export const MyGroups: React.FC<MyGroupsProps> = ({ groups, me }) => {
  return (
    <>
      {groups.map(group => (
        <StripeContext>
          <MyGroup me={me} group_id={group.id} />
        </StripeContext>
      ))}
    </>
  )
}

export default MyGroups
