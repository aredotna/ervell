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

  state = {
    mode: 'resting',
    errorMessage: null,
    selectedPlan: this.props.group.subscription
      ? this.props.group.subscription.plan.id
      : 'basic',
    upgradeableUsers: this.props.group.subscription
      ? []
      : [...this.props.group.users].filter(user => user.is_upgradeable),
  }

  onAlertClose = () => {
    this.setState({ mode: 'resting' });
  }

  handleErrors = (err) => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    });
  }

  handleSubscribed = () => {
    this.setState({
      mode: 'subscribed',
      upgradeableUsers: [],
    });

    setTimeout(() => {
      this.setState({ mode: 'resting' });
    }, 5000);
  }

  handleCanceled = () => {
    this.setState(prevState => ({
      mode: 'canceled',
      selectedPlan: !this.props.group.subscription
        // If the whole subscription winds up cancelling
        // reset the plan to `basic`
        ? 'basic'
        : prevState.selectedPlan,
    }));

    setTimeout(() => {
      this.setState({ mode: 'resting' });
    }, 5000);
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
        <MyGroupHeader
          mb={7}
          group={group}
          onCanceled={this.handleCanceled}
        />

        {mode === 'subscribed' &&
          <Alert my={6} bg="state.premium" color="white" onClose={this.onAlertClose}>
            Subscribed! You’re all set!
          </Alert>
        }

        {mode === 'canceled' &&
          <Alert my={6} bg="state.alert" color="white" border="none" onClose={this.onAlertClose}>
            Premium subscription(s) canceled.
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
                onSubscribed={this.handleSubscribed}
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
