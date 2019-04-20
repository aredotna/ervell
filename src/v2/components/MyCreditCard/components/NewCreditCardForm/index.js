import React, { PureComponent } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';

import StripeInput from 'v2/components/Billing/components/StripeInput';

const CardNumber = StripeInput(CardNumberElement);
const CardExpiry = StripeInput(CardExpiryElement);
const CardCVC = StripeInput(CardCVCElement);

export default class NewCreditCardForm extends PureComponent {
  focusInput = () =>
    (this.cardNumber &&
      this.cardNumber._element &&
        this.cardNumber._element.focus());

  render() {
    return (
      <div {...this.props}>
        <CardNumber
          mb={4}
          onReady={this.focusInput}
          ref={(el) => {
            this.cardNumber = el;
          }}
        />

        <CardExpiry mb={4} />

        <CardCVC />
      </div>
    );
  }
}
