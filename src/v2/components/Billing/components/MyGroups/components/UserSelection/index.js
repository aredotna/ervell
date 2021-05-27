import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { propType } from 'v2/util/inlinedGraphqlAnywhere'

import userSelectionFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/fragments/userSelection'
import userSelectorFragment from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector'

import { PLAN_AMOUNTS } from 'v2/components/Billing/config'

import TitledDialog from 'v2/components/UI/TitledDialog'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import GroupOwner from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/GroupOwner'
import UserSelector from 'v2/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector'

export default class UserSelection extends PureComponent {
  static propTypes = {
    group: propType(userSelectionFragment).isRequired,
    term: PropTypes.oneOf(['month', 'year']).isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment))
      .isRequired,
    onAddUser: PropTypes.func.isRequired,
    onRemoveUser: PropTypes.func.isRequired,
    onDone: PropTypes.func.isRequired,
  }

  render() {
    const {
      group,
      term,
      upgradeableUsers,
      onAddUser,
      onRemoveUser,
      onDone,
    } = this.props

    const amount =
      upgradeableUsers.length +
      ((group.subscription && group.subscription.users.length) || 0)

    return (
      <TitledDialog title={`Upgrade members of ${group.name}`} onDone={onDone}>
        <Box>
          <GroupOwner user={group.owner} />

          {group.users.map(user => (
            <UserSelector
              key={user.id}
              user={user}
              upgradeableUsers={upgradeableUsers}
              onSelect={onAddUser}
              onDeselect={onRemoveUser}
            />
          ))}
        </Box>

        <Box p={6} my={7} textAlign="center">
          <Text color="state.premium" fontWeight="bold">
            <Count amount={amount} label="member" /> selected = $
            {((PLAN_AMOUNTS[term] * amount) / 100).toFixed(2)} / {term}
          </Text>
        </Box>
      </TitledDialog>
    )
  }
}
