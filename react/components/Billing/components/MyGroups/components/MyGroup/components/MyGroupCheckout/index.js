import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { graphql } from 'react-apollo';

import billingQuery from 'react/components/Billing/queries/billing';

import myGroupCheckoutFragment from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/fragments/myGroupCheckout';
import userSelectorFragment from 'react/components/Billing/components/MyGroups/components/UserSelection/components/UserSelector/fragments/userSelector';

import subscribeToPremiumForUsersMutation from 'react/components/Billing/components/MyGroups/components/MyGroup/components/MyGroupCheckout/mutations/subscribeToPremiumForUsers';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import Count from 'react/components/UI/Count';
import GenericButton from 'react/components/UI/GenericButton';
import { LabelledInput, Label } from 'react/components/UI/Inputs';
import CouponCode from 'react/components/Billing/components/CouponCode';
import CreditCard from 'react/components/Billing/components/CreditCard';
import PlanChanges from 'react/components/Billing/components/PlanChanges';
import StatusOverlay from 'react/components/Billing/components/StatusOverlay';

class MyGroupCheckout extends PureComponent {
  static propTypes = {
    me: propType(myGroupCheckoutFragment).isRequired,
    group: PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    }).isRequired,
    selectedPlan: PropTypes.oneOf(['basic', 'monthly', 'yearly']).isRequired,
    subscribeToPremiumForUsers: PropTypes.func.isRequired,
    upgradeableUsers: PropTypes.arrayOf(propType(userSelectorFragment)).isRequired,
    onSubscribed: PropTypes.func.isRequired,
    onError: PropTypes.func.isRequired,
  }

  state = {
    mode: 'resting',
    coupon_code: '',
  }

  handleCouponCode = coupon_code =>
    this.setState({ coupon_code });

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({ mode: 'processing' });

    const {
      me: { customer },
      group: { id: group_id },
      selectedPlan,
      upgradeableUsers,
      subscribeToPremiumForUsers,
      onSubscribed,
      onError,
    } = this.props;
    const { coupon_code } = this.state;

    const user_ids = upgradeableUsers.map(({ id }) => id);

    return subscribeToPremiumForUsers({
      variables: {
        group_id,
        user_ids,
        token: customer.default_credit_card.id,
        plan_id: selectedPlan.toUpperCase(),
        coupon_code,
      },
      refetchQueries: [{ query: billingQuery }],
      awaitRefetchQueries: true,
    })
      .then(() => {
        this.setState({
          mode: 'resting',
          coupon_code: '',
        });

        return onSubscribed();
      })
      .catch((err) => {
        this.setState({ mode: 'resting' });

        return onError(err);
      });
  }

  render() {
    const { mode, coupon_code } = this.state;
    const {
      me: { customer },
      group,
      selectedPlan,
      upgradeableUsers,
    } = this.props;

    return (
      <Box>
        {mode === 'processing' &&
          <StatusOverlay>
            <LoadingIndicator f={9} />
          </StatusOverlay>
        }

        {selectedPlan !== 'basic' &&
          <form onSubmit={this.handleSubmit}>
            <LabelledInput>
              <Label>
                Billed to
              </Label>

              <CreditCard customer={customer} />
            </LabelledInput>

            <LabelledInput>
              <Label>
                Coupon
              </Label>

              <CouponCode
                key={`coupon_${mode}`}
                onDebouncedCode={this.handleCouponCode}
                code={coupon_code}
              />
            </LabelledInput>

            {upgradeableUsers.length > 0 &&
              <LabelledInput>
                <Label />

                <PlanChanges
                  entity={group}
                  plan_id={selectedPlan}
                  coupon_code={coupon_code}
                  quantity={upgradeableUsers.length}
                />
              </LabelledInput>
            }

            <LabelledInput>
              <Label />

              <div>
                <GenericButton
                  onClick={this.handleSubmit}
                  disabled={(upgradeableUsers.length === 0 || !customer.default_credit_card)}
                >
                  {upgradeableUsers.length > 0
                    ? <span>Activate <Count amount={upgradeableUsers.length} label="Premium subscription" /></span>
                    : 'Activate'
                  }
                </GenericButton>
              </div>
            </LabelledInput>
          </form>
        }
      </Box>
    );
  }
}

export default graphql(subscribeToPremiumForUsersMutation, {
  name: 'subscribeToPremiumForUsers',
})(MyGroupCheckout);
