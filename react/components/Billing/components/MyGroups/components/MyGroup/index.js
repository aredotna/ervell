import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import Box from 'react/components/UI/Box';
import Pre from 'react/components/UI/Pre';
import PremiumAlert from 'react/components/Billing/components/MyGroups/components/PremiumAlert';
import MyGroupHeader from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader';
import UpgradeSelection from 'react/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection';

import groupFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/fragments/myGroup';

export default class MyGroup extends PureComponent {
  static propTypes = {
    group: propType(groupFragment).isRequired,
  }

  state = {
    selectedPlan: 'basic',
    // Starts out with all the users that aren't premium
    upgradeableUsers: [
      this.props.group.user,
      ...this.props.group.users,
    ].filter(user => !user.is_premium),
  }

  selectPlan = (selectedPlan) => {
    this.setState({ selectedPlan });
  }

  addUser = (user) => {
    const { upgradeableUsers } = this.state;

    return this.setState({
      upgradeableUsers: [...upgradeableUsers, user],
    });
  }

  removeUser = (user) => {
    const { upgradeableUsers } = this.state;

    const nextUpgradeableUsers = upgradeableUsers.filter(upgradeableUser =>
      upgradeableUser.id !== user.id);

    return this.setState({ upgradeableUsers: nextUpgradeableUsers });
  }

  render() {
    const { upgradeableUsers, selectedPlan } = this.state;
    const { group, ...rest } = this.props;

    return (
      <Box {...rest}>
        <MyGroupHeader group={group} mb={7} />

        {group.is_premium
          ? (
            <PremiumAlert>
              Everyone in your group has Premium ;-)
            </PremiumAlert>
          )
          : (
            <UpgradeSelection
              key={selectedPlan}
              group={group}
              selectedPlan={selectedPlan}
              upgradeableUsers={upgradeableUsers}
              onSelect={this.selectPlan}
              onAddUser={this.addUser}
              onRemoveUser={this.removeUser}
            />
          )
        }

        <Box mt={8} p={6} bg="gray.hint" style={{ overflowX: 'auto' }}>
          <Pre f={1}>
            {JSON.stringify(this.state, null, 2)}
          </Pre>
        </Box>
      </Box>
    );
  }
}
