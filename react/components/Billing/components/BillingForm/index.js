import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { injectStripe } from 'react-stripe-elements';
import { compose, graphql } from 'react-apollo';

import mapErrors from 'react/util/mapErrors';

import billingQuery from 'react/components/Billing/queries/billing';

import subscribeToPremiumMutation from 'react/components/Billing/components/BillingForm/mutations/subscribeToPremium';
import cancelPremiumSubscriptionMutation from 'react/components/Billing/components/BillingForm/mutations/cancelPremiumSubscription';
import applyCouponToSubscriptionMutation from 'react/components/Billing/components/BillingForm/mutations/applyCouponToSubscription';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';
import Alert from 'react/components/UI/Alert';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import GenericButton from 'react/components/UI/GenericButton';
import Icons from 'react/components/UI/Icons';
import PlanSelection from 'react/components/Billing/components/PlanSelection';
import CouponCode from 'react/components/Billing/components/CouponCode';
import CreditCard from 'react/components/Billing/components/CreditCard';
import PlanChanges from 'react/components/Billing/components/PlanChanges';
import CancellationNotice from 'react/components/Billing/components/CancellationNotice';
import CancelPremium from 'react/components/Billing/components/CancelPremium';
import StatusOverlay from 'react/components/Billing/components/StatusOverlay';

const OPERATIONS = {
  CHANGE_PLAN_ID: 'CHANGE_PLAN_ID',
  CANCEL_PREMIUM_SUBSCRIPTION: 'CANCEL_PREMIUM_SUBSCRIPTION',
  APPLY_COUPON_CODE: 'APPLY_COUPON_CODE',
};

class BillingForm extends PureComponent {
  static propTypes = {
    subscribeToPremium: PropTypes.func.isRequired,
    cancelPremiumSubscription: PropTypes.func.isRequired,

    applyCouponToSubscription: PropTypes.func.isRequired,
    me: propType(billingFormFragment).isRequired,
  }

  state = {
    mode: 'resting',
    errorMessage: null,
    operations: [],

    plan_id: this.props.me.customer.plan.id,
    coupon_code: '',
  }

  doWeNeedTo = operationName =>
    this.state.operations.includes(OPERATIONS[operationName])

  addOperation = (currentOperations = [], operationName) =>
    [...new Set([...currentOperations, OPERATIONS[operationName]])];

  removeOperation = (currentOperations, operationName) => {
    const set = new Set(currentOperations);
    set.delete(OPERATIONS[operationName]);
    return [...set];
  }

  applyCouponToSubscription = () => {
    const { applyCouponToSubscription } = this.props;
    const { coupon_code } = this.state;

    return applyCouponToSubscription({
      variables: { coupon_code },
    });
  }

  subscribeToPremium = () => {
    const { plan_id, coupon_code } = this.state;
    const { subscribeToPremium, me: { customer } } = this.props;

    if (!customer.default_credit_card) {
      return Promise.reject(new Error('Please add a credit card to continue'));
    }

    return subscribeToPremium({
      variables: {
        coupon_code,
        plan_id: plan_id.toUpperCase(),
        token: customer.default_credit_card.id,
      },
      refetchQueries: [{ query: billingQuery }],
      awaitRefetchQueries: true,
    });
  }

  handleErrors = (err) => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    });
  }

  handlePlan = (plan_id) => {
    const { me: { customer } } = this.props;

    if (plan_id === customer.plan.id) {
      return this.setState(prevState => ({
        plan_id,
        operations: this.removeOperation(prevState.operations, 'CHANGE_PLAN_ID'),
      }));
    }

    return this.setState(prevState => ({
      plan_id,
      operations: this.addOperation(prevState.operations, 'CHANGE_PLAN_ID'),
    }));
  }

  handleCouponCode = (coupon_code) => {
    this.setState(prevState => ({
      coupon_code,
      operations: this[coupon_code === '' ? 'removeOperation' : 'addOperation'](prevState.operations, 'APPLY_COUPON_CODE'),
    }));
  }

  handleReenable = (e) => {
    const { me: { customer } } = this.props;

    if (customer.is_beneficiary) {
      return this.setState({
        mode: 'error',
        errorMessage: 'Contact your group administrator',
      });
    }

    return this.setState(prevState => ({
      plan_id: customer.plan.id,
      operations: this.addOperation(prevState.operations, 'CHANGE_PLAN_ID'),
    }), () => this.handleSubmit(e));
  }

  handleCancelPremium = (e) => {
    this.setState(prevState => ({
      operations: this.addOperation(prevState.operations, 'CANCEL_PREMIUM_SUBSCRIPTION'),
    }), () => {
      this.handleSubmit(e);
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { plan_id } = this.state;
    const { cancelPremiumSubscription } = this.props;

    this.setState({ mode: 'processing' });

    if (
      this.doWeNeedTo('CANCEL_PREMIUM_SUBSCRIPTION') ||
      // If we are changing to `basic`, then we are actually cancelling.
      // Nothing else needs to happen so return.
      (this.doWeNeedTo('CHANGE_PLAN_ID') && plan_id === 'basic')
    ) {
      return cancelPremiumSubscription()
        .then(() => this.resolveWithMode('canceled'))
        .catch(this.handleErrors);
    }

    // Otherwise we are subscribing.
    const waitForCouponCode = (
      this.doWeNeedTo('APPLY_COUPON_CODE') &&
      // APPLY_COUPON_CODE is inclusive with swtiching plans so ignore this
      // if we are also going to change the plan up
      !this.doWeNeedTo('CHANGE_PLAN_ID')
    ) ? this.applyCouponToSubscription() : Promise.resolve();

    return waitForCouponCode
      .then(() => {
        // Now we can change the plan id if we need to
        if (this.doWeNeedTo('CHANGE_PLAN_ID')) {
          return this.subscribeToPremium();
        }
        return null;
      })
      .then(() => {
        const resolution = this.doWeNeedTo('CHANGE_PLAN_ID') ? 'subscribed' : 'card_changed';
        return this.resolveWithMode(resolution);
      })
      .catch(this.handleErrors);
  }

  resolveWithMode = (mode) => {
    this.setState({
      mode,
      // Reset remaining state
      coupon_code: '',
      errorMessage: null,
      operations: [],
    });

    setTimeout(() =>
      this.setState({ mode: 'resting' }), 10000);
  }

  render() {
    const {
      mode,
      errorMessage,
      plan_id,
      coupon_code,
      operations,
    } = this.state;
    const { me, me: { customer } } = this.props;

    const isPlanChanged = plan_id !== customer.plan.id;
    const fromPlanToPlan = `${customer.plan.id}:${plan_id}`;

    return (
      <Box>
        {mode === 'processing' &&
          <StatusOverlay>
            <LoadingIndicator f={9} />
          </StatusOverlay>
        }

        {mode === 'subscribed' &&
          <Alert mb={6} bg="state.premium" color="white" isCloseable={false}>
            Subscribed! You’re all set!
          </Alert>
        }

        {mode === 'card_changed' &&
          <Alert mb={6} bg="state.neutral" isCloseable={false}>
            Billing details updated! You’re all set!
          </Alert>
        }

        {mode === 'error' &&
          <ErrorAlert mb={6} isReloadable={false}>
            {errorMessage}
          </ErrorAlert>
        }

        <form onSubmit={this.handleSubmit}>
          <Box display="flex" flexDirection={['column', 'column', 'row']}>
            <Box flex="1" borderBottom="1px solid" borderColor="gray.semiLight" pb={6} mr={[0, 0, 6]}>
              <Box borderBottom="1px solid" borderColor="gray.semiLight" pb={6} mb={6}>
                <Text f={4} fontWeight="bold">
                  Plan type
                </Text>
              </Box>

              {customer.is_canceled &&
                <CancellationNotice
                  my={6}
                  customer={customer}
                  onReenable={this.handleReenable}
                />
              }

              <PlanSelection
                key={customer.plan.id + customer.is_canceled}
                me={me}
                onSelect={this.handlePlan}
              />

              {customer.is_beneficiary &&
                <React.Fragment>
                  <Box bg="gray.hint" p={6} mb={6} borderRadius="0.25em">
                    <Text>
                      {customer.patron.name} ({customer.patron.hidden_email})
                    </Text>
                  </Box>

                  <Text f={1} mx={6}>
                    {customer.patron.name} is upgrading you to {customer.plan.term} Premium
                    <br />
                    {customer.is_canceled
                      ? `Subscription ends on ${customer.current_period_end_at}`
                      : `Automatically renews on ${customer.current_period_end_at}`
                    }
                  </Text>
                </React.Fragment>
              }
            </Box>

            {plan_id !== 'basic' && !customer.is_lifetime && !customer.is_beneficiary &&
              <Box flex="1" ml={[0, 0, 6]}>
                <Box borderBottom="1px solid" borderColor="gray.semiLight" pb={6} mb={6} mt={[8, 8, 0]}>
                  <Text f={4} fontWeight="bold">
                    Billing
                  </Text>
                </Box>

                <CreditCard mb={8} customer={customer} />

                {!customer.is_canceled &&
                  <CouponCode
                    mb={6}
                    key={`coupon_${mode}`}
                    onDebouncedCode={this.handleCouponCode}
                    code={coupon_code}
                  />
                }

                {((coupon_code !== '') || isPlanChanged) &&
                  <PlanChanges
                    entity={customer}
                    plan_id={plan_id}
                    coupon_code={coupon_code}
                  />
                }
              </Box>
            }
          </Box>

          {(!customer.is_canceled && !customer.is_lifetime && !customer.is_beneficiary && fromPlanToPlan !== 'basic:basic') &&
            <Box width="100%" textAlign="center" mt={8}>
              <GenericButton
                display="block"
                f={4}
                onClick={this.handleSubmit}
                disabled={(
                  (!customer.default_credit_card) ||
                  (operations.length === 0)
                )}
              >
                <Icons name="CreditCard" size="1rem" mr={4} />

                {{
                  'basic:monthly': 'Activate',
                  'basic:yearly': 'Activate',
                  'monthly:yearly': 'Save changes',
                  'yearly:monthly': 'Save changes',
                  'monthly:basic': 'Cancel Premium',
                  'yearly:basic': 'Cancel Premium',
                }[fromPlanToPlan] || 'Save changes'}
              </GenericButton>

              {plan_id !== 'basic' && customer.plan.id !== 'basic' &&
                <CancelPremium my={6} onCancel={this.handleCancelPremium} />
              }
            </Box>
          }
        </form>
      </Box>
    );
  }
}

export default injectStripe(compose(
  graphql(subscribeToPremiumMutation, { name: 'subscribeToPremium' }),
  graphql(cancelPremiumSubscriptionMutation, { name: 'cancelPremiumSubscription' }),
  graphql(applyCouponToSubscriptionMutation, { name: 'applyCouponToSubscription' }),
)(BillingForm));
