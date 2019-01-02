import React, { PureComponent } from 'react';
import { propType } from 'graphql-anywhere';

import mapErrors from 'react/util/mapErrors';

import myGroupCheckoutFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout';
import groupFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/fragments/myGroup';

import Box from 'react/components/UI/Box';
import Alert from 'react/components/UI/Alert';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import PremiumAlert from 'react/components/Billing/components/MyGroups/components/PremiumAlert';
import MyGroupHeader from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupHeader';
import UpgradeSelection from 'react/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection';
import MyGroupCheckout from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout';

export default class MyGroup extends PureComponent {
  static propTypes = {
    me: propType(myGroupCheckoutFragment).isRequired,
    group: propType(groupFragment).isRequired,
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const upgradeableUsers = [...nextProps.group.users].filter(user => user.is_upgradeable);
    const upgradeableUsersKey = upgradeableUsers.map(({ id }) => id).join(':');

    // Reset the upgradeable users if any of their upgradeable status changes
    if (prevState.upgradeableUsersKey !== upgradeableUsersKey) {
      return { upgradeableUsers, upgradeableUsersKey };
    }

    return null;
  }

  state = {
    mode: 'resting',
    errorMessage: null,
    selectedPlan: 'basic',
    // eslint-disable-next-line react/no-unused-state
    upgradeableUsersKey: null,
    upgradeableUsers: [],
  }

  setMode = mode => () => {
    this.setState({ mode });
  }

  handleErrors = (err) => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    });
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
    const {
      mode,
      errorMessage,
      upgradeableUsers,
      selectedPlan,
    } = this.state;
    const { me, group, ...rest } = this.props;

    return (
      <Box {...rest}>
        <MyGroupHeader group={group} mb={7} />

        {mode === 'subscribed' &&
          <Alert my={6} bg="state.premium" color="white" isCloseable={false}>
            Subscribed! You’re all set!
          </Alert>
        }

        {mode === 'error' &&
          <ErrorAlert my={6} isReloadable={false}>
            {errorMessage}
          </ErrorAlert>
        }

        {group.is_upgradeable
          ? (
            <div>
              <UpgradeSelection
                key={selectedPlan}
                group={group}
                selectedPlan={selectedPlan}
                upgradeableUsers={upgradeableUsers}
                onSelect={this.selectPlan}
                onAddUser={this.addUser}
                onRemoveUser={this.removeUser}
              />

              <MyGroupCheckout
                me={me}
                group={group}
                selectedPlan={selectedPlan}
                upgradeableUsers={upgradeableUsers}
                onSubscribed={this.setMode('subscribed')}
                onError={this.handleErrors}
              />
            </div>
          )
          : (
            <PremiumAlert>
              Everyone in your group has Premium ;-)
            </PremiumAlert>
          )
        }
      </Box>
    );
  }
}
