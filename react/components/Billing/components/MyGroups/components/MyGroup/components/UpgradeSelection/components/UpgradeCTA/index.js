import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import upgradeCTAFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/UpgradeSelection/components/UpgradeCTA/fragments/upgradeCTA';
import userSelectorFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector';

import { PLAN_AMOUNTS, TERMS } from 'react/components/Billing/config';

import Text from 'react/components/UI/Text';
import Count from 'react/components/UI/Count';
import Modal from 'react/components/UI/Modal/Portal';
import PremiumAlert from 'react/components/Billing/components/MyGroups/components/PremiumAlert';
import UserSelection from 'react/components/Billing/components/MyGroups/components/UserSelection';

export default class UpgradeCTA extends PureComponent {
  static propTypes = {
    group: propType(upgradeCTAFragment).isRequired,
    term: PropTypes.oneOf(Object.keys(TERMS)).isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment)).isRequired,
    onAddUser: PropTypes.func.isRequired,
    onRemoveUser: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
  }

  openUserSelection = (e) => {
    e.preventDefault();
    this.setState({ mode: 'modal' });
  }

  closeUsersModal = (e) => {
    e.preventDefault();
    this.setState({ mode: 'resting' });
  }

  render() {
    const {
      term,
      group,
      upgradeableUsers,
      onAddUser,
      onRemoveUser,
      ...rest
    } = this.props;

    const { mode } = this.state;

    return (
      <PremiumAlert {...rest}>
        <Text f={4} color="state.premium" mb={3}>
          <Count amount={upgradeableUsers.length} label="member" />{' '}
          selected = ${((PLAN_AMOUNTS[term] * upgradeableUsers.length) / 100).toFixed(2)} / {term}

          {group.subscription && group.subscription.plan.term !== TERMS[term] &&
            <span>
              {' ('}
              <Count amount={group.subscription.users.length} label="existing member" />{' '}
              change from {group.subscription.plan.term})
            </span>
          }
        </Text>

        <Text f={1} color="state.premium" fontWeight="bold" underlineLinks={false}>
          <a href="#" role="button" tabIndex={0} onClick={this.openUserSelection}>
            Change upgraded members
          </a>
        </Text>

        {mode === 'modal' &&
          <Modal onClose={this.closeUsersModal}>
            <UserSelection
              group={group}
              term={term}
              upgradeableUsers={upgradeableUsers}
              onAddUser={onAddUser}
              onRemoveUser={onRemoveUser}
              onDone={this.closeUsersModal}
            />
          </Modal>
        }
      </PremiumAlert>
    );
  }
}
