import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import userSelectionFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/fragments/userSelection';
import userSelectorFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector';

import { PLAN_AMOUNTS } from 'react/components/Billing/config';

import TitledDialog from 'react/components/UI/TitledDialog';
import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Count from 'react/components/UI/Count';
import GroupOwner from 'react/components/Billing/components/MyGroups/components/UserSelection/components/GroupOwner';
import UserSelector from 'react/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector';

export default class UserSelection extends PureComponent {
  static propTypes = {
    group: propType(userSelectionFragment).isRequired,
    term: PropTypes.oneOf(['month', 'year']).isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment)).isRequired,
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
    } = this.props;

    const amount = upgradeableUsers.length +
      ((group.subscription && group.subscription.users.length) || 0);

    return (
      <TitledDialog
        title={`Upgrade members of ${group.name}`}
        onDone={onDone}
      >
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

        <Box
          p={6}
          my={7}
          borderRadius="0.25em"
          borderColor="state.premium"
          border="1px
          solid"
          textAlign="center"
        >
          <Text color="state.premium">
            <Count amount={amount} label="member" />
            {' '}
            selected = ${((PLAN_AMOUNTS[term] * amount) / 100).toFixed(2)} / {term}
          </Text>
        </Box>
      </TitledDialog>
    );
  }
}
