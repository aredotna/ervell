import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';

import mapErrors from 'react/util/mapErrors';

import billingQuery from 'react/components/Billing/queries/billing';

import cancelPremiumUserSelectionFragment from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/fragments/cancelPremiumUserSelection';

import cancelPremiumSubscriptionsMutation from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/mutations/cancelPremiumSubscriptions';

import TitledDialog from 'react/components/UI/TitledDialog';
import Box from 'react/components/UI/Box';
import Count from 'react/components/UI/Count';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import CancelPremiumUserSelector from 'react/components/Billing/components/MyGroups/components/CancelPremiumUserSelection/components/CancelPremiumUserSelector';

class CancelPremiumUserSelection extends PureComponent {
  static propTypes = {
    group: propType(cancelPremiumUserSelectionFragment).isRequired,
    onClose: PropTypes.func.isRequired,
    onCanceled: PropTypes.func.isRequired,
    cancelPremiumSubscriptions: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    errorMessage: null,
    // Anyone who is premium and cancellable
    cancellableUsers: [...this.props.group.users].filter(user => (
      user.is_premium &&
        !user.is_canceled &&
        user.can.cancel_premium
    )),
  }

  addUser = (user) => {
    const { cancellableUsers } = this.state;
    return this.setState({
      cancellableUsers: [...cancellableUsers, user],
    });
  }

  removeUser = (user) => {
    const { cancellableUsers } = this.state;
    const nextCancellableUsers = cancellableUsers.filter(cancellableUser =>
      cancellableUser.id !== user.id);
    return this.setState({ cancellableUsers: nextCancellableUsers });
  }

  cancelPremium = (e) => {
    e.preventDefault();

    const { onClose, onCanceled, cancelPremiumSubscriptions } = this.props;
    const { cancellableUsers } = this.state;

    if (cancellableUsers.length === 0) return onClose();

    this.setState({ mode: 'cancelling' });

    const user_ids = cancellableUsers.map(({ id }) => id);

    return cancelPremiumSubscriptions({
      variables: { user_ids },
      refetchQueries: [{ query: billingQuery }],
      awaitRefetchQueries: true,
    })
      .then(() => {
        onCanceled();
        onClose();
      })
      .catch((err) => {
        this.setState({
          mode: 'error',
          ...mapErrors(err),
        });
      });
  }

  render() {
    const { cancellableUsers, mode, errorMessage } = this.state;
    const { group } = this.props;

    return (
      <TitledDialog
        title={`Cancel Premium for ${group.name}`}
        onDone={this.cancelPremium}
        disabled={mode === 'cancelling'}
        label={{
          resting_true: <span>Cancel <Count amount={cancellableUsers.length} label="Premium" /></span>,
          resting_false: 'Done',
          cancelling_true: <span>Canceling <Count amount={cancellableUsers.length} label="Premium" /></span>,
        }[`${mode}_${cancellableUsers.length > 0}`]}
      >
        {mode === 'error' &&
          <ErrorAlert>
            {errorMessage}
          </ErrorAlert>
        }

        <Box>
          {group.users.map(user => (
            <CancelPremiumUserSelector
              key={user.id}
              user={user}
              cancellableUsers={cancellableUsers}
              onSelect={this.addUser}
              onDeselect={this.removeUser}
            />
          ))}
        </Box>
      </TitledDialog>
    );
  }
}

export default graphql(cancelPremiumSubscriptionsMutation, {
  name: 'cancelPremiumSubscriptions',
})(CancelPremiumUserSelection);
