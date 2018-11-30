import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCVCElement,
} from 'react-stripe-elements';

import StripeInput from 'react/components/Billing/components/StripeInput';

const CardNumber = StripeInput(CardNumberElement);
const CardExpiry = StripeInput(CardExpiryElement);
const CardCVC = StripeInput(CardCVCElement);

export default class NewCreditCardForm extends PureComponent {
  static propTypes = {
    onReady: PropTypes.func,
  }

  static defaultProps = {
    onReady: () => {},
  }

  render() {
    const { onReady, ...rest } = this.props;

    return (
      <div {...rest}>
        <CardNumber
          mb={4}
          onReady={onReady}
          innerRef={el => el && el._element.focus()}
        />

        <CardExpiry mb={4} />

        <CardCVC />
      </div>
    );
  }
}
