import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { propType } from 'graphql-anywhere';

import myCreditCardsFragment from 'react/components/Billing/components/MyCreditCard/components/ManageMyCreditCards/fragments/myCreditCards';

import Text from 'react/components/UI/Text';
import Box from 'react/components/UI/Box';
import RadioOptions from 'react/components/UI/RadioOptions';
import RemoveCard from 'react/components/Billing/components/MyCreditCard/components/ManageMyCreditCards/components/RemoveCard';

export default class ManageMyCreditCards extends Component {
  static propTypes = {
    onChangeDefaultCreditCard: PropTypes.func.isRequired,
    customer: propType(myCreditCardsFragment).isRequired,
  }

  render() {
    const {
      onChangeDefaultCreditCard,
      customer: { default_credit_card, credit_cards },
    } = this.props;

    return (
      <RadioOptions value={default_credit_card.id} onSelect={onChangeDefaultCreditCard} size="1em">
        {credit_cards.map((credit_card, i) => (
          <RadioOptions.Option
            key={credit_card.id}
            value={credit_card.id}
            borderTop={i === 0 ? '1px solid' : undefined}
            borderBottom="1px solid"
            borderColor="gray.light"
          >
            {() => (
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Text>
                  {credit_card.brand.toUpperCase()} **{credit_card.last4}
                  {' — '}
                  {credit_card.exp_month}/{credit_card.exp_year}
                </Text>

                <Text f={1} color="state.alert" fontWeight="bold">
                  <RemoveCard id={credit_card.id} />
                </Text>
              </Box>
            )}
          </RadioOptions.Option>
        ))}
      </RadioOptions>
    );
  }
}
