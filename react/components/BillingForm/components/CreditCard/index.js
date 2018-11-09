import React, { Component } from 'react';
import {
  StripeProvider,
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';

import StripeInput from 'react/components/BillingForm/components/StripeInput';

const CardNumber = StripeInput(CardNumberElement);
const CardExpiry = StripeInput(CardExpiryElement);
const CardCVC = StripeInput(CardCVCElement);

export default class CreditCard extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_4UfRB6rM8O9YnCegI5umT0yw">
        <Elements>
          <div>
            <CardNumber mb={4} />

            <CardExpiry mb={4} />

            <CardCVC />
          </div>
        </Elements>
      </StripeProvider>
    );
  }
}
