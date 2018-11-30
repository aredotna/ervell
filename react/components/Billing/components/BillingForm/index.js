import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';
import { injectStripe } from 'react-stripe-elements';
import { compose, graphql } from 'react-apollo';

import mapErrors from 'react/util/mapErrors';

import subscribeToPremiumMutation from 'react/components/Billing/components/BillingForm/mutations/subscribeToPremium';
import cancelPremiumSubscriptionMutation from 'react/components/Billing/components/BillingForm/mutations/cancelPremiumSubscription';
import addCreditCardMutation from 'react/components/Billing/components/BillingForm/mutations/addCreditCard';
import changeDefaultCreditCardMutation from 'react/components/Billing/components/BillingForm/mutations/changeDefaultCreditCard';

import billingFormFragment from 'react/components/Billing/components/BillingForm/fragments/billingForm';

import Box from 'react/components/UI/Box';
import Alert from 'react/components/UI/Alert';
import ErrorAlert from 'react/components/UI/ErrorAlert';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';
import GenericButton from 'react/components/UI/GenericButton';
import { LabelledInput, Label } from 'react/components/UI/Inputs';
import PlanSelection from 'react/components/Billing/components/PlanSelection';
import CouponCode from 'react/components/Billing/components/CouponCode';
import MyCreditCard from 'react/components/Billing/components/MyCreditCard';
import PlanChanges from 'react/components/Billing/components/PlanChanges';
import CancellationNotice from 'react/components/Billing/components/CancellationNotice';
import CancelPremium from 'react/components/Billing/components/CancelPremium';
import StatusOverlay from 'react/components/Billing/components/StatusOverlay';

const OPERATIONS = {
  ADD_NEW_CREDIT_CARD: 'ADD_NEW_CREDIT_CARD',
  CHANGE_DEFAULT_CREDIT_CARD: 'CHANGE_DEFAULT_CREDIT_CARD',
  CHANGE_PLAN_ID: 'CHANGE_PLAN_ID',
  CANCEL_PREMIUM_SUBSCRIPTION: 'CANCEL_PREMIUM_SUBSCRIPTION',
};

class BillingForm extends PureComponent {
  static propTypes = {
    stripe: PropTypes.shape({
      createToken: PropTypes.func.isRequired,
    }).isRequired,
    subscribeToPremium: PropTypes.func.isRequired,
    cancelPremiumSubscription: PropTypes.func.isRequired,
    addCreditCard: PropTypes.func.isRequired,
    changeDefaultCreditCard: PropTypes.func.isRequired,
    me: propType(billingFormFragment).isRequired,
  }

  state = {
    mode: 'resting',
    errorMessage: null,
    operations: [],

    plan_id: this.props.me.customer.plan.id,
    default_credit_card_id: null,
    coupon_code: '',
  }

  doWeNeedTo = operationName =>
    this.state.operations.includes(OPERATIONS[operationName])

  addOperation = (previousOperations = [], operationName) =>
    [...new Set([...previousOperations, OPERATIONS[operationName]])];

  addCreditCard = () => {
    const { stripe, addCreditCard } = this.props;

    return stripe.createToken({ type: 'card' })
      .then(({ error, token }) => {
        if (error) {
          return Promise.reject(error);
        }

        return addCreditCard({
          variables: {
            token: token.id,
          },
        });
      });
  }

  changeDefaultCreditCard = () => {
    const { changeDefaultCreditCard } = this.props;
    const { default_credit_card_id } = this.state;

    return changeDefaultCreditCard({
      variables: { default_credit_card_id },
    });
  }

  subscribeToPremium = () => {
    const { plan_id, coupon_code } = this.state;
    const { subscribeToPremium, me: { customer } } = this.props;

    return subscribeToPremium({
      variables: {
        coupon_code,
        plan_id: plan_id.toUpperCase(),
        token: customer.default_credit_card.id,
      },
    });
  }

  handleErrors = (err) => {
    this.setState({
      mode: 'error',
      ...mapErrors(err),
    });
  }

  handlePlan = (plan_id) => {
    this.setState(prevState => ({
      plan_id,
      operations: this.addOperation(prevState.operations, 'CHANGE_PLAN_ID'),
    }));
  }

  handleNewCard = () => {
    this.setState(prevState => ({
      operations: this.addOperation(prevState.operations, 'ADD_NEW_CREDIT_CARD'),
    }));
  }

  handleChangeDefaultCreditCard = (defaultCreditCardId) => {
    this.setState(prevState => ({
      default_credit_card_id: defaultCreditCardId,
      operations: this.addOperation(prevState.operations, 'CHANGE_DEFAULT_CREDIT_CARD'),
    }));
  }

  // TODO: Should you be able to simply
  // apply the coupon code at any given time?
  handleCouponCode = coupon_code =>
    this.setState({ coupon_code })

  handleReenable = (e) => {
    const { me: { customer } } = this.props;

    this.setState(prevState => ({
      plan_id: customer.plan.id,
      operations: this.addOperation(prevState.operations, 'CHANGE_PLAN_ID'),
    }), () => {
      this.handleSubmit(e);
    });
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
    // Add a card if one doesn't yet exist
    const waitForCardCreation = this.doWeNeedTo('ADD_NEW_CREDIT_CARD') ? this.addCreditCard() : Promise.resolve();
    const waitForDefaultChange = this.doWeNeedTo('CHANGE_DEFAULT_CREDIT_CARD') ? this.changeDefaultCreditCard() : Promise.resolve();

    // These things have to happen first to update the state of the customer
    return Promise.all([waitForCardCreation, waitForDefaultChange])
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
      <Box width={['100%', '75%', '50%']} mx="auto" mt={6} mb={8} position="relative">
        {mode === 'processing' &&
          <StatusOverlay>
            <LoadingIndicator />
          </StatusOverlay>
        }

        {mode === 'subscribed' &&
          <Alert mb={6} bg="state.premium" color="white" isCloseable={false}>
            Subscribed! You’re all set!
          </Alert>
        }

        {mode === 'card_changed' &&
          <Alert mb={6} bg="state.neutral" isCloseable={false}>
            Card details updated! You’re all set!
          </Alert>
        }

        {mode === 'error' &&
          <ErrorAlert mb={6} isReloadable={false}>
            {errorMessage}
          </ErrorAlert>
        }

        <form onSubmit={this.handleSubmit}>
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

          {plan_id !== 'basic' && !customer.is_lifetime &&
            <div>
              <LabelledInput>
                <Label>
                  {customer.is_canceled
                    ? 'Current card'
                    : 'Billed to'
                  }
                </Label>

                <MyCreditCard
                  key={
                    customer.credit_cards && customer.credit_cards.length +
                      customer.default_credit_card && customer.default_credit_card.id
                  }
                  customer={customer}
                  onNewCreditCardReady={this.handleNewCard}
                  onChangeDefaultCreditCard={this.handleChangeDefaultCreditCard}
                />
              </LabelledInput>

              {!customer.is_canceled &&
                <LabelledInput>
                  <Label>
                    Coupon
                  </Label>

                  <CouponCode
                    onDebouncedCode={this.handleCouponCode}
                    code={coupon_code}
                  />
                </LabelledInput>
              }

              {((coupon_code !== '') || isPlanChanged) &&
                <LabelledInput>
                  <Label />

                  <PlanChanges
                    customer={customer}
                    plan_id={plan_id}
                    coupon_code={coupon_code}
                  />
                </LabelledInput>
              }
            </div>
          }

          {(!customer.is_canceled && !customer.is_lifetime && fromPlanToPlan !== 'basic:basic') &&
            <LabelledInput>
              <Label />

              <div>
                <GenericButton onClick={this.handleSubmit} disabled={operations.length === 0}>

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
              </div>
            </LabelledInput>
          }
        </form>
      </Box>
    );
  }
}

export default injectStripe(compose(
  graphql(subscribeToPremiumMutation, { name: 'subscribeToPremium' }),
  graphql(cancelPremiumSubscriptionMutation, { name: 'cancelPremiumSubscription' }),
  graphql(addCreditCardMutation, { name: 'addCreditCard' }),
  graphql(changeDefaultCreditCardMutation, { name: 'changeDefaultCreditCard' }),
)(BillingForm));
